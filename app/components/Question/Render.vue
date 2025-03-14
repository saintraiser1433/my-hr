<script setup lang="ts">
import { h, ref } from "vue";
import type { TableColumn } from "@nuxt/ui";
const UButton = resolveComponent("UButton") as Component;
const UCheckbox = resolveComponent("UCheckbox") as Component;
const props = defineProps({
  data: {
    type: Array as PropType<Criteria[]>,
    default: () => [],
  },
  legend: {
    type: Array as PropType<TemplateDetail[]>,
    default: () => [],
  },
});
const { data, legend } = toRefs(props);
const { createColumn } = useTableColumns(UButton);

const columns: TableColumn<any>[] = [
  createColumn("name", "Category", true),
  createColumn("question", "", false),

  ...legend.value.map((item) =>
    createColumn(item.title.toUpperCase(), item.score.toString(), false, (row) => {
      return h(UCheckbox);
    })
  ),
];
const flatData = data.value.flatMap((group) => group.questions);
const groupingState = ref(["name"]); // Initial grouping state
</script>

<template>
  <UCard
    :ui="{
      root: 'overflow-hidden',
      header: 'p-0 sm:px-3 py-2',
      body: 'p-0 sm:px-0 sm:py-2',
      footer: 'p-0 sm:px-0',
    }"
  >
    <UTable :data="flatData" :columns="columns" v-model:grouping="groupingState">
      <template #question-cell="{ row }">
        <div class="text-wrap max-w-3xl" v-html="row.original.question"></div>
      </template>
      <template #name-cell="{ row }">
        <div class="w-2">{{ row.original }}</div>
      </template>
    </UTable>
  </UCard>
</template>

<style></style>
