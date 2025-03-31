<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import { getPaginationRowModel } from "@tanstack/vue-table";

const UButton = resolveComponent("UButton") as Component;
const props = defineProps<{ data: { [key: string]: any }[] }>();
const emits = defineEmits<{ (e: "view"): void }>();

const { pagination, globalFilter, refreshTable } = usePagination();
const table = useTemplateRef("table");
const { createColumn } = useTableColumns(UButton);

// Store columns in a ref()
const columns = ref<TableColumn<any>[]>([]);

// Reactive key to force re-render
const tableKey = ref(0);

const updateColumns = () => {
  const maxEvaluateFields = props.data.reduce((max, item) => {
    const evaluateFields = Object.keys(item).filter((key) => key.startsWith("evaluate"));
    return Math.max(max, evaluateFields.length);
  }, 0);

  const evaluateColumns = Array.from({ length: maxEvaluateFields }, (_, index) =>
    createColumn(`evaluate${index + 1}`, `Evaluatee ${index + 1}`, true)
  );

  columns.value = [
    createColumn("#", "#", true, (row) => `${row.index + 1}`),
    createColumn("evaluator", "Evaluator", true),
    ...evaluateColumns,
  ];
  tableKey.value++;
};

watch(
  () => props.data,
  () => {
    updateColumns();
    refreshTable();
  },
  { deep: true, immediate: true }
);

const view = () => {
  emits("view");
};
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
      :key="tableKey"
      sticky
      class="overflow-y-auto custom-scrollbar h-120 lg:h-150 cursor-auto"
      ref="table"
      v-model:global-filter="globalFilter"
      v-model:pagination="pagination"
      :pagination-options="{ getPaginationRowModel: getPaginationRowModel() }"
      :data="data"
      :columns="columns"
    >
      <template #empty>

        
        <div class="flex flex-col items-center justify-center py-6 gap-3">
          <span class="italic text-sm">Click button to shuffle peers!</span>
          <UButton size="lg" @click="view" label="Random Shuffling" />
        </div>
      </template>
    </UTable>

    <UITablePagination :table="table" v-if="table" />
  </UCard>
</template>
