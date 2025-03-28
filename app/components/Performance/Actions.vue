<script lang="ts" setup>
const props = defineProps({
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
  peerEvaluationId: {
    type: Number,
    default: 0,
  },
  role: {
    type: String,
  },
  hidePrint: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="flex gap-2 justify-between items-center">
    <div class="flex gap-2">
      <UButton v-if="!hidePrint" icon="i-lucide-printer" size="lg" @click="usePrintTeamResult">Print Result</UButton>
      <UButton
        icon="i-lucide-view"
        size="lg"
        variant="subtle"
        :to="
          props.role === 'teamlead'
            ? `performance/view-team/${acadId}/${employeeId}`
            : `performance/view-peer/${acadId}/${peerEvaluationId}`
        "
        target="_blank"
        >Show Evaluation Sheet</UButton
      >
    </div>

    <div class="flex gap-3 items-center">
      <h3 class="font-bold">
        Total Ratings: <span class="font-normal underline">{{ averageRating }}</span>
      </h3>
      <h3 class="font-bold">
        Remarks: <span class="font-normal capitalize underline">{{ remarks }}</span>
      </h3>
    </div>
  </div>
</template>
