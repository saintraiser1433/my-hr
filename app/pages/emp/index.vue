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
const { handleApiError } = useErrorHandler();
const { openModal, isOpen, title, description } = useCustomModal();

const employeeData = computed(() =>
  employee.value?.filter((item) => item.role !== "TeamLead")
);

const employeeRatingData = ref<EmployeeRating[]>([]);
const { data: employee, status: employeeStatus, error: employeeError } = await useAPI<
  EmployeesEvaluate[]
>(`/evaluation/peer/${getId}`);

if (employeeError.value) {
  $toast.error(employeeError.value.message || "Failed to fetch items");
}

const evaluate = async (peerId: number, employeeId: number) => {
  await navigateTo({
    name: "emp-evaluate-empId-peerEvalId",
    params: { empId: employeeId, peerEvalId: peerId },
  });
};

const viewRating = async (employeeId: number) => {
  openModal("View Ratings");
  try {
    const response = await $api<EmployeeRating[]>(
      `/evaluation/result/${acadId}/${employeeId}`
    );
    employeeRatingData.value = response || [];
  } catch (err) {
    handleApiError(err);
  }
};
</script>

<template>
  <PerformanceViewRatings
    :acad-id="acadId ?? 0"
    v-model:open="isOpen"
    :data="employeeRatingData"
    :title="title"
    :description="description"
  >
  </PerformanceViewRatings>
  <div class="flex flex-col items-center lg:items-start mb-3">
    <h2 class="font-extrabold text-2xl">Evaluate Colleagues</h2>
    <span class="text-sm">Here's a list evaluate colleagues!</span>
  </div>
  <EmployeeEvaluateList :data="employeeData" @evaluate="evaluate" @view="viewRating" />
</template>
