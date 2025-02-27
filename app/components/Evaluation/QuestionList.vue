<script setup lang="ts">
import type { DropdownMenuItem, TableColumn } from "@nuxt/ui";
import { getPaginationRowModel } from "@tanstack/vue-table";
const UButton = resolveComponent("UButton") as Component;
const UCheckbox = resolveComponent("UCheckbox") as Component;
const props = defineProps({
  data: {
    type: Array as PropType<EvaluationModel[]>,
    required: true,
    default: () => [],
  },

});
const emits = defineEmits<{
  (e: "update", payload: EvaluationModel): void;
  (e: "delete", id: number): void;
}>();

const table = useTemplateRef("table");

const { createColumn } = useTableColumns(UButton);
const { pagination, globalFilter, refreshTable } = usePagination();

const handleDelete = (id: number) => {
  emits("delete", id);
};

const handleUpdate = (item: EvaluationModel) => {
  emits("update", item);

};

const columns: TableColumn<any>[] = [
  createColumn("increment", "#", true, (row) => {
    return h('div', { class: 'max-w-1' }, `${row.index + 1}`)
  }),
  createColumn("question", "Question", true, (row) => {
    return h('div', { class: 'max-w-lg text-wrap text-sm' }, row.getValue("question"))
  }),
  createColumn("1", "1", false, (row) => {
    return h(UCheckbox, { class: 'max-w-1' }, )
  }),
  createColumn("2", "2", false, (row) => {
    return h(UCheckbox, { class: 'max-w-1' }, 0)
  }),
  createColumn("3", "3", false, (row) => {
    return h(UCheckbox, { class: 'max-w-1' }, 0)
  }),
  createColumn("4", "4", false, (row) => {
    return h(UCheckbox, { class: 'max-w-1' }, 0)
  }),
  createColumn("5", "5", false, (row) => {
    return h(UCheckbox, { class: 'max-w-1' }, 0)
  }),

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
  <UCard :ui="{
    root: 'overflow-hidden',
    header: 'p-0 sm:px-3 py-2',
    body: 'p-4 sm:px-2 sm:py-2',
    footer: 'p-0 sm:px-0',
  }">
    <template #header>
      <h3 class="font-bold text-(--foreground)">LIST OF QUESTIONS</h3>
    </template>
    <div class="flex items-center gap-4">
      <h4 class="font-semibold">LEGENDS:</h4>
      <div class="flex items-center gap-3">
        <UBadge variant="subtle">1 - STRONGLY DISAGREE</UBadge>
        <UBadge variant="subtle">2 - DISAGREE</UBadge>
        <UBadge variant="subtle">3 - UNCERTAIN</UBadge>
        <UBadge variant="subtle">4 - AGREE</UBadge>
        <UBadge variant="subtle">5 - STRONGLY AGREE</UBadge>
      </div>
    </div>
    <USeparator class="my-2"></USeparator>
    <UCard :ui="{
      root: 'overflow-hidden',
      body: 'p-0 sm:p-0',
      footer: 'p-0 sm:px-0',
    }">
      <UTable sticky class="overflow-y-auto custom-scrollbar h-150 cursor-auto" ref="table"
        v-model:global-filter="globalFilter" v-model:pagination="pagination" :pagination-options="{
          getPaginationRowModel: getPaginationRowModel(),
        }" :data="data" :columns="columns">

        <template #action-cell="{ row }">
          <div class="flex items-center gap-2">
            <UButton size="sm" @click="handleUpdate(row.original)">
              <Icon name="lucide:edit"></Icon>
            </UButton>
            <UButton color="primary" variant="outline" size="sm" @click="handleDelete(row.original.id || 0)">
              <Icon name="lucide:x"></Icon>
            </UButton>
          </div>
        </template>
      </UTable>
      <UITablePagination :table="table" v-if="table">
      </UITablePagination>
    </UCard>
  </UCard>

</template>
