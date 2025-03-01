<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
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

const table = useTemplateRef("table");
const { data } = toRefs(props);

const { createColumn } = useTableColumns(UButton);
const { pagination, globalFilter, refreshTable } = usePagination();

const handleDelete = (id: number) => {
  emits("delete", id);
};

const handleUpdate = (item: ApplicantModel) => {
  emits("update", item);

};

const columns: TableColumn<any>[] = [
  createColumn("increment", "#", true, (row) => `${row.index + 1}`),
  createColumn("applicant", "Applicant Name", true, (row) =>
    h("span", { class: "capitalize" }, row.getValue("applicant"))
  ),
  createColumn("job", "Job Applying", true, (row) =>
    h("span", { class: "capitalize" }, row.getValue("job"))
  ),

  createColumn("status", "Status", true),
  createColumn("applied_date", "Date Apply", true, (row) =>
    h("span", { class: "capitalize" }, row.getValue("applied_date"))
  ),
  createColumn("action", "Action", false),
];


const myData = computed(() => {
  return data.value.map((item) => ({
    id: item.id,
    job: item.jobApply?.title,
    status: item.status,
    applicant: `${item.information?.[0]?.last_name}, ${item.information?.[0]?.last_name} ${item.information?.[0]?.middle_name[0]}`,
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
  <UITableSearch v-model:search="globalFilter" v-if="table" :table="table">
    <template #actions>
      <slot name="actions"></slot>
    </template>
  </UITableSearch>
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
        <div v-if="row.original.status == 'PENDING'">
          <UBadge icon="i-mdi-account-pending" color="neutral" variant="outline">PENDING</UBadge>
        </div>
        <div v-else-if="row.original.status == 'ONGOING'">
          <UBadge icon="i-majesticons-timer-line" color="neutral" variant="outline">ONGOING</UBadge>
        </div>
        <div v-else>
          <UBadge color="neutral" variant="outline">UNKNOWN</UBadge>
        </div>


      </template>
      <template #action-cell="{ row }">
        <div class="flex items-center gap-2">
          <UButton size="sm" @click="handleUpdate(row.original)">
            <Icon name="lucide:edit"></Icon>
          </UButton>
          <UButton color="primary" variant="outline" size="sm" @click="handleDelete(row.original.id || 0)">
            <Icon name="lucide:x"></Icon>
          </UButton>
        </div>
      </template>
    </UTable>
    <UITablePagination :table="table" v-if="table">
    </UITablePagination>
  </UCard>
</template>
