<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import { getPaginationRowModel } from "@tanstack/vue-table";
const UButton = resolveComponent("UButton") as Component;
const UCheckbox = resolveComponent("UCheckbox") as Component;
const props = defineProps({
  data: {
    type: Array as PropType<EmployeeRequirements[]>,
    default: () => [],
  },
  items: {
    type: Array as PropType<UnchosenRequirements[]>,
    default: () => [],
  },
});

const emits = defineEmits<{
  (e: "assign", payload: UnchosenRequirements[]): void;
  (e: "unAssign", payload: number[]): void;
  (e: "update", payload: EmployeeRequirements): void;
  (e: "reject", payload: SubmittedRequirements): void;
  (e: "submit", payload: EmployeeRequirements): void;
}>();
const config = useRuntimeConfig();
const { $datefns } = useNuxtApp();
const { pagination, globalFilter } = usePagination();
const table = useTemplateRef("table");
const { createColumn } = useTableColumns(UButton);
const { createColumnWithCheckBox } = useTableColumnCheckBox(UCheckbox, table);
const store = useAuthStore();
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
const reject = (data: SubmittedRequirements) => {
  emits("reject", {
    id: data.id,
    expiryDate: null,
    submittedAt: null,
    status: EmployeeRequirementStatus.REJECTED,
  });
};

const submit = (data: EmployeeRequirements) => {
  emits("submit", data);
};

const assign = () => {
  handleAssign();
  emits("assign", value.value);
  resetAssign();
};

const columns: TableColumn<any>[] = [
  ...(store.getRole === "Admin" ? [createColumnWithCheckBox()] : []),
  createColumn("increment", "#", true, (row) => `${row.index + 1}`),
  createColumn("requirements", "Requirements", true),
  createColumn("status", "Status", true),
  createColumn("submitted_date", "Submitted Date", true),
  createColumn("expiry_date", "Expiry Date", true),
  createColumn("document", "Document", false),
  createColumn("action", "Action", true),
  // ...(store.getRole === "Admin" ? [createColumn("action", "Action", false)] : []),
];
</script>

<template>
  <div class="flex justify-between items-center gap-2" v-if="store.getRole === 'Admin'">
    <div class="flex items-center gap-2 px-2 my-2">
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

      <template #document-cell="{ row }">
        <UButton
          icon="i-lucide-eye"
          :to="`${config.public.STORAGE_URL_REQUIREMENTS}/${row.original.fileName}`"
          target="_blank"
          title="Review"
          size="sm"
          :disabled="
            !row.original.fileName ||
            row.original.status === 'NOT_SUBMITTED' ||
            row.original.status === 'REJECTED'
          "
        >
          View
        </UButton>
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
        <UBadge
          v-else-if="row.original.status === 'NOT_SUBMITTED'"
          icon="i-lucide-x"
          color="error"
          variant="solid"
          >NO SUBMISSION YET</UBadge
        >
        <UBadge
          v-else-if="row.original.status === 'REJECTED'"
          icon="i-lucide-x"
          color="error"
          variant="solid"
          >REJECTED</UBadge
        >
      </template>
      <template #action-cell="{ row }">
        <UPopover
          v-if="store.getRole === 'Admin'"
          arrow
          :content="{
            align: 'center',
            side: 'left',
            sideOffset: 8,
          }"
        >
          <UButton
            icon="i-lucide-eye"
            :disabled="
              row.original.status === 'NOT_SUBMITTED' ||
              row.original.status === 'REJECTED'
            "
            title="Review"
            size="sm"
          >
          </UButton>

          <template #content>
            <div class="flex items-start gap-2 p-2">
              <UButton color="primary" icon="i-lucide-check" @click="update(row.original)"
                >Submit</UButton
              >
              <UButton icon="i-lucide-x" variant="outline" @click="reject(row.original)"
                >Reject</UButton
              >
            </div>
          </template>
        </UPopover>
        <UButton
          v-else-if="store.getRole !== 'Admin'"
          icon="i-lucide-arrow-right"
          title="Submit"
          size="sm"
          @click="submit(row.original)"
          :disabled="
            row.original.status === 'PENDING' || row.original.status === 'SUBMITTED'
          "
        >
        </UButton>
        <!-- <span v-else-if="store.getRole !=='Admin' && row.original.status === 'PENDING' || row.original.status === 'SUBMITTED'"  > </span> -->
      </template>
    </UTable>
    <UITablePagination :table="table" v-if="table"> </UITablePagination>
  </UCard>
</template>
