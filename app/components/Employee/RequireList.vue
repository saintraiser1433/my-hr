<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import { getPaginationRowModel } from "@tanstack/vue-table";
const UButton = resolveComponent("UButton") as Component;
const UCheckbox = resolveComponent("UCheckbox") as Component;
const props = defineProps({
  data: {
    type: Array as PropType<EmployeeModel[]>,
    required: true,
    default: () => [],
  },
  items: {
    type: Array as PropType<UnchosenRequirements[]>,
    required: true,
    default: () => [],
  },
});

const emits = defineEmits<{
  (e: "assign", payload: ScreeningModel[]): void;
  (e: "unAssign", payload: number[]): void;
}>();
const { $toast, $datefns } = useNuxtApp();

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

const columns: TableColumn<any>[] = [
  createColumnWithCheckBox(),
  createColumn("increment", "#", true, (row) => `${row.index + 1}`),
  createColumn("requirements", "Requirements", true),
  createColumn("submitted_date", "Submitted Date", true),
  createColumn("expiry_date", "Document Expiry", true),
  createColumn("status", "Status", true),
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
        color="primary"
        icon="i-lucide-x"
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
      <template #submitted_date-cell="{ row }">
        <span v-if="row.original.submitted_date">{{
          $datefns.format(new Date(row.getValue("submittedAt")), "dd-MMM-yyyy")
        }}</span>
        <UBadge color="error" variant="solid" v-else>NO SUBMISSION YET</UBadge>
      </template>
      <template #expiry_date-cell="{ row }">
        <span v-if="row.original.expiry_date">{{
          $datefns.format(new Date(row.getValue("expiryDate")), "dd-MMM-yyyy")
        }}</span>
        <UBadge color="error" variant="solid" v-else>NO SUBMISSION YET</UBadge>
      </template>

      <template #status-cell="{ row }">
        <UBadge
          v-if="row.original.status === 'PENDING'"
          icon="i-mdi-account-pending"
          color="neutral"
          variant="outline"
          >{{ row.original.status }}</UBadge
        >
        <UBadge v-else-if="row.original.status === 'SUBMITTED'" icon="i-lucide-check">{{
          row.original.status
        }}</UBadge>
        <UBadge
          v-else-if="row.original.status === 'EXPIRED'"
          icon="i-lucide-x"
          color="error"
          >{{ row.original.status }}</UBadge
        >
      </template>
      <template #action-cell="{ row }">
        <UPopover
          arrow
          :content="{
            align: 'center',
            side: 'left',
            sideOffset: 8,
          }"
        >
          <UButton icon="i-lucide-eye" title="Review" size="sm"> </UButton>

          <template #content>
            <div class="flex items-start gap-2 p-2">
              <UButton color="primary" icon="i-lucide-check">Passed</UButton>
              <UButton icon="i-lucide-x" color="error">Failed</UButton>
            </div>
          </template>
        </UPopover>
      </template>
    </UTable>
    <UITablePagination :table="table" v-if="table"> </UITablePagination>
  </UCard>
</template>
