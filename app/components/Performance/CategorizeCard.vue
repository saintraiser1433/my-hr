<script lang="ts" setup>
const props = defineProps({
  data: {
    type: Object as PropType<RatingModel>,
    // required: true,
    default: () => [],
  },
});

const { data } = toRefs(props);
const percentage = computed(
  () => parseInt((Number(data.value.percentage) * 100).toFixed(0)) || undefined
);
</script>

<template>
  <UCard
    :ui="{
      root: 'overflow-hidden ',
      body: 'p-3 sm:p-3',
    }"
  >
    <div class="flex items-center gap-3">
      <div>
        <CircleProgressBar
          stroke-width="16"
          size="160"
          color-filled="#062d19"
          color-unfilled="#3c3c3c"
          animation-duration="1s"
          :value="25.8"
          :max="30"
          rounded
        >
          <span class="font-bold"> 30% </span>
        </CircleProgressBar>
      </div>
      <div>
        <h4 class="font-semibold">
          Category Name: <span class="font-normal">{{ data.categoryName }}</span>
        </h4>
        <h4 class="font-semibold">
          Total Score: <span class="font-normal">{{ data.totalScore }}</span>
        </h4>
        <h4 class="font-semibold">
          Total Possible Score:
          <span class="font-normal">{{ data.totalPossibleScore }}</span>
        </h4>
        <h4 class="font-semibold">
          Total Percentage: <span class="font-normal">{{ percentage }} %</span>
        </h4>
        <h4 class="font-semibold">
          Rating Percentage:
          <span class="font-normal">{{ data.ratingPercentage }} %</span>
        </h4>
        <h4 class="font-semibold">
          Average Rating: <span class="font-normal">{{ data.averageRating }}</span>
        </h4>
      </div>
    </div>
  </UCard>
</template>
