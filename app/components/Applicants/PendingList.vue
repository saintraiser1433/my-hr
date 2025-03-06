<script setup lang="ts">
import { configs } from "#build/eslint.config.mjs";
import type { DropdownMenuItem, TableColumn } from "@nuxt/ui";
import { getPaginationRowModel } from "@tanstack/vue-table";
const UButton = resolveComponent("UButton") as Component;
const UAvatar = resolveComponent("UAvatar") as Component;

const props = defineProps({
  data: {
    type: Array as PropType<PendingApplicantModel[]>,
    required: true,
    default: () => [],
  },
});
const emits = defineEmits<{
  (e: "review", payload: PendingApplicantModel): void;
}>();
const config = useRuntimeConfig();
const table = useTemplateRef("table");
const { createColumn } = useTableColumns(UButton);
const { pagination, globalFilter, refreshTable } = usePagination();
const { $datefns } = useNuxtApp();

const handleReview = (item: PendingApplicantModel) => {
  emits("review", item);
};

const columns: TableColumn<any>[] = [
  createColumn("#", "#", true, (row) => `${row.index + 1}`),

  createColumn("applicantName", "Applicant Name", true),
  createColumn("jobTitle", "Job Title", true, (row) =>
    h("span", { class: "capitalize" }, row.getValue("jobTitle"))
  ),

  createColumn("status", "Status", true),
  createColumn("appliedDate", "Applied Date", true),
  createColumn("action", "Review", false),
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
  <UCard :ui="{
    root: 'overflow-hidden ',
    body: 'p-0 sm:p-0',
    footer: 'p-0 sm:px-0',
  }">
    <UTable sticky class="overflow-y-auto custom-scrollbar h-auto cursor-auto" ref="table"
      v-model:global-filter="globalFilter" v-model:pagination="pagination" :pagination-options="{
        getPaginationRowModel: getPaginationRowModel(),
      }" :data="data" :columns="columns">
      <template #status-cell="{ row }">
        <UBadge icon="i-mdi-account-pending" color="neutral" variant="outline">{{
          row.original.status
        }}</UBadge>
      </template>
      <template #appliedDate-cell="{ row }">
        <span class="capitalize">{{
          $datefns.format(new Date(row.original.appliedDate), "dd-MMM-yyyy")
        }}</span>
      </template>

      <template #applicantName-cell="{ row }">
        <div class="flex items-center gap-3">
          <UAvatar :src="`${config.public.STORAGE_URL_AVATAR}/${row.original.photo}`" size="lg" />
          <div>
            <p class="font-medium capitalize text-(--ui-text-highlighted)">
              {{ row.original.applicantName }}
            </p>
          </div>
        </div>
      </template>
      <template #action-cell="{ row }">
        <UButton icon="i-lucide-eye" title="Review" size="sm" @click="handleReview(row.original)">
          Review
        </UButton>
      </template>
    </UTable>
    <UITablePagination :table="table" v-if="table"> </UITablePagination>
  </UCard>
</template>
