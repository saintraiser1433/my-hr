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
  role:{
    type:String,
    default:'admin'
  }
});

const emits = defineEmits(["view", "evaluate"]);
const { pagination, globalFilter } = usePagination();
const table = useTemplateRef("table");
const { createColumn } = useTableColumns(UButton);
const config = useRuntimeConfig();
const handleEvaluate = async (id: number, employeeid?: number) => {
  emits("evaluate", id, employeeid);
};

const handleView = async (employeeId: number) => {
  emits("view", employeeId);
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
  columns.push(
    createColumn("peer-evaluation-status", "Peer Evaluation Status", true),
  );
} else if (props.role === "teamlead") {
  columns.push(createColumn("team-evaluation-status", "Team Evaluation Status", true));
}

columns.push(createColumn("action", "Action", false));


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
          :color="row.original.isEvaluatedByTeamLead ? 'success' : 'error'"
          variant="subtle"
          :label="row.original.isEvaluatedByTeamLead ? 'Evaluated' : 'Ongoing'"
        ></UBadge>
      </template>
      <template #peer-evaluation-status-cell="{ row }">
        <UBadge
          :color="row.original.isFinishedPeerEvaluate ? 'success' : 'error'"
          variant="subtle"
          :label="row.original.isFinishedPeerEvaluate ? 'Evaluated' : 'Ongoing'"
        ></UBadge>
      </template>
      <template #peer-to-evaluate-cell="{ row }">
        <span class="font-bold flex items-center justify-center">{{ row.original.peerToEvaluate}}</span>
      </template>
      <template #action-cell="{ row }">
        <div class="flex gap-2" v-if="role !== 'admin'">
  <UButton
    v-if="(role === 'teamlead' && !row.original.isEvaluatedByTeamLead) || 
          (role === 'peer' && !row.original.isFinishedPeerEvaluate)"
    icon="lucide:view"
    size="sm"
    @click="handleEvaluate(row.original.id, row.original.employeeId)"
  >
    Evaluate
  </UButton>
  <UButton
    v-else
    icon="lucide:view"
    variant="subtle"
    size="sm"
    @click="handleView(row.original.id)"
  >
    View Ratings
  </UButton>
</div>
<div v-if="role === 'admin'">
  <UButton
    icon="lucide:view"
    size="sm"
    @click="handleView(row.original.id)"
  >
    View Ratings
  </UButton>
</div>
      </template>
    </UTable>
    <UITablePagination :table="table" v-if="table"> </UITablePagination>
  </UCard>
</template>
