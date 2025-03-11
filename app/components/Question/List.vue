<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import { getPaginationRowModel } from "@tanstack/vue-table";
const UButton = resolveComponent("UButton") as Component;
const UCheckbox = resolveComponent("UCheckbox") as Component;
const props = defineProps({
  data: {
    type: Array as PropType<QuestionModel[]>,
    default: () => [],
  },
  legend: {
    type: Array as PropType<TemplateDetail[]>,
    default: () => [],
  }
});
const emits = defineEmits<{
  (e: "update", payload: QuestionModel): void;
  (e: "delete", id: number): void;
}>();

const table = useTemplateRef("table");
const { legend } = toRefs(props);
const { createColumn } = useTableColumns(UButton);
const { pagination, globalFilter, refreshTable } = usePagination();

const handleDelete = (id: number) => {
  emits("delete", id);
};

const handleUpdate = (item: QuestionModel) => {
  emits("update", item);
};



const columns = computed(() => [
  createColumn("increment", "#", true, (row) => {
    return h("div", { class: "max-w-1" }, `${row.index + 1}`);
  }),
  createColumn("question", "Question", true),
  ...legend.value.map((item) =>
    createColumn(item.title.toUpperCase(), item.title.toUpperCase(), false, (row) => {
      return h(UCheckbox, { disabled: "true" })
    })

  ),
  createColumn("action", "Action", false),
] as TableColumn<any>[]);


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
    root: 'overflow-hidden',
    header: 'p-0 sm:px-3 py-2',
    body: 'p-4 sm:px-2 sm:py-2',
    footer: 'p-0 sm:px-0',
  }">
    <template #header>
      <h3 class="font-bold text-(--foreground)">LIST OF QUESTIONS</h3>
    </template>
    <div class="flex items-center gap-4">
      <h4 class="font-semibold">LEGENDS:</h4>
      <div class="flex items-center gap-3">
        <UBadge variant="soft" class="uppercase" v-for="(data, index) in legend" :key="index">{{ data.score }} -
          {{ data.title }}
        </UBadge>
      </div>
    </div>
    <USeparator class="my-2"></USeparator>
    <UCard :ui="{
      root: 'overflow-hidden',
      body: 'p-0 sm:p-0',
      footer: 'p-0 sm:px-0',
    }">
      <UTable sticky class="overflow-y-auto custom-scrollbar h-150 cursor-auto" ref="table"
        v-model:global-filter="globalFilter" v-model:pagination="pagination" :pagination-options="{
          getPaginationRowModel: getPaginationRowModel(),
        }" :data="data" :columns="columns">
        <template #question-cell="{ row }">
          <div class="max-w-lg text-wrap text-sm" v-html="row.original.question"></div>
        </template>
        <template #action-cell="{ row }">
          <div class="flex items-center gap-2">
            <UButton icon="lucide:edit" size="xs" @click="handleUpdate(row.original)">
            </UButton>
            <UButton icon="lucide:x" color="primary" variant="outline" size="xs"
              @click="handleDelete(row.original.id || 0)">
            </UButton>
          </div>
        </template>
      </UTable>
      <UITablePagination :table="table" v-if="table"> </UITablePagination>
    </UCard>
  </UCard>
</template>
