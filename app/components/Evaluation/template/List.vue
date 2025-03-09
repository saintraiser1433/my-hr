<script setup lang="ts">
import type { DropdownMenuItem, TableColumn } from "@nuxt/ui";
import { getPaginationRowModel } from "@tanstack/vue-table";
const UButton = resolveComponent("UButton") as Component;

const props = defineProps({
  data: {
    type: Array as PropType<TemplateModel[]>,
    required: true,
    default: () => [],
  },
});

const emits = defineEmits<{
  (e: "update", payload: TemplateModel): void;
  (e: "delete", id: number): void;
}>();

const { pagination, globalFilter, refreshTable } = usePagination();
const table = useTemplateRef("table");
const { createColumn } = useTableColumns(UButton);

const handleDelete = (id: number) => {
  emits("delete", id);
};

const handleUpdate = (item: TemplateModel) => {
  emits("update", item);
};

const columns: TableColumn<any>[] = [
  createColumn("increment", "#", true, (row) => `${row.index + 1}`),
  createColumn("template_name", "Template Name", true, (row) =>
    h("span", { class: "capitalize" }, row.getValue("template_name"))
  ),
  createColumn("description", "Description", true, (row) =>
    h("div", { class: "capitalize text-wrap" }, row.getValue("description"))
  ),
  createColumn("action", "Action", false),
];

const getDropdownActions = (template: TemplateModel): DropdownMenuItem[][] => {
  return [
    [
      {
        label: "Assign",
        icon: "i-hugeicons-assignments",
        onSelect: async () => {
          // titleName.value = user.title || "";
          // localStorage.setItem("title", titleName.value);
          // await navigateTo({ name: "Job-jobId", params: { jobId: Number(user.id) } });
        },
      },
      {
        type: "separator",
      },
      {
        label: "Edit",
        icon: "i-lucide-edit",
        onSelect: () => {
          handleUpdate(template);
        },
      },
      {
        type: "separator",
      },
      {
        label: "Delete",
        icon: "i-lucide-trash",
        color: "error",
        onSelect: () => {
          handleDelete(Number(template.id));
        },
      },
    ],
  ];
};

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
      <template #action-cell="{ row }">
        <div class="flex items-center gap-2">
          <UDropdownMenu :items="getDropdownActions(row.original)">
            <UButton icon="i-lucide-ellipsis-vertical" color="neutral" variant="ghost" />
          </UDropdownMenu>
        </div>
      </template>
    </UTable>
    <UITablePagination :table="table" v-if="table"> </UITablePagination>
  </UCard>
</template>
