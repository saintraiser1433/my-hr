<script setup lang="ts">
definePageMeta({
  requiredRole: "Employee",
});

useSeoMeta({
  title: "SUPERHURE Employee Module",
  description: "CRUD for Employee",
  ogTitle: "SUPERHURE Employee Module",
  ogDescription: "CRUD for Employee",
});

const { $toast, $api } = useNuxtApp();
const { acadId } = useAcademicYearStore();
const { getId } = useAuthStore();
const { openModal, isOpen, title, description } = useCustomModal();
const peerEvaluationId = ref(0);
const employeeData = computed(() =>
  employee.value?.filter((item) => item.role !== "TeamLead")
);


const { data: employee, status: employeeStatus, error: employeeError } = await useAPI<
  EmployeesEvaluate[]
>(`/evaluation/peer/${getId}`);

const { data: peerResult, error:resultError } = await useAPI<EmployeeRating[]>(`/evaluation/peerResult`, {
  watch:[peerEvaluationId],
  params: {
    peerEvaluationId: peerEvaluationId,

  },
  immediate:false,
  server:false
});


if (employeeError.value) {
  $toast.error(employeeError.value.message || "Failed to fetch items");
}

if (resultError.value) {
  $toast.error(resultError.value.message || "Failed to fetch items");
}

const evaluate = async (peerId: number, employeeId: number) => {
  await navigateTo({
    name: "emp-evaluate-empId-peerEvalId",
    params: { empId: employeeId, peerEvalId: peerId },
  });
};

const viewRating = async (peerEvalId: number) => {
  openModal("View Ratings");
  peerEvaluationId.value = peerEvalId;

};
</script>

<template>
  <PerformanceViewRatings
    type="Peer"
    :acad-id="acadId ?? 0"
    v-model:open="isOpen"
    :peerData="peerResult"
    :title="title"
    :description="description"
  >
  </PerformanceViewRatings>
  <div class="flex flex-col items-center lg:items-start mb-3">
    <h2 class="font-extrabold text-2xl">Evaluate Colleagues</h2>
    <span class="text-sm">Here's a list evaluate colleagues!</span>
  </div>
  <EmployeeEvaluateList role="peer" :data="employeeData" @evaluate="evaluate" @view="viewRating" />
</template>
