<script lang="ts" setup>
import type { ECBasicOption } from "echarts/types/dist/shared";

defineProps({
  employeeId: {
    type: Number,
    required: true,
    default: 0,
  },
  acadId: {
    type: Number,
    required: true,
  },
  evaluatedBy: {
    type: String,
    required: true,
    default: "",
  },
  option: {
    type: Object as PropType<ECBasicOption>,
  },
  rating: {
    type: Array as PropType<RatingModel[]>,
    default: () => [],
  },
  comment: {
    type: String,
    default: "",
  },
  averageRating: {
    type: Number,
    default: 0,
  },
  adjectiveRating: {
    type: String,
    default: "",
  },
  title: String,
  subtitle: String,
});
</script>

<template>
  <UCard
    :ui="{
      root: 'overflow-hidden border-t-3 border-(--ui-primary) ',
    }"
  >
    <template #header>
      <div class="flex flex-col justify-center">
        <h3 class="font-semibold">{{ title }}</h3>
        <h5>{{ subtitle }}</h5>
      </div>
    </template>
    <slot></slot>
    <div class="mb-5">
      <h3 class="font-semibold">
        Evaluated by:
        <span class="font-normal">{{ evaluatedBy }}</span>
      </h3>
    </div>
    <div class="grid grid-cols-12 gap-5">
      <div v-for="(data, index) in rating" :key="index" class="col-span-6">
        <PerformanceCategorizeCard :data="data" />
      </div>
    </div>
    <PerformanceCategoryAnalytics
      :option="option"
      title="Category Scores"
    ></PerformanceCategoryAnalytics>

    <PerformanceActions
      :acad-id="acadId"
      :employee-id="employeeId"
      :averageRating="averageRating"
      :remarks="adjectiveRating"
    >
    </PerformanceActions>
  </UCard>
</template>
