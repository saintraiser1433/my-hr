<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import { getPaginationRowModel } from "@tanstack/vue-table";
const UButton = resolveComponent("UButton") as Component;

const props = defineProps({
  data: {
    type: Array as PropType<FailedApplicant[]>,
    required: true,
    default: () => [],
  },
});


const table = useTemplateRef("table");
const { createColumn } = useTableColumns(UButton);
const { pagination, globalFilter, refreshTable } = usePagination();
const { $datefns } = useNuxtApp();
const config = useRuntimeConfig();

const columns: TableColumn<any>[] = [
  createColumn("increment", "#", true, (row) => `${row.index + 1}`),
  createColumn("applicantName", "Applicant Name", true),
  createColumn("jobTitle", "Job Applying", true),
  createColumn("remarks", "Remarks", true),
  createColumn("appliedDate", "Date Apply", true),
  createColumn("failedDate", "Date Failed", true),
  createColumn("action", "Action", false),
];

watch(
  () => props.data,
  (newVal, oldVal) => {
    if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
      refreshTable();
    }
  }
);
</script>

<template>
  <UITableSearch v-model:search="globalFilter" v-if="table" :table="table">
    <template #actions>
      <slot name="actions"></slot>
    </template>
  </UITableSearch>
  <UCard
    :ui="{
      root: 'overflow-hidden ',
      body: 'p-0 sm:p-0',
      footer: 'p-0 sm:px-0',
    }"
  >
    <UTable
      sticky
      class="overflow-y-auto custom-scrollbar h-auto cursor-auto"
      ref="table"
      v-model:global-filter="globalFilter"
      v-model:pagination="pagination"
      :pagination-options="{
        getPaginationRowModel: getPaginationRowModel(),
      }"
      :data="data"
      :columns="columns"
    >
      <template #remarks-cell="{ row }">
        <UBadge  icon="i-lucide-x" color="error" variant="outline">FAILED</UBadge>
      </template>
      <template #applicantName-cell="{ row }">
        <div class="flex items-center gap-3">
          <UAvatar
            :src="`${config.public.STORAGE_URL_AVATAR}/${row.original.photo}`"
            size="lg"
          />
          <div>
            <p class="font-medium capitalize text-(--ui-text-highlighted)">
              {{ row.original.applicantName }}
            </p>
          </div>
        </div>
      </template>
      <template #appliedDate-cell="{ row }">
        {{ $datefns.format(new Date(row.getValue("appliedDate")), "dd-MMM-yyyy") }}
      </template>
      <template #failedDate-cell="{ row }">
        {{ $datefns.format(new Date(row.getValue("failedDate")), "dd-MMM-yyyy") }}
      </template>
      <template #progressList-cell="{ row }">
        <UProgress
          :model-value="Math.max(0, row.original.countApplicantScreening - 1)"
          :max="row.original.progressList"
        />
      </template>

      <template #action-cell="{ row }">
        <UButton
          icon="i-lucide-eye"
          title="Review"
          size="sm"
          :to="{ path: `/applicants/${row.original.id}` }"
        >
        </UButton>
      </template>
    </UTable>
    <UITablePagination :table="table" v-if="table"> </UITablePagination>
  </UCard>
</template>
