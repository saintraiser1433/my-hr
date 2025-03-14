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
const { handleApiError } = useErrorHandler();
const route = useRoute();
const employeeData = ref<EmployeesEvaluate[]>([]);

const { data: employee, status: employeeStatus, error: employeeError } = await useAPI<
  EmployeesEvaluate[]
>(`/employees/evaluate/2`);

if (employee.value) {
  employeeData.value = employee.value;
}

if (employeeError.value) {
  $toast.error(employeeError.value.message || "Failed to fetch items");
}


</script>

<template>
  <div class="flex flex-col items-center lg:items-start mb-3">
    <h2 class="font-extrabold text-2xl">Evaluate Colleagues</h2>
    <span class="text-sm">Here's a list evaluate colleagues!</span>
  </div>
  <EmployeeEvaluateList :data="employeeData">
  </EmployeeEvaluateList>
</template>
