<script setup lang="ts">
import { h, ref } from "vue";
import type { TableColumn } from "@nuxt/ui";
const UButton = resolveComponent("UButton") as Component;
const props = defineProps({
  data: {
    type: Array as PropType<Question[]>,
    default: () => [],
  },
  legend: {
    type: Array as PropType<TemplateDetail[]>,
    default: () => [],
  },
  selected: {
    type: Object as PropType<Record<string, SubmitResult>>,
    required: true,
  },
  evaluationId: {
    type: Number,
  },
});
const { data, legend } = toRefs(props);
const { createColumn } = useTableColumns(UButton);
const emit = defineEmits(["checkbox-change"]);
const columns: TableColumn<any>[] = [
  createColumn("name", "Category", true),
  createColumn("question", "", false),
  ...legend.value.map((item) =>
    createColumn(item.id?.toString() || "", item.score?.toString(), false)
  ),
];

const groupingState = ref(["name"]); // Initial grouping state

const handleCheckboxChange = (rowId: string, data: SubmitResult) => {
  emit("checkbox-change", rowId, data);
};
</script>

<template>
  <UCard>
    <UTable :data="data" :columns="columns" v-model:grouping="groupingState">
      <!-- Question cell -->
      <template #empty>
      <div class="flex gap-2 flex-col items-center text-center">
          <svg-icon name="iconx/nofound" width="64" height="64"></svg-icon>
          <h3 class="text-lg font-semibold text-gray-600">No data available</h3>
          <p class="text-sm text-gray-500">Try adjusting your filters or check back later.</p>
      </div>
    </template>
      <template #question-cell="{ row }">
        <div class="text-wrap max-w-3xl" v-html="row.original.question"></div>
      </template>
      <template
        v-for="(datas, index) in legend"
        :key="index"
        #[`${datas.id?.toString()}-cell`]="{ row }"
      >
        <div @click.stop>
          <UCheckbox
            :ui="{
              base: 'ring-(--ui-primary)',
            }"
            color="neutral"
            size="md"
            :model-value="
              selected[row.original.id?.toString()]?.templateDetailId === datas.id
            "
            @update:model-value="
              (checked) => {
                if (checked) {
                  handleCheckboxChange(row.original.id?.toString(), {
                    questionId: row.original.id,
                    templateDetailId: Number(datas.id),
                    categoryId: row.original.categoryId,
                    evaluationId: evaluationId,
                  });
                }
              }
            "
          />
        </div>
      </template>
      <template #name-cell="{ row }">
        <div class="w-2">{{ row.original.name }}</div>
      </template>
    </UTable>
  </UCard>
</template>

<style></style>
