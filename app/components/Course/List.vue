<script setup lang="ts">
import { ref } from "vue";
import type { TableColumn } from "@nuxt/ui";
import { getPaginationRowModel } from "@tanstack/vue-table";
const UButton = resolveComponent("UButton") as Component;
defineProps({
  data: {
    type: Array as PropType<CourseModel[]>,
    required: true,
    default: () => [],
  },
});

const emits = defineEmits<{
  (e: "update", payload: CourseModel): void;
  (e: "delete", id: number): void;
}>();

const handleDelete = (id: number) => {
  emits("delete", id);
};

const handleUpdate = (item: CourseModel) => {
  emits("update", item);
};

const { createColumn } = useTableColumns(UButton);
const columns: TableColumn<CourseModel>[] = [
  createColumn("course_id", "#", true, (row) => `${row.index + 1}`),
  createColumn("description", "Course Name", true, (row) =>
    h("span", { class: "capitalize" }, row.getValue("description"))
  ),
  createColumn("score", "Score", true),
  createColumn("action", "Action", false),
];

const pagination = ref({
  pageIndex: 0,
  pageSize: 30,
});
const globalFilter = ref("");
const table = ref(null);
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
      class="overflow-y-auto custom-scrollbar h-100 lg:h-170 cursor-auto"
      ref="table"
      v-model:global-filter="globalFilter"
      v-model:pagination="pagination"
      :pagination-options="{
        getPaginationRowModel: getPaginationRowModel(),
      }"
      :data="data"
      :columns="columns"
    >
      <template #action-cell="{ row }">
        <div class="flex items-center gap-2">
          <UButton size="sm" @click="handleUpdate(row.original)">
            <Icon name="lucide:edit"></Icon>
          </UButton>
          <UButton
            color="primary"
            variant="outline"
            size="sm"
            @click="handleDelete(row.original.course_id || 0)"
          >
            <Icon name="lucide:x"></Icon>
          </UButton>
        </div>
      </template>
    </UTable>

    <UITablePagination v-if="table" :table="table"> </UITablePagination>
  </UCard>
</template>
