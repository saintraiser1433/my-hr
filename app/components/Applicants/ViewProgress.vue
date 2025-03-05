<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import { getPaginationRowModel } from "@tanstack/vue-table";
const UButton = resolveComponent("UButton") as Component;

const props = defineProps({
  data: {
    type: Array as PropType<ScreeningProgressList[]>,
    default: () => [],
  },
});

const table = useTemplateRef("table");
const { createColumn } = useTableColumns(UButton);
const { $datefns } = useNuxtApp();
const { pagination, globalFilter, refreshTable } = usePagination();

const columns: TableColumn<any>[] = [
  createColumn("increment", "#", true, (row) => `${row.index + 1}`),
  createColumn("screening", "Screening Title", true),
  createColumn("dateInterview", "Date & Time Interview", true),
  createColumn("status", "Status", true),
];
</script>

<template>
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
      :ui="{
        tr: 'data-[selected=true]:pointer-events-none',
      }"
    >
      <template #screening-cell="{ row }">
        <span>{{ row.original.screening.title }}</span>
      </template>
      <template #dateInterview-cell="{ row }">
        <UBadge
          label="Open"
          :color="row.original.dateInterview ? 'primary' : 'error'"
          :variant="row.original.dateInterview ? 'solid' : 'subtle'"
          >{{
            row.original.dateInterview
              ? $datefns.format(
                  new Date(row.original.dateInterview),
                  "dd-MMM-yyyy / hh:mm a"
                )
              : "NOT SET"
          }}</UBadge
        >
      </template>
      <template #status-cell="{ row }">
        <UBadge
          v-if="row.original.status === 'FAILED' || row.original.status === 'PENDING'"
          icon="i-lucide-x"
          color="error"
          >FAILED</UBadge
        >
        <UBadge v-else icon="i-lucide-check">PASSED</UBadge>
      </template>
    </UTable>
    <UITablePagination :table="table" v-if="table"> </UITablePagination>
  </UCard>
</template>
