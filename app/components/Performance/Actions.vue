<script lang="ts" setup>
defineProps({
  averageRating: {
    type: Number,
    required: true,
    default: 0,
  },
  remarks: {
    type: String,
    required: true,
    default: "",
  },
  employeeId: {
    type: Number,
    required: true,
  },
  acadId: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <div class="flex gap-2 justify-between items-center">
    <div class="flex gap-2">
      <UButton icon="i-lucide-printer" size="lg">Print Result</UButton>
      <UButton
        icon="i-lucide-view"
        size="lg"
        variant="subtle"
        :to="`performance/view-record/${acadId}/${employeeId}`"
        target="_blank"
        >Show Evaluation Sheet</UButton
      >
    </div>

    <div class="flex gap-3 items-center">
      <h3 class="font-bold">
        Total Ratings: <span class="font-normal">{{ averageRating }}</span>
      </h3>
      <h3 class="font-bold">
        Remarks: <span class="font-normal capitalize">{{ remarks }}</span>
      </h3>
    </div>
  </div>
</template>
