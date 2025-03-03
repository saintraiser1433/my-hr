<script setup lang="ts">
import type { DropdownMenuItem, TableColumn } from "@nuxt/ui";
import { getPaginationRowModel } from "@tanstack/vue-table";
const UButton = resolveComponent("UButton") as Component;
const UAvatar = resolveComponent("UAvatar") as Component;
const props = defineProps({
  data: {
    type: Array as PropType<ApplicantModel[]>,
    required: true,
    default: () => [],
  },

});
const emits = defineEmits<{
  (e: "review", payload: ApplicantModel): void;
}>();
const { data } = toRefs(props);
const table = useTemplateRef("table");
const { createColumn } = useTableColumns(UButton);
const { pagination, globalFilter, refreshTable } = usePagination();
const { $datefns } = useNuxtApp();

const handleReview = (item: ApplicantModel) => {
  emits("review", item);

};



const columns: TableColumn<any>[] = [
  createColumn("increment", "#", true, (row) => `${row.index + 1}`),

  createColumn("applicant", "Applicant Name", true),
  createColumn("job", "Job Applying", true, (row) =>
    h("span", { class: "capitalize" }, row.getValue("job"))
  ),



  createColumn("status", "Status", true),
  createColumn("applied_date", "Date Apply", true, (row) =>
    h("span", { class: "capitalize" }, $datefns.format(new Date(row.getValue("applied_date")), "dd-MMM-yyyy"))
  ),
  createColumn("action", "Review", false),
];


const myData = computed(() => {
  return data.value.map((item) => ({
    id: item.id,
    avatar: '/profile.jpg',
    job: item.jobApply?.title,
    status: item.status,
    applicant: `${item.information?.[0]?.last_name}, ${item.information?.[0]?.first_name} ${item.information?.[0]?.middle_name[0]}`,
    applied_date: item.createdAt,
    resume: item.information?.[0]?.resume_path,
    email: item.information?.[0]?.email,
    contact_number: item.information?.[0]?.contact_number
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
        <UBadge icon="i-mdi-account-pending" color="neutral" variant="outline">{{ row.original.status }}</UBadge>
      </template>
      <template #applicant-cell="{ row }">
        <div class="flex items-center gap-3">
          <UAvatar :src="row.original.avatar" size="lg" />
          <div>
            <p class="font-medium capitalize text-(--ui-text-highlighted)">
              {{ row.original.applicant }}
            </p>
          </div>
        </div>
      </template>
      <template #action-cell="{ row }">
        <UButton icon="i-lucide-eye" title="Review" size="sm" @click="handleReview(row.original)">
        </UButton>
      </template>
    </UTable>
    <UITablePagination :table="table" v-if="table">
    </UITablePagination>
  </UCard>
</template>
