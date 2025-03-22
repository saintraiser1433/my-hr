<script lang="ts" setup>
definePageMeta({
  requiredRole: "Employee",
});

useSeoMeta({
  title: "SUPERHURE My Result Module",
  description: "CRUD for My Result",
  ogTitle: "SUPERHURE My Result Module",
  ogDescription: "CRUD for My Result",
});

const { $toast } = useNuxtApp();
const { getId } = useAuthStore();
const { acadId } = useAcademicYearStore();
const teamData = computed(() => teamResult.value ?? []);
const peerData = computed(() => peerResult.value ?? []);
const { data: teamResult, error: resultError } = await useAPI<EmployeeRating[]>(
  `/evaluation/teamResult`,
  {
    params: {
      acadId: acadId,
      empId: getId,
    },
  }
);
if (resultError.value) {
  $toast.error(resultError.value.message || "Failed to fetch items");
}

const { data: peerResult, error: peerResultError } = await useAPI<EmployeeRating[]>(
  `/evaluation/peerResult`,
  {
    params: {
      acadId: acadId,
      empId: getId,
    },
  }
);
if (peerResultError.value) {
  $toast.error(peerResultError.value.message || "Failed to fetch items");
}
</script>
<template>
  <div class="flex flex-col items-center lg:items-start mb-3">
    <h2 class="font-extrabold text-2xl">My Received Result</h2>
    <span class="text-sm">Here's your received result for peers and teamlead</span>
  </div>
  <div class="flex flex-col gap-5">
    <UCard
      v-if="peerData.length > 0"
      :ui="{
        root: 'overflow-hidden border-t-3 border-(--ui-primary) ',
      }"
    >
      <template #header>
        <div class="flex items-center justify-between gap-2">
          <div class="flex flex-col justify-center">
            <h3 class="font-semibold">Peer Ratings</h3>
            <h5>Module rating for Peer</h5>
          </div>
          <div>
            <h3><span class="font-bold">1</span>/3 Evaluated</h3>
          </div>
        </div>
      </template>
      <PerformanceSummaryRatings
        :hide-identity="true"
        :hide-print="true"
        v-for="(pdata, index) in peerData"
        :key="index"
        :employee-id="pdata?.employeeId"
        :acad-id="acadId ?? 0"
        :peer-evaluation-id="pdata.peerEvalId"
        :category-data="pdata.categoryCounts"
        :evaluated-by="pdata?.evaluatedBy"
        :rating="pdata?.rating"
        :comment="pdata?.comment"
        :average-rating="pdata?.summaryRating?.rating"
        :adjective-rating="pdata?.summaryRating?.adjectiveRating"
      />
    </UCard>
    <div class="flex flex-col justify-center items-center" v-else>
      <svg-icon
        name="vector/empty"
        title="Empty Evaluation"
        width="350px"
        height="350px"
      />
      <h2 class="italic">No peer has evaluated you yet.</h2>
      <USeparator class="py-5"></USeparator>
    </div>

    <UCard
      v-if="teamData.length > 0"
      :ui="{
        root: 'overflow-hidden border-t-3 border-(--ui-primary) ',
      }"
    >
      <template #header>
        <div class="flex flex-col justify-center">
          <h3 class="font-semibold">Team Lead Ratings</h3>
          <h5>Module rating for Team Lead</h5>
        </div>
      </template>
      <PerformanceSummaryRatings
        v-if="teamData.length > 0"
        v-for="(data, index) in teamData"
        role="teamlead"
        :key="index"
        :hide-print="true"
        :employee-id="data.employeeId"
        :acad-id="acadId ?? 0"
        :category-data="data.categoryCounts"
        :evaluated-by="data.evaluatedBy"
        :rating="data.rating"
        :comment="data.comment"
        :average-rating="data.summaryRating?.rating"
        :adjective-rating="data.summaryRating?.adjectiveRating"
      />
    </UCard>

    <div class="flex flex-col justify-center items-center" v-else>
      <svg-icon
        name="vector/empty"
        title="Empty Evaluation"
        width="350px"
        height="350px"
      />
      <h2 class="italic">Your Team Lead hasn't evaluated you yet.</h2>
      <USeparator class="py-5"></USeparator>
    </div>
  </div>
</template>
