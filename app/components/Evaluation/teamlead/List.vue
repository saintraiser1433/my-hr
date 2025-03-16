<script setup lang="ts">
import type { DropdownMenuItem, TableColumn } from "@nuxt/ui";
import { getPaginationRowModel } from "@tanstack/vue-table";
const UButton = resolveComponent("UButton") as Component;

const props = defineProps({
  data: {
    type: Array as PropType<TeamLeadModel[]>,
    required: true,
    default: () => [],
  },
  itemTemplate: {
    type: Array as PropType<any[]>,
    default: () => [],
  }
});

const emits = defineEmits<{
  (e: "update", payload: TeamLeadModel): void;
  (e: "delete", id: number): void;
}>();

const { pagination, globalFilter, refreshTable } = usePagination();
const table = useTemplateRef("table");
const { createColumn } = useTableColumns(UButton);
const store = useAuthStore();
const expanded = ref({ 0: false });

const handleDelete = (id: number) => {
  emits("delete", id);
};

const handleUpdate = (item: TeamLeadModel) => {
  emits("update", item);
};






const columns: TableColumn<any>[] = [
  createColumn("increment", "#", true, (row) => `${row.index + 1}`),
  createColumn("name", "Category", true, (row) =>
    h("span", { class: "capitalize" }, row.getValue("name"))
  ),
  createColumn("percentage", "Percentage", true),
  ...(store.getRole === "Admin"
    ? [createColumn("teamlead", "For Teamlead?", true)]
    : []),

  createColumn("action", "Action", false),
];


const getDropdownActions = (datas: TeamLeadModel): DropdownMenuItem[][] => {
  const actions: DropdownMenuItem[] = [];

  // Check if the user is a TeamLead

  if (!datas.forTeamLead) {
    actions.push(
      {
        label: "Manage Criteria",
        icon: "i-lucide-view",
        onSelect: async () => {
          await navigateTo({
            name: "Evaluation-teamlead-criteria-id",
            params: { id: Number(datas.id) },
          });
        },
      },
    );
  }

  if (store.getRole === "TeamLead") {
    actions.push(
      {
        label: "Manage Employees Criteria",
        icon: "i-lucide-view",
        onSelect: async () => {
          await navigateTo({
            name: "team-categories-criteria-evalId",
            params: { evalId: Number(datas.id) }
          });
        },
      },
    );
  }

  if (store.getRole === "Admin") {

    actions.push(
      {
        type: "separator",
      },
      {
        label: "Edit",
        icon: "i-lucide-eye",
        onSelect: () => {
          console.log(datas);
          handleUpdate(datas);
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
          handleDelete(Number(datas.id));
        },
      },
    );
  }


  return [actions];
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
      <template #percentage-cell="{ row }">
        <span>{{ row.original.percentage * 100 }}%</span>
      </template>
      <template #teamlead-cell="{ row }">
        <UBadge :icon="row.original.forTeamLead ? 'lucide-check' : 'lucide-x'"
          :color="row.original.forTeamLead ? 'success' : 'error'"
          :variant="row.original.forTeamLead ? 'solid' : 'outline'"></UBadge>
      </template>
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
