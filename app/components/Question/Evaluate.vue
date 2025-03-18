<script setup lang="ts">
import { h, ref } from "vue";
import type { TableColumn } from "@nuxt/ui";
const UButton = resolveComponent("UButton") as Component;
const props = defineProps({
  data: {
    type: Array as PropType<Criteria[]>,
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
  employeesId: {
    type: Number,
    required: true,
  },
  academicYearId: {
    type: Number,
    required: true,
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
const flatData = data.value.flatMap((group) => group.questions);
const groupingState = ref(["name"]); // Initial grouping state

const handleCheckboxChange = (rowId: string, data: SubmitResult) => {
  emit("checkbox-change", rowId, data);
};
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
      <!-- Question cell -->
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
                    employeesId,
                    templateDetailId: Number(datas.id),
                    academicYearId,
                    categoryId: row.original.categoryId,
                  });
                }
              }
            "
          />
        </div>
      </template>

      <!-- Name cell -->
      <template #name-cell="{ row }">
        <div class="w-2">{{ row.original.name }}</div>
      </template>
    </UTable>
  </UCard>
</template>

<style></style>
