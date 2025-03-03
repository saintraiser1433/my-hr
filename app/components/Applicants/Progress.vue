<script setup lang="ts">
import type { DropdownMenuItem, TableColumn } from "@nuxt/ui";
import { getPaginationRowModel } from "@tanstack/vue-table";
const UButton = resolveComponent("UButton") as Component;

const props = defineProps({
  data: {
    type: Array as PropType<ApplicantModel[]>,
    required: true,
    default: () => [],
  },

});
const emits = defineEmits<{
  (e: "update", payload: ApplicantModel): void;
  (e: "delete", id: number): void;
}>();
const { data } = toRefs(props);
const table = useTemplateRef("table");
const { createColumn } = useTableColumns(UButton);
const { pagination, globalFilter, refreshTable } = usePagination();
const { $datefns } = useNuxtApp();
const progressVal = ref(1);


const columns: TableColumn<any>[] = [
  createColumn("increment", "#", true, (row) => `${row.index + 1}`),
  createColumn("applicant", "Screen Type", true),
  createColumn("status", "Status", true),
  createColumn("action", "Action", false),
];


const myData = computed(() => {
  return data.value.map((item) => ({
    id: item.id,
    avatar: '/profile.jpg',
    job: item.jobApply?.title,
    status: item.status,
    applicant: `${item.information?.[0]?.last_name}, ${item.information?.[0]?.first_name} ${item.information?.[0]?.middle_name[0]}`,
    applied_date: item.createdAt
  }))
})



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

  <UCard :ui="{
    root: 'overflow-hidden ',
    body: 'p-0 sm:p-0',
    footer: 'p-0 sm:px-0',
  }">
    <UTable sticky class="overflow-y-auto custom-scrollbar h-auto cursor-auto" ref="table"
      v-model:global-filter="globalFilter" v-model:pagination="pagination" :pagination-options="{
        getPaginationRowModel: getPaginationRowModel(),
      }" :data="myData" :columns="columns">
      <template #status-cell="{ row }">
        <UBadge icon="i-lucide-check" color="neutral" variant="outline">PASSED</UBadge>
      </template>

      <template #action-cell="{ row }">
        <UButton icon="i-lucide-eye" title="Review" size="sm" :to="{ path: `/applicants/${row.original.id}` }">
        </UButton>
      </template>
    </UTable>
    <UITablePagination :table="table" v-if="table">
    </UITablePagination>
  </UCard>
</template>
