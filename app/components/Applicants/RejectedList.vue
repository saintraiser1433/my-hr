<script setup lang="ts">
import type { DropdownMenuItem, TableColumn } from "@nuxt/ui";
import { getPaginationRowModel } from "@tanstack/vue-table";
const UButton = resolveComponent("UButton") as Component;

const props = defineProps({
  data: {
    type: Array as PropType<RejectApplicantModel[]>,
    required: true,
    default: () => [],
  },
});
const emits = defineEmits<{
  (e: "update", payload: ApplicantModel): void;
  (e: "delete", id: number): void;
}>();
const { data } = toRefs(props);
const table = useTemplateRef("table");
const { createColumn } = useTableColumns(UButton);
const { pagination, globalFilter, refreshTable } = usePagination();
const { $datefns } = useNuxtApp();
const config = useRuntimeConfig();
const columns: TableColumn<any>[] = [
  createColumn("#", "#", true, (row) => `${row.index + 1}`),

  createColumn("applicantName", "Applicant Name", true),
  createColumn("jobTitle", "Job Title", true, (row) =>
    h("span", { class: "capitalize" }, row.getValue("jobTitle"))
  ),

  createColumn("status", "Status", true),
  createColumn("appliedDate", "Applied Date", true),
  createColumn("rejectedDate", "Rejected Date", true),
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
  <template #empty>
      <div class="flex gap-2 flex-col items-center text-center">
          <svg-icon name="iconx/nofound" width="64" height="64"></svg-icon>
          <h3 class="text-lg font-semibold text-gray-600">No data available</h3>
          <p class="text-sm text-gray-500">Try adjusting your filters or check back later.</p>
      </div>
    </template>
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
      <template #status-cell="{ row }">
        <UBadge icon="i-lucide-x" color="error" variant="outline">{{
          row.original.status
        }}</UBadge>
      </template>
      <template #appliedDate-cell="{ row }">
        <span class="capitalize">{{
          $datefns.format(new Date(row.original.appliedDate), "dd-MMM-yyyy")
        }}</span>
      </template>
      <template #rejectedDate-cell="{ row }">
        <span class="capitalize">{{
          $datefns.format(new Date(row.original.rejectedDate), "dd-MMM-yyyy")
        }}</span>
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
    </UTable>
    <UITablePagination :table="table" v-if="table"> </UITablePagination>
  </UCard>
</template>
