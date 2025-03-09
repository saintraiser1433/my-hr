<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import { getPaginationRowModel } from "@tanstack/vue-table";
const UButton = resolveComponent("UButton") as Component;

const props = defineProps({
  data: {
    type: Array as PropType<TemplateDetail[]>,
    required: true,
    default: () => [],
  },
});

const emits = defineEmits<{
  (e: "update", payload: TemplateDetail): void;
  (e: "delete", id: number): void;
}>();

const { pagination, globalFilter, refreshTable } = usePagination();
const table = useTemplateRef("table");
const { createColumn } = useTableColumns(UButton);

const handleDelete = (id: number) => {
  emits("delete", id);
};

const handleUpdate = (item: TemplateDetail) => {
  emits("update", item);
};

const columns: TableColumn<any>[] = [
  createColumn("increment", "#", true),
  createColumn("legend", "Legend"),
  createColumn("description", "Description", true),
  createColumn("score", "Score", true),
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
      <template #increment-cell="{row}">
          <span>{{row.index +1}}</span>
      </template>
      <template #legend-cell="{row}">
          <span class="capitalize">{{row.original.title}}</span>
      </template>
      <template #description-cell="{row}">
          <span class="capitalize">{{row.original.description}}</span>
      </template>
      <template #score-cell="{row}">
          <span class="capitalize">{{row.original.score}}</span>
      </template>
      <template #action-cell="{ row }">
        <div class="flex items-center gap-2">
          <UButton icon="lucide:edit" size="sm" @click="handleUpdate(row.original)">
            Edit
          </UButton>
          <UButton icon="lucide:x" color="primary" variant="outline" size="sm"
            @click="handleDelete(row.original.id || 0)">
          Remove
          </UButton>
        </div>
      </template>
    </UTable>
    <UITablePagination :table="table" v-if="table"> </UITablePagination>
  </UCard>
</template>
