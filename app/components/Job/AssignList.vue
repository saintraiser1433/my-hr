<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import { getPaginationRowModel } from "@tanstack/vue-table";
const UButton = resolveComponent("UButton") as Component;
const UCheckbox = resolveComponent("UCheckbox") as Component;
const props = defineProps({
  data: {
    type: Array as PropType<JobScreeningModel[]>,
    required: true,
    default: () => [],
  },
  items: {
    type: Array as PropType<ScreeningModel[]>,
    required: true,
    default: () => [],
  },
});

const emits = defineEmits<{
  (e: "assign", payload: ScreeningModel[]): void;
  (e: "unAssign", payload: number[]): void;

}>();
const { pagination, globalFilter, refreshTable } = usePagination();
const table = useTemplateRef("table");
const { createColumn } = useTableColumns(UButton);
const { createColumnWithCheckBox } = useTableColumnCheckBox(UCheckbox, table);
const {$toast} = useNuxtApp();
const { data } = toRefs(props);
const {
  value,
  selectedItems,
  rowSelection,
  unAssigned,
  resetAssign,
  checkEmpty,
} = useMultipleSelect(data);

const unassign = () => {
  unAssigned();
  emits("unAssign", selectedItems.value);
};

const assign = () => {
  if (!value.value.length) {
      return $toast.error("No selected type found");
  }
  emits("assign", value.value);
  resetAssign();
};

const columns: TableColumn<any>[] = [
  createColumnWithCheckBox(),
  createColumn("sequence_number", "Sequence", true),
  createColumn("screening_title", "Screening Type", true),
];

watch(
  () => props.data,
  (newVal, oldVal) => {
    if (newVal.length !== oldVal.length) {
      refreshTable();
      rowSelection.value = {};
    }
  }
);
</script>

<template>

  <div class="flex justify-between items-center gap-2">
    <div class="flex items-center gap-2 my-2 px-2">
      <USelectMenu
        v-model="value"
        :items="items"
        label-key="title"
        size="md"
        placeholder="Select Screening Type"
        class="w-100"
        :ui="{
          value: 'text-wrap',
          item: 'capitalize',
        }"
        multiple
      />
      <UButton
        icon="i-typcn-plus"
        color="primary"
        @click="assign"
        variant="solid"
        size="md"
      >
      </UButton>
    </div>
    <div>
      <UButton
        v-if="checkEmpty"
        icon="i-lucide-x"
        color="primary"
        @click="unassign"
        variant="solid"
        size="sm"
      >
        Remove
      </UButton>
    </div>
  </div>
  <UCard
    :ui="{
      root: 'overflow-hidden ',
      body: 'p-0 sm:p-0',
      footer: 'p-0 sm:px-0',
    }"
  >
    <UTable
      sticky
      v-model:row-selection="rowSelection"
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
          <p class="text-sm text-gray-500">
            Try adjusting your filters or check back later.
          </p>
        </div>
      </template>
      <template #screening_title-cell="{ row }">
        <span class="capitalize">{{ row.original.screening_title }}</span>
      </template>
     
    </UTable>
    <UITablePagination :table="table" v-if="table"> </UITablePagination>
  </UCard>
</template>
