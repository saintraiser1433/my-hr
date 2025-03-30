<script lang="ts" setup>
const props = defineProps({
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
  role: {
    type: String,
  },
  peerEvaluationId: {
    type: Number,
    default: 0,
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
  categoryData: {
    type: Array as PropType<CategoryCountModel[]>,
    default: () => [],
  },
  hideIdentity: {
    type: Boolean,
    default: false,
  },
  hidePrint: {
    type: Boolean,
    default: false,
  },
});

const { categoryData } = toRefs(props);
const { optionCategory } = useStackedBar(categoryData);
</script>

<template>
  <div class="mb-1">
    <h3 class="font-semibold">
      Evaluated by:
      <span class="font-normal">{{ hideIdentity ? "#######" : evaluatedBy }}</span>
    </h3>
  </div>
  <div class="grid grid-cols-12 gap-2 py-2">
    <div class="col-span-4">
      <div v-for="(data, index) in rating" :key="index" class="py-2">
        <PerformanceCategorizeCard :data="data" />
      </div>
    </div>
    <div class="col-span-8">
      <DashboardBarChart
        :option="optionCategory"
        title="Category Scores"
      ></DashboardBarChart>
    </div>
  </div>

  <PerformanceActions
    :role="role"
    :peer-evaluation-id="peerEvaluationId"
    :acad-id="acadId"
    :employee-id="employeeId"
    :averageRating="averageRating"
    :remarks="adjectiveRating"
  >
  </PerformanceActions>

  <USeparator class="py-5"></USeparator>
</template>
