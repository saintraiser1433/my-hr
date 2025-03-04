<script setup lang="ts">
import type { FormSubmitEvent, TableColumn } from "@nuxt/ui";
import { getPaginationRowModel } from "@tanstack/vue-table";
const UButton = resolveComponent("UButton") as Component;

const props = defineProps({
  data: {
    type: Array as PropType<ScreeningProgressList[]>,
    required: true,
    default: () => [],
  },

});

const emits = defineEmits<{
  (e: "dataDate", payload: InterviewDate): void;
}>();


const { data: datas } = toRefs(props);
const table = useTemplateRef("table");
const { createColumn } = useTableColumns(UButton);
const { $datefns } = useNuxtApp();
const { pagination, globalFilter, refreshTable } = usePagination();

const columns: TableColumn<any>[] = [
  createColumn("increment", "#", true, (row) => `${row.index + 1}`),
  createColumn("screening", "Screening Title", true),
  createColumn("dateInterview", "Date Interview", true),
  createColumn("status", "Status", true),
  createColumn("action", "Action", false),
];




const model = ref<InterviewDate>({
  date: "",
  id: 0,
});

const edit = async (data: InterviewDate) => {
  model.value = data;
}


const onSubmit = async (data: InterviewDate) => {
  emits("dataDate", data);
  model.value = { date: "", id: 0, }
};


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
      }" :data="datas" :columns="columns">
      <template #screening-cell="{ row }">
        <span>{{ row.original.screening.title }}</span>
      </template>
      <template #dateInterview-cell="{ row }">
        <span v-if="row.original.dateInterview"> {{ $datefns.format(new Date(row.original.dateInterview), "dd-MMM-yyyy - hh:mm a") }}
        </span>

        <UPopover v-else arrow :content="{
          align: 'center',
          side: 'left',
          sideOffset: 8
        }">
          <UButton label="Open" color="neutral" variant="subtle"
            @click="edit({ id: row.original.id, date: row.original.dateInterview })">Click here to assigned</UButton>

          <template #content>
            <div class="flex flex-col items-start gap-2 p-2">
              <h5 class="font-semibold">Date Time</h5>
              <UITextInput type="datetime-local" v-model="model.date" required />
              <UButton @click="onSubmit(model)" variant="subtle">Save</UButton>
            </div>

          </template>
        </UPopover>
      </template>
      <template #status-cell="{ row }">
        <UBadge v-if="row.original.status == 'PENDING'" icon="i-lucide-timer" color="neutral" variant="outline">TO BE
          RATED</UBadge>
        <UBadge v-else-if="row.original.status == 'FAILED'" icon="i-lucide-x" color="error" variant="outline">FAILED TO
          PROCEED</UBadge>
        <UBadge v-else-if="row.original.status == 'PASSED'" icon="i-lucide-check">PASSED</UBadge>
        <UBadge v-else>UKNOWN RATE</UBadge>
      </template>

      <template #action-cell="{ row }">
        <div class="flex gap-1 items-center">
          <UButton icon="i-lucide-eye" title="Review" size="sm" :to="{ path: `/applicants/${row.original.id}` }">
          </UButton>
          <UButton icon="i-lucide-send" title="Remind User" variant="outline" size="sm"
            :to="{ path: `/applicants/${row.original.id}` }">
          </UButton>
        </div>

      </template>
    </UTable>
    <UITablePagination :table="table" v-if="table">
    </UITablePagination>
  </UCard>
</template>
