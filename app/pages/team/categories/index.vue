<script setup lang="ts">
definePageMeta({
  requiredRole: "TeamLead",
});

useSeoMeta({
  title: "SUPERHURE Teamlead Module",
  description: "CRUD for Teamlead",
  ogTitle: "SUPERHURE Teamlead Module",
  ogDescription: "CRUD for Teamlead",
});

const store = useAcademicYearStore();
const { $toast } = useNuxtApp();

const teamleadData = ref<TeamLeadModel[]>([]);
const { data, status, error } = await useAPI<TeamLeadModel[]>(
  `/teamlead/main/${store.acadId}`
);
if (data.value) {
  teamleadData.value = data.value;
}
if (error.value) {
  $toast.error(error.value.message || "Failed to fetch items");
}
</script>

<template>
  <div>
    <div class="flex flex-col items-center lg:items-start mb-3">
      <h2 class="font-extrabold text-2xl">Employee Performance Appraisal Module</h2>
      <span class="text-sm">Here's a list of employee performance appraisal module!</span>
    </div>
    <UCard
      :ui="{
        root: 'border-b-3 border-(--ui-primary) rounded-md',
      }"
    >
      <EvaluationTeamleadList :data="teamleadData"> </EvaluationTeamleadList>
    </UCard>
  </div>
</template>
