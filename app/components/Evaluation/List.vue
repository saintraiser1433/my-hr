<script setup lang="ts">
import type { DropdownMenuItem, TableColumn } from "@nuxt/ui";
import { getPaginationRowModel } from "@tanstack/vue-table";
const UButton = resolveComponent("UButton") as Component;

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
const store = useAcademicYearStore();
const { createColumn } = useTableColumns(UButton);
const { pagination, globalFilter, refreshTable } = usePagination();

const handleDelete = (id: number) => {
  emits("delete", id);
};

const handleUpdate = (item: EvaluationModel) => {
  emits("update", item);
};

const columns: TableColumn<any>[] = [
  createColumn("increment", "#", true),
  createColumn("school_year", "School Year", true, (row) => row.getValue("school_year")),
  createColumn("semester", "Semester", true),
  createColumn("peerTemplate", "Peer Template", true),
  createColumn("teamLeadTemplate", "TeamLead Template", true),
  createColumn("status", "Status", true),
  createColumn("view", "View", false),
  createColumn("action", "Action", false),
];

function getDropdownActions(data: EvaluationModel): DropdownMenuItem[][] {
  return [
    [
      {
        label: "Assign Peer Evaluations",
        icon: "i-hugeicons-assignments",
        onSelect: async () => {
          await navigateTo({
            name: "Evaluation-assign-acadId",
            params: { acadId: data.id },
          });
        },
      },
      {
        type: "separator",
      },
      {
        label: "Manage Peer Categories",
        icon: "i-hugeicons-assignments",
        onSelect: async () => {
          await navigateTo({
            name: "Evaluation-peer-acadId",
            params: { acadId: data.id },
          });
        },
      },
      {
        type: "separator",
      },
      {
        label: "Manage Team-Lead Categories",
        icon: "i-mdi:lead-pencil",
        onSelect: async () => {
          await navigateTo({
            name: "Evaluation-teamlead-acadId",
            params: { acadId: data.id },
          });
        },
      },
      {
        type: "separator",
      },
      {
        label: "Edit",
        icon: "i-lucide-edit",
        onSelect: () => {
          handleUpdate(data);
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
          handleDelete(Number(data.id));
        },
      },
    ],
  ];
}

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
      class="overflow-y-auto custom-scrollbar h-auto cursor-auto"
      ref="table"
      v-model:global-filter="globalFilter"
      v-model:pagination="pagination"
      :pagination-options="{
        getPaginationRowModel: getPaginationRowModel(),
      }"
      :data="data"
      :columns="columns"
    >
    <template #empty>
      <div class="flex gap-2 flex-col items-center text-center">
          <svg-icon name="iconx/nofound" width="64" height="64"></svg-icon>
          <h3 class="text-lg font-semibold text-gray-600">No data available</h3>
          <p class="text-sm text-gray-500">Try adjusting your filters or check back later.</p>
      </div>
    </template>
      <template #increment-cell="{row}">
        <div class="flex items-center gap-2">
          {{row.index+1}}.
        </div>
      </template>
      <template #view-cell="{row}">

        <UButton icon="mdi:show" variant="subtle" :color="store.vAcadId === row.original.id ? 'success' : 'primary'" size="xs" @click="store.viewAcademicYear(
          row.original.id,
          row.original.semester,
          row.original.school_year
        )"></UButton>
      </template>
      <template #status-cell="{ row }">
        <UBadge v-if="row.original.status === 'PENDING'" color="error">PENDING</UBadge>
        <UBadge
          v-else-if="row.original.status === 'ONGOING'"
          color="neutral"
          variant="outline"
          >ONGOING</UBadge
        >
        <UBadge v-else color="neutral">COMPLETED</UBadge>
      </template>
      <template #peerTemplate-cell="{ row }">
        <UBadge v-if="row.original.peerTemplate" class="uppercase">{{
          row.original.peerTemplate.template_name
        }}</UBadge>
        <UBadge v-else class="uppercase" color="error">NO TEMPLATE</UBadge>
      </template>
      <template #teamLeadTemplate-cell="{ row }">
        <UBadge v-if="row.original.teamLeadTemplate" class="uppercase">{{
          row.original.teamLeadTemplate.template_name
        }}</UBadge>
        <UBadge v-else class="uppercase" color="error">NO TEMPLATE</UBadge>
      </template>

      <template #semester-cell="{ row }">
        <div v-if="row.original.semester === 1">
          <span>First Semester</span>
        </div>
        <div v-else>
          <span>Second Semester</span>
        </div>
      </template>

      <template #action-cell="{ row }">
        <UDropdownMenu :items="getDropdownActions(row.original)" v-if="row.original.status !== 'COMPLETED'">
          <UButton icon="i-lucide-ellipsis-vertical" color="neutral" variant="ghost" />
        </UDropdownMenu>
      </template>
    </UTable>
    <UITablePagination :table="table" v-if="table"> </UITablePagination>
  </UCard>
</template>
