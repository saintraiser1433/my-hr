<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import { getPaginationRowModel } from "@tanstack/vue-table";
const UButton = resolveComponent("UButton") as Component;

const props = defineProps({
  data: {
    type: Array as PropType<EmployeeRatingStatus[]>,
    required: true,
    default: () => [],
  },
  role: {
    type: String,
    default: "admin",
  },
});

const emits = defineEmits(["view", "evaluate"]);
const { pagination, globalFilter, refreshTable } = usePagination();
const table = useTemplateRef("table");
const { createColumn } = useTableColumns(UButton);
const config = useRuntimeConfig();
const handleEvaluate = async (data: EmployeeRatingStatus) => {
  emits("evaluate", data);
};

const handleView = async (data: EmployeeRatingStatus) => {
  emits("view", data);
};

const columns: TableColumn<any>[] = [
  createColumn("#", "#", true, (row) => `${row.index + 1}`),
  createColumn("evaluatee", "Evaluatee", true),
];

// Conditionally add columns based on role
if (props.role === "admin") {
  columns.push(
    createColumn("team-evaluation-status", "Team Evaluation Status", true),
    createColumn("peer-evaluation-status", "Peer Evaluation Status", true),
    createColumn("peer-to-evaluate", "Peer To Evaluate", true)
  );
} else if (props.role === "peer") {
  columns.push(createColumn("peer-evaluation-status", "Peer Evaluation Status", true));
} else if (props.role === "teamlead") {
  columns.push(createColumn("team-evaluation-status", "Team Evaluation Status", true));
}

columns.push(createColumn("action", "Action", false));

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
    <template #empty>
      <div class="flex gap-2 flex-col items-center text-center">
          <svg-icon name="iconx/nofound" width="64" height="64"></svg-icon>
          <h3 class="text-lg font-semibold text-gray-600">No data available</h3>
          <p class="text-sm text-gray-500">Try adjusting your filters or check back later.</p>
      </div>
    </template>
      <template #evaluatee-cell="{ row }">
        <div class="flex items-center gap-3">
          <UAvatar
            :src="`${config.public.STORAGE_URL_AVATAR}/${row.original.photo_path}`"
            size="lg"
          />
          <div>
            <p class="font-medium capitalize text-(--ui-text-highlighted)">
              {{ row.original.evaluatee }}
            </p>
          </div>
        </div>
      </template>
      <template #team-evaluation-status-cell="{ row }">
        <UBadge
          :icon="row.original.isEvaluatedByTeamLead ? 'lucide-check' : 'majesticons-timer-line'"
          :color="row.original.isEvaluatedByTeamLead ? 'primary' : 'neutral'"
          :variant="row.original.isEvaluatedByTeamLead ? 'solid' : 'outline'"
          :label="row.original.isEvaluatedByTeamLead ? 'Evaluated' : 'Ongoing'"
        ></UBadge>
      </template>
      <template #peer-evaluation-status-cell="{ row }">
        <UBadge
          :icon="row.original.isFinishedPeerEvaluate ? 'lucide-check' : 'majesticons-timer-line'"
          :color="row.original.isFinishedPeerEvaluate ? 'primary' : 'neutral'"
          :variant="row.original.isFinishedPeerEvaluate ? 'solid' : 'outline'"
          :label="row.original.isFinishedPeerEvaluate ? 'Evaluated' : 'Ongoing'"
        ></UBadge>
      </template>
      <template #peer-to-evaluate-cell="{ row }">
        <span class="italic" v-if="!row.original.peerToEvaluate">To be set</span>
        <span class="font-bold" v-else>{{ row.original.peerToEvaluate }}</span>
      </template>
      <template #action-cell="{ row }">
        <div class="flex gap-2" v-if="role !== 'admin'">
          <UButton
            v-if="
              (role === 'teamlead' && !row.original.isEvaluatedByTeamLead) ||
              (role === 'peer' && !row.original.isFinishedPeerEvaluate)
            "
            icon="lucide:view"
            size="sm"
            @click="handleEvaluate(row.original)"
          >
            Evaluate
          </UButton>
          <UButton
            v-else
            icon="lucide:view"
            variant="subtle"
            size="sm"
            @click="handleView(row.original)"
          >
            View Ratings
          </UButton>
        </div>
        <div v-if="role === 'admin'">
          <UButton icon="lucide:view" variant="subtle" size="sm" @click="handleView(row.original)">
            View Ratings
          </UButton>
        </div>
      </template>
    </UTable>
    <UITablePagination :table="table" v-if="table"> </UITablePagination>
  </UCard>
</template>
