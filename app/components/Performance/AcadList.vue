<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import { getPaginationRowModel } from "@tanstack/vue-table";
const UButton = resolveComponent("UButton") as Component;

const props = defineProps({
  data: {
    type: Array as PropType<EvaluationModel[]>,
    required: true,
    default: () => [],
  },
});


const table = useTemplateRef("table");
const {data} = toRefs(props);
const { createColumn } = useTableColumns(UButton);
const { pagination, globalFilter } = usePagination();



const columns: TableColumn<any>[] = [
  createColumn("increment", "#", true, (row) => `${row.index + 1}`),
  createColumn("school_year", "School Year", true, (row) => row.getValue("school_year")),
  createColumn("semester", "Semester", true),
  createColumn("status", "Status", true),
  createColumn("action", "Action", false),
];


const mydata = data.value.filter((item) => item.status !== 'PENDING');


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
      :data="mydata"
      :columns="columns"
    >
      <template #empty>
        <div class="flex gap-2 flex-col items-center text-center">
            <svg-icon name="iconx/nofound" width="64" height="64"></svg-icon>
            <h3 class="text-lg font-semibold text-gray-600">No data available</h3>
            <p class="text-sm text-gray-500">Try adjusting your filters or check back later.</p>
        </div>
    </template>
      <template #status-cell="{ row }">
        <UBadge
          v-if="row.original.status === 'ONGOING'"
          icon="i-majesticons-timer-line"
          color="neutral"
          variant="outline"
          >ONGOING</UBadge
        >
        <UBadge v-else-if="row.original.status === 'COMPLETED'" icon="lucide-check" color="neutral">COMPLETED</UBadge>
      </template>

      <template #semester-cell="{ row }">
        <div v-if="row.original.semester === 1">
          <span>First Semester</span>
        </div>
        <div v-else>
          <span>Second Semester</span>
        </div>
      </template>

      <template #action-cell="{ row }">
        <UButton icon="i-lucide-view" :to="`Performance/${row.original.id}`">View</UButton>
      </template>
    </UTable>
    <UITablePagination :table="table" v-if="table"> </UITablePagination>
  </UCard>
</template>
