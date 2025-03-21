<script setup lang="ts">
definePageMeta({
  requiredRole: "TeamLead",
});

useSeoMeta({
  title: "SUPERHURE Employee Module",
  description: "CRUD for Employee",
  ogTitle: "SUPERHURE Employee Module",
  ogDescription: "CRUD for Employee",
});

const { $toast, $api } = useNuxtApp();
const { acadId } = useAcademicYearStore();
const { departmentId } = useAuthStore();
const { openModal, isOpen, title, description } = useCustomModal();
const employeeIds = ref(0);
const employeeData = computed(() =>
  employee.value?.filter((item) => item.role !== "TeamLead")
);


const { data: employee, status: employeeStatus, error: employeeError } = await useAPI<
  EmployeeRatingStatus[]
>(`/evaluation/status`, {
  params: {
    deptId: departmentId,
    acadId: acadId,
  },
});

const { data: teamResult,error:resultError } = await useAPI<EmployeeRating[]>(`/evaluation/teamResult`, {
  watch:[employeeIds],
  params: {
    acadId: acadId,
    empId: employeeIds,
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

const evaluate = async (id: number) => {
  await navigateTo({
    name: "team-evaluate-empId-deptId",
    params: { empId: id, deptId: departmentId },
  });
};

const viewRating = async (employeeId: number) => {
  openModal("View Ratings");
  employeeIds.value = employeeId;

};
</script>

<template>
  <PerformanceViewRatings
    type="TeamLead"
    :acad-id="acadId ?? 0"
    v-model:open="isOpen"
    :data="teamResult ?? []"
    :title="title"
    :description="description"
  >
  </PerformanceViewRatings>
  <div class="flex flex-col items-center lg:items-start mb-3">
    <h2 class="font-extrabold text-2xl">Evaluate Colleagues</h2>
    <span class="text-sm">Here's a list evaluate colleagues!</span>
  </div>
  <EmployeeEvaluateList role="teamlead" :data="employeeData" @evaluate="evaluate" @view="viewRating" />
</template>
