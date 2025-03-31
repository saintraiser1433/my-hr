<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import { getPaginationRowModel } from "@tanstack/vue-table";
const UButton = resolveComponent("UButton") as Component;

const props = defineProps({
  data: {
    type: Array as PropType<DepartmentModel[]>,
    required: true,
    default: () => [],
  },

});
const emits = defineEmits<{
  (e: "update", payload: DepartmentModel): void;
  (e: "delete", id: number): void;
}>();

const table = useTemplateRef("table");

const { createColumn } = useTableColumns(UButton);
const { pagination, globalFilter, refreshTable } = usePagination();

const handleDelete = (id: number) => {
  emits("delete", id);
};

const handleUpdate = (item: DepartmentModel) => {
  emits("update", item);

};

const columns: TableColumn<any>[] = [
  createColumn("increment", "#", true, (row) => `${row.index + 1}`),
  createColumn("title", "Department Name", true, (row) =>
    h("span", { class: "capitalize" }, row.getValue("title"))
  ),
  createColumn("status", "Status", true),
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
  <UCard :ui="{
    root: 'overflow-hidden ',
    body: 'p-0 sm:p-0',
    footer: 'p-0 sm:px-0',
  }">
    <UTable sticky class="overflow-y-auto custom-scrollbar h-auto cursor-auto" ref="table"
      v-model:global-filter="globalFilter" v-model:pagination="pagination" :pagination-options="{
        getPaginationRowModel: getPaginationRowModel(),
      }" :data="data" :columns="columns">
     <template #empty>
      <div class="flex gap-2 flex-col items-center text-center">
          <svg-icon name="iconx/nofound" width="64" height="64"></svg-icon>
          <h3 class="text-lg font-semibold text-gray-600">No data available</h3>
          <p class="text-sm text-gray-500">Try adjusting your filters or check back later.</p>
      </div>
    </template>
      <template #status-cell="{ row }">
        <div v-if="row.original.status">
          <UBadge color="neutral">Active</UBadge>
        </div>
        <div v-else>
          <UBadge color="neutral" variant="outline">Inactive</UBadge>
        </div>
      </template>
      <template #action-cell="{ row }">
        <div class="flex items-center gap-2">
          <UButton icon="lucide:edit" size="sm" @click="handleUpdate(row.original)">
            Edit
          </UButton>
          <UButton icon="lucide:x" color="primary" variant="outline" size="sm" @click="handleDelete(row.original.id || 0)">
            Remove
          </UButton>
        </div>
      </template>
    </UTable>
    <UITablePagination :table="table" v-if="table">
    </UITablePagination>
  </UCard>
</template>
