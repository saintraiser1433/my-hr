<script setup lang="ts">

definePageMeta({
  requiredRole: "admin",
});

useSeoMeta({
  title: "SUPERHURE Employee Module",
  description: "CRUD for Employee",
  ogTitle: "SUPERHURE Employee Module",
  ogDescription: "CRUD for Employee",
});

const {$toast } = useNuxtApp();
const route = useRoute();
const employeeData = ref<EmployeeModel[]>([]);




const { data: employee, status: employeeStatus, error: employeeError } = await useAPI<EmployeeModel[]>(`/employees/${route.params.deptId}`);

if (employee.value) {
  employeeData.value = employee.value;
}


if (employeeError.value) {
  $toast.error(employeeError.value.message || "Failed to fetch items");
}






</script>

<template>


  <div class="flex flex-col items-center lg:items-start mb-3">
    <h2 class="font-extrabold text-2xl">Employee Module</h2>
    <span class="text-sm">Here's a list of employees!</span>
  </div>
  <EmployeeList :data="employeeData">
  </EmployeeList>




</template>