<script setup lang="ts">
definePageMeta({
  requiredRole: "Admin",
});

useSeoMeta({
  title: "SUPERHURE Performance Module",
  description: "CRUD for Performance",
  ogTitle: "SUPERHURE Performance Module",
  ogDescription: "CRUD for Performance",
});

const { $toast } = useNuxtApp();

const evaluationData = ref<EvaluationModel[]>([]);
const { data, status, error } = await useAPI<EvaluationModel[]>("/evaluation");
if (data.value) {
  evaluationData.value = data.value;
}
if (error.value) {
  $toast.error(error.value.message || "Failed to fetch items");
}
</script>

<template>
  <div>
    <div class="flex flex-col items-center lg:items-start mb-3">
      <h2 class="font-extrabold text-2xl">Team Lead to Peer Module</h2>
      <span class="text-sm">Please select academic year for your choice</span>
    </div>
    <UCard
      :ui="{
        root: 'border-b-3 border-(--ui-primary) rounded-md',
      }"
    >
      <PerformanceAcadList :data="evaluationData"> </PerformanceAcadList>
    </UCard>
  </div>
</template>
