<script setup lang="ts">
import { ref } from "vue";
import type { TableColumn } from "@nuxt/ui";
import { getPaginationRowModel } from "@tanstack/vue-table";
const UButton = resolveComponent("UButton") as Component;


defineProps({
  data: {
    type: Array as PropType<RequirementModel[]>,
    required: true,
    default: () => [],
  },
});

const emits = defineEmits<{
  (e: "update", payload: RequirementModel): void;
  (e: "delete", id: number): void;
}>();

const pagination = ref({
  pageIndex: 0,
  pageSize: 30,
});
const globalFilter = ref("");
const table = ref(null);

const { createColumn } = useTableColumns(UButton);

const handleDelete = (id: number) => {
  emits("delete", id);
};

const handleUpdate = (item: RequirementModel) => {
  emits("update", item);
};


const columns: TableColumn<RequirementModel>[] = [
  createColumn("id", "#", true, (row) => `${row.index + 1}`),
  createColumn("title", "Requirements", true, (row) =>
    h("span", { class: "capitalize" }, row.getValue("title"))
  ),
  createColumn("description", "Description", true, (row) =>
    h("div", { class: "capitalize text-wrap" }, row.getValue("description"))
  ),
  createColumn("action", "Action", false),
];


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
    <UTable sticky class="overflow-y-auto custom-scrollbar h-100 lg:h-170 cursor-auto" ref="table"
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

    <UITablePagination v-if="table" :table="table"> </UITablePagination>
  </UCard>
</template>
