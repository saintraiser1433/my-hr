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
  (e: "up", payload: DirectionModel): void;
  (e: "down", payload: DirectionModel): void;
}>();
const { $toast } = useNuxtApp();

const { pagination, globalFilter, refreshTable } = usePagination();
const table = useTemplateRef("table");
const { createColumn } = useTableColumns(UButton);
const { createColumnWithCheckBox } = useTableColumnCheckBox(UCheckbox, table);
const value = ref([]);
const rowSelection = ref({});
const { data } = toRefs(props);
const checkEmpty = computed(() => Object.keys(rowSelection.value).length > 0);

const unAssigned = () => {
  const selectedItems = Object.keys(rowSelection.value)
    .map((key) => data.value[Number(key)]?.id)
    .filter(Boolean) as number[];

  emits("unAssign", selectedItems);
};

const handleAssign = () => {
  if (!value.value.length) {
    return $toast.error("No selected type found");
  }
  emits("assign", value.value);
  value.value = [];
};

const up = (id: number, direction: Directions) => {
  const data = {
    id,
    direction,
  };
  emits("up", data);
};

const down = (id: number, direction: Directions) => {
  const data = {
    id,
    direction,
  };
  emits("down", data);
};

const columns: TableColumn<any>[] = [
  createColumnWithCheckBox(),
  createColumn("sequence_number", "Sequence", true),
  createColumn("screening_title", "Screening Type", true),
  createColumn("action", "Action", true),
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
    <div class="flex items-center gap-2 my-2">
      <USelectMenu
        v-model="value"
        :items="items"
        label-key="title"
        size="sm"
        placeholder="Select Screening Type"
        class="w-70"
        multiple
      />
      <UButton
        icon="i-typcn-plus"
        color="primary"
        @click="handleAssign"
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
        @click="unAssigned"
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
      <template #action-cell="{ row }">
        <div class="flex gap-2 items-center">
          <UButton
            ><UIcon name="mingcute:up-fill" @click="up(row.original.id, 'up')"></UIcon
          ></UButton>
          <UButton variant="outline"
            ><UIcon
              name="mingcute:down-fill"
              @click="down(row.original.id, 'down')"
            ></UIcon
          ></UButton>
        </div>
      </template>
    </UTable>
    <UITablePagination :table="table" v-if="table"> </UITablePagination>
  </UCard>
</template>
