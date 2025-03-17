<template>
  <UCard :ui="{
    root: 'overflow-hidden ',
    body: 'p-3 sm:p-3',
  }">
    <div class="flex items-center gap-3">
      <div>
        <CircleProgressBar stroke-width="16" size="160" color-filled="#062d19" color-unfilled="#3c3c3c"
          animation-duration="1s" :value="25.8" :max="30" rounded>
          <span class="font-bold"> 30% </span>
        </CircleProgressBar>
      </div>
      <div>
        <h4 class="font-semibold">Category Name: <span class="font-normal">Performance Mode</span></h4>
        <h4 class="font-semibold">Total Score: <span class="font-normal">43</span></h4>
        <h4 class="font-semibold">Total Possible Score: <span class="font-normal">50</span></h4>
        <h4 class="font-semibold">Total Percentage: <span class="font-normal">30%</span></h4>
        <h4 class="font-semibold">Rating Percentage: <span class="font-normal">25.8%</span></h4>
        <h4 class="font-semibold">Average Rating: <span class="font-normal">4.3</span></h4>
      </div>
    </div>
  </UCard>
</template>

<script lang="ts" setup>

</script>

<style></style>