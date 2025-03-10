<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import { getPaginationRowModel } from "@tanstack/vue-table";
const UButton = resolveComponent("UButton") as Component;
const UCheckbox = resolveComponent("UCheckbox") as Component;
const props = defineProps({
  data: {
    type: Array as PropType<EmployeeRequirements[]>,
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
  (e: "assign", payload: UnchosenRequirements[]): void;
  (e: "unAssign", payload: number[]): void;
  (e: "update", payload: EmployeeRequirements): void;
  (e: "pending", payload: SubmittedRequirements): void;
}>();
const { $datefns } = useNuxtApp();
const { pagination, globalFilter, refreshTable } = usePagination();
const table = useTemplateRef("table");
const { createColumn } = useTableColumns(UButton);
const { createColumnWithCheckBox } = useTableColumnCheckBox(UCheckbox, table);

const { data } = toRefs(props);
const {
  value,
  selectedItems,
  rowSelection,
  unAssigned,
  handleAssign,
  resetAssign,
  checkEmpty,
} = useMultipleSelect(data);

const unassign = () => {
  unAssigned();
  emits("unAssign", selectedItems.value);
};

const update = (data: EmployeeRequirements) => {
  emits("update", data);
};
const pending = (data: SubmittedRequirements) => {
  emits("pending", {
    id: data.id,
    expiryDate: null,
    submittedAt: null,
    status: EmployeeRequirementStatus.PENDING,
  });
};

const assign = () => {
  handleAssign();
  emits("assign", value.value);
  resetAssign();
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
        size="md"
        placeholder="Select Screening Type"
        class="w-100"
        :ui="{
          value: 'text-wrap',
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
        color="primary"
        icon="i-lucide-x"
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
      <template #submitted_date-cell="{ row }">
        <span v-if="row.original.submittedAt">
          {{ $datefns.format(new Date(row.original.submittedAt), "dd-MMM-yyyy") }}
        </span>
        <UBadge color="error" variant="solid" v-else>NO SUBMISSION YET</UBadge>
      </template>
      <template #expiry_date-cell="{ row }">
        <span v-if="row.original.expiryDate">
          {{ $datefns.format(new Date(row.original.expiryDate), "dd-MMM-yyyy") }}
        </span>

        <UBadge color="error" variant="solid" v-else>N/A</UBadge>
      </template>

      <template #status-cell="{ row }">
        <UBadge
          v-if="row.original.status === 'PENDING'"
          icon="i-mdi-account-pending"
          color="neutral"
          variant="outline"
        >
          {{ row.original.status }}</UBadge
        >
        <UBadge v-else-if="row.original.status === 'SUBMITTED'" icon="i-lucide-check">{{
          row.original.status
        }}</UBadge>
        <UBadge
          v-else-if="row.original.status === 'EXPIRED'"
          icon="i-lucide-x"
          color="error"
          >{{ row.original.status }}
        </UBadge>
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
              <UButton color="primary" icon="i-lucide-check" @click="update(row.original)"
                >Submit</UButton
              >
              <UButton
                icon="mdi-account-pending"
                variant="outline"
                @click="pending(row.original)"
                >Pending</UButton
              >
            </div>
          </template>
        </UPopover>
      </template>
    </UTable>
    <UITablePagination :table="table" v-if="table"> </UITablePagination>
  </UCard>
</template>
