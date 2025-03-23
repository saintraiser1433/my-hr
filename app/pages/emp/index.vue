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
const selectedEmployees = ref<EmployeeRatingStatus>();
const evaluateeInfo = useLocalStorage<EmployeeRatingStatus | null>(
  "evaluateeInfo",
  null,
  {
    serializer: {
      read: (v) => (v ? JSON.parse(v) : null), // Parse when reading
      write: (v) => JSON.stringify(v), // Stringify when writing
    },
  }
);
const employeeData = computed(() =>
  employee.value?.filter((item) => item.role !== "TeamLead")
);

const { data: employee, status: employeeStatus, error: employeeError } = await useAPI<
  EmployeeRatingStatus[]
>(`/evaluation/peer/${getId}`);

const { data: peerResult, error: resultError } = await useAPI<EmployeeRating[]>(
  `/evaluation/peerResult`,
  {
    watch: [peerEvaluationId],
    params: {
      peerEvaluationId: peerEvaluationId,
    },
    immediate: false,
    server: false,
  }
);

if (employeeError.value) {
  $toast.error(employeeError.value.message || "Failed to fetch items");
}

if (resultError.value) {
  $toast.error(resultError.value.message || "Failed to fetch items");
}

const evaluate = async (data: EmployeeRatingStatus) => {
  evaluateeInfo.value = data;
  await navigateTo({
    name: "emp-evaluate-empId-peerEvalId",
    params: { empId: data.employeeId, peerEvalId: data.id },
  });
};

const viewRating = async (data: EmployeeRatingStatus) => {
  openModal("View Ratings");
  peerEvaluationId.value = data.id;
  selectedEmployees.value = data;
};
</script>

<template>
  <PerformanceViewRatings
    type="Peer"
    v-model:open="isOpen"
    :information-data="selectedEmployees"
    :acad-id="acadId ?? 0"
    :peerData="peerResult"
    :title="title"
    :description="description"
  >
  </PerformanceViewRatings>
  <div class="flex flex-col items-center lg:items-start mb-3">
    <h2 class="font-extrabold text-2xl">Evaluate Colleagues</h2>
    <span class="text-sm">Here's a list evaluate colleagues!</span>
  </div>
  <UCard
    :ui="{
      root: 'border-b-3 border-(--ui-primary) rounded-md',
    }"
  >
    <EmployeeEvaluateList
      role="peer"
      :data="employeeData"
      @evaluate="evaluate"
      @view="viewRating"
    />
  </UCard>
</template>
