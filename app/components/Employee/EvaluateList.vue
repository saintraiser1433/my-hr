<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import { getPaginationRowModel } from "@tanstack/vue-table";
const UButton = resolveComponent("UButton") as Component;

const props = defineProps({
  data: {
    type: Array as PropType<EmployeesEvaluate[]>,
    required: true,
    default: () => [],
  },
  type: {
    type:String,
    default:'evaluate'
  }
});


const emits = defineEmits(['view'])
const { pagination, globalFilter, refreshTable } = usePagination();
const table = useTemplateRef("table");
const { createColumn } = useTableColumns(UButton);
const config = useRuntimeConfig();
const handleEvaluate = async(id: number) => {
  await navigateTo({name:'team-evaluate-empId',params:{empId:id}})
};

const handleView = async(employeeId: number) => {
  emits('view',employeeId)
};



const columns: TableColumn<any>[] = [
  createColumn("#", "#", true, (row) => `${row.index + 1}`),
  createColumn("fullname", "Full Name", true),
  createColumn("status", "Evaluation Status", true),
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
      <template #fullname-cell="{row}">
        <div class="flex items-center gap-3">
          <UAvatar
            :src="`${config.public.STORAGE_URL_AVATAR}/${row.original.photo_path}`"
            size="lg"
          />
          <div>
            <p class="font-medium capitalize text-(--ui-text-highlighted)">
              {{ row.original.fullname }}
            </p>
          </div>
        </div>
      </template>
      <template #status-cell="{row}">
          <UBadge :color="row.original.status ? 'success' : 'error'" variant="subtle" 
          :label="row.original.status ? 'Evaluated' : 'Not Evaluated'"></UBadge>
      </template>
      <template #action-cell="{ row }">
        <div class="flex items-center gap-2">
          <UButton v-if="type === 'evaluate'" icon="lucide:view" size="sm" @click="handleEvaluate(row.original.id)" :disabled="row.original.status">
            Evaluate
          </UButton>
          <UButton v-else-if="type === 'custom'" icon="lucide:view" size="sm" @click="handleView(row.original.id)" :disabled="!row.original.status">
            View Ratings
          </UButton>
        </div>
      </template>
    </UTable>
    <UITablePagination :table="table" v-if="table">
    </UITablePagination>
  </UCard>
</template>
