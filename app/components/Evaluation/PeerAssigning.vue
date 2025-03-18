<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import { getPaginationRowModel } from "@tanstack/vue-table";
const UButton = resolveComponent("UButton") as Component;

const props = defineProps({
  data: {
    type: Array as PropType<EmployeesEvaluate[]>,
    required: true,
    default: () => [],
  },
  type: {
    type: String,
    default: "evaluate",
  },
});

const emits = defineEmits(["view"]);
const { pagination, globalFilter, refreshTable } = usePagination();
const table = useTemplateRef("table");
const { createColumn } = useTableColumns(UButton);

const columns: TableColumn<any>[] = [
  createColumn("#", "#", true, (row) => `${row.index + 1}`),
  createColumn("evaluator", "Evaluator", true),
  createColumn("status", "Evaluation Status", true),
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
      class="overflow-y-auto custom-scrollbar h-120 lg:h-150 cursor-auto"
      ref="table"
      v-model:global-filter="globalFilter"
      v-model:pagination="pagination"
      :pagination-options="{
        getPaginationRowModel: getPaginationRowModel(),
      }"
      :data="data"
      :columns="columns"
    >
      <template #empty>
        <div class="flex flex-col items-center justify-center py-6 gap-3">
          <span class="italic text-sm">Click button to shuffle peers!</span>
          <UButton size="lg" label="Random Shuffling" />
        </div>
      </template>
    </UTable>

    <UITablePagination :table="table" v-if="table"> </UITablePagination>
  </UCard>
</template>
