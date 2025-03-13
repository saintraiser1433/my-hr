<script setup lang="ts">
import type { DropdownMenuItem, TableColumn } from "@nuxt/ui";
import { getPaginationRowModel } from "@tanstack/vue-table";
const UButton = resolveComponent("UButton") as Component;

const props = defineProps({
  data: {
    type: Array as PropType<CriteriaColleague[]>,
    required: true,
    default: () => [],
  },
});

const emits = defineEmits<{
  (e: "update", payload: CriteriaColleague): void;
  (e: "delete", id: number): void;
  (e: "singleApply", payload: CriteriaColleague): void;
  (e: "modalQuest", payload: CriteriaColleague): void;
}>();

const { pagination, globalFilter, refreshTable } = usePagination();
const table = useTemplateRef("table");
const { createColumn } = useTableColumns(UButton);
const expanded = ref({ 0: false });

const handleDelete = (id: number) => {
  emits("delete", id);
};

const handleUpdate = (item: CriteriaColleague) => {
  emits("update", item);
};

const handleQuestion = (item: CriteriaColleague) => {
  emits("modalQuest", item);
};

const columns: TableColumn<any>[] = [
  createColumn("#", "#", true, (row) => `${row.index + 1}`),
  createColumn("criteria", "Criteria", true),
  createColumn("action", "Action", false),
];




const getDropdownActions = (teamlead: CriteriaColleague): DropdownMenuItem[][] => {
  return [
    [
      {
        label: "Manage Questions",
        icon: "i-lucide-view",
        onSelect: async () => {
          handleQuestion(teamlead)
        },
      },
      {
        type: "separator",
      },
      {
        label: "Edit",
        icon: "i-lucide-eye",
        onSelect: () => {
          handleUpdate(teamlead);
        },
      },
      {
        type: "separator",
      },
      {
        label: "Remove",
        icon: "i-lucide-trash",
        color: "error",
        onSelect: () => {
          handleDelete(Number(teamlead.id));
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
  <UCard :ui="{
    root: 'overflow-hidden ',
    body: 'p-0 sm:p-0',
    footer: 'p-0 sm:px-0',
  }">
    <UTable sticky class="overflow-y-auto custom-scrollbar h-120 lg:h-150 cursor-auto" ref="table"
      v-model:expanded="expanded" :ui="{
        tr: 'data-[expanded=true]:bg-(--ui-bg-elevated)/50',
      }" v-model:global-filter="globalFilter" v-model:pagination="pagination" :pagination-options="{
        getPaginationRowModel: getPaginationRowModel(),
      }" :data="data" :columns="columns">
      <!-- <template #empty>
        <div class="flex flex-col items-center justify-center py-6 gap-3">
          <svg-icon name="icons/emptybox" width="64" height="64" />
          <span class="italic text-sm">Oops, nothing here!</span>
        </div>
      </template> -->
      <template #action-cell="{ row }">
        <div class="flex items-center gap-2">
          <UDropdownMenu :items="getDropdownActions(row.original)">
            <UButton icon="i-lucide-ellipsis-vertical" color="neutral" variant="ghost" />
          </UDropdownMenu>
        </div>
      </template>
      <template #criteria-cell="{ row }">
        <span class="capitalize">{{ row.original.name }}</span>
      </template>
    </UTable>
    <UITablePagination :table="table" v-if="table"> </UITablePagination>
  </UCard>
</template>
