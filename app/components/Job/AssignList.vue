<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import { getPaginationRowModel } from "@tanstack/vue-table";
const UButton = resolveComponent("UButton") as Component;
const UCheckbox = resolveComponent('UCheckbox') as Component;
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
  }
});

const emits = defineEmits<{
  (e: "assign", payload: ScreeningModel[]): void;
  (e: "delete", jobId: number, screeningId: number): void;
  (e: "test", payload: any): void;
}>();
const { $toast } = useNuxtApp();
const { pagination, globalFilter, refreshTable } = usePagination();
const table = useTemplateRef("table");
const { createColumn } = useTableColumns(UButton);
const { createColumnWithCheckBox } = useTableColumnCheckBox(UCheckbox, table);

const value = ref([]);

const rowSelection = ref({})

const handleDelete = (jobId: number, screeningId: number) => {
  emits("delete", jobId, screeningId);
};

const handleTest = () => {
  emits("test", rowSelection.value);
};

const handleAssign = () => {
  if (!value.value.length) {
    return $toast.error('No selected type found');
  }
  emits("assign", value.value);
  value.value = [];
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
    }
  }
);


</script>

<template>

  <div class="flex justify-between items-center gap-2 ">
    <div class="flex items-center gap-2 my-2">
      <USelectMenu v-model="value" multiple :items="items" label-key="title" size="sm"
        placeholder="Select Screening Type" class="w-70" />
      <UButton color="primary" @click="handleAssign" variant="solid" size="md">
        <UIcon name="typcn-plus"></UIcon>
      </UButton>
    </div>
    <div>
      <UButton color="primary" @click="handleTest" variant="solid" size="sm">
        <UIcon name="typcn-plus"></UIcon> Remove
      </UButton>
    </div>

  </div>
  <UCard :ui="{
    root: 'overflow-hidden ',
    body: 'p-0 sm:p-0',
    footer: 'p-0 sm:px-0',
  }">
    <UTable sticky v-model:row-selection="rowSelection"
      class="overflow-y-auto custom-scrollbar h-120 lg:h-150 cursor-auto" ref="table"
      v-model:global-filter="globalFilter" v-model:pagination="pagination" :pagination-options="{
        getPaginationRowModel: getPaginationRowModel(),
      }" :data="data" :columns="columns">

    </UTable>
    <UITablePagination :table="table" v-if="table"> </UITablePagination>
  </UCard>
</template>
