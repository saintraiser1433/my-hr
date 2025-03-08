<script setup lang="ts">
import type { DropdownMenuItem, TableColumn } from "@nuxt/ui";
import { getPaginationRowModel } from "@tanstack/vue-table";
const UButton = resolveComponent("UButton") as Component;

const props = defineProps({
  data: {
    type: Array as PropType<PeerModel[]>,
    required: true,
    default: () => [],
  },
});

const emits = defineEmits<{
  (e: "update", payload: PeerModel): void;
  (e: "delete", id: number): void;
}>();

const { pagination, globalFilter, refreshTable } = usePagination();
const table = useTemplateRef("table");
const { createColumn } = useTableColumns(UButton);

const handleDelete = (id: number) => {
  emits("delete", id);
};

const handleUpdate = (item: PeerModel) => {
  emits("update", item);
};
const expanded = ref({ 0: false });

const columns: TableColumn<any>[] = [
  { id: "expand" },
  createColumn("title", "Category", true, (row) =>
    h("span", { class: "capitalize" }, row.getValue("title"))
  ),
  createColumn("template", "Template", false),
  createColumn("action", "Action", false),
];

const subMenucolumns: TableColumn<any>[] = [
  createColumn("id", "#", false),
  createColumn("question", "Questions", false),
];

const getDropdownActions = (peer: PeerModel): DropdownMenuItem[][] => {
  return [
    [
      {
        label: "Manage Questions",
        icon: "i-lucide-view",
        onSelect: async () => {
          // titleName.value = user.title || "";
          // localStorage.setItem("title", titleName.value);
          await navigateTo({
            name: "Evaluation-peer-question-peerId",
            params: { peerId: Number(peer.id) },
          });
        },
      },
      {
        type: "separator",
      },
      {
        label: "Edit",
        icon: "i-lucide-eye",
        onSelect: () => {
          handleUpdate(peer);
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
          handleDelete(Number(peer.id));
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
      v-model:expanded="expanded"
      :ui="{
        tr: 'data-[expanded=true]:bg-(--ui-bg-elevated)/50',
      }"
      v-model:global-filter="globalFilter"
      v-model:pagination="pagination"
      :pagination-options="{
        getPaginationRowModel: getPaginationRowModel(),
      }"
      :data="data"
      :columns="columns"
    >
      <template #expand-cell="{ row }">
        <UButton
          variant="ghost"
          icon="i-lucide-chevron-down"
          :square="true"
          :ui="{
            leadingIcon: [
              'transition-transform',
              row.getIsExpanded() ? 'duration-200 rotate-180' : '',
            ],
          }"
          @click="row.toggleExpanded()"
          >{{ row.index + 1 }}</UButton
        >
      </template>
      <template #action-cell="{ row }">
        <div class="flex items-center gap-2">
          <UDropdownMenu :items="getDropdownActions(row.original)">
            <UButton icon="i-lucide-ellipsis-vertical" color="neutral" variant="ghost" />
          </UDropdownMenu>
        </div>
      </template>
      <template #expanded="{ row }">
        <UTable
          sticky
          class="overflow-y-auto custom-scrollbar cursor-auto border-1 border-(--border) dark:border-(--border)"
          ref="table"
          :ui="{
            th: 'py-2 bg-(--ui-bg-elevated)/50',
          }"
          v-model:expanded="expanded"
          :data="(row.original as PeerModel).question"
          :columns="subMenucolumns"
        >
          <template #id-cell="{ row }">
            {{ row.index + 1 }}
          </template>
          <template #question-cell="{ row }">
            <div v-html="(row.original as PeerModel).question"></div>
          </template>
        </UTable>
      </template>
    </UTable>
    <UITablePagination :table="table" v-if="table"> </UITablePagination>
  </UCard>
</template>
