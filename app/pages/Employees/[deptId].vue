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

const { $toast, $api } = useNuxtApp();
const { handleApiError } = useErrorHandler();
const route = useRoute();
const employeeData = ref<EmployeeModel[]>([]);

const { data: employee, status: employeeStatus, error: employeeError } = await useAPI<
  EmployeeModel[]
>(`/employees/${route.params.deptId}`);

if (employee.value) {
  employeeData.value = employee.value;
}

if (employeeError.value) {
  $toast.error(employeeError.value.message || "Failed to fetch items");
}

const assignTeamleadRepo = repository<EmployeeModel>($api, "/employees/assign");
const assign = (data: EmployeeModel) => {
  setAlert(
    "warning",
    "Are you sure you want to set this user as Team Lead?",
    "",
    "Confirm update"
  ).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await assignTeamleadRepo.update(data);
        employeeData.value = employeeData.value.map((emp) =>
          emp.id === data.id
            ? { ...emp, role: response.data?.role as EmployeeModel["role"] }
            : emp
        );
        $toast.success(response.message);
      } catch (error) {
        return handleApiError(error);
      }
    }
  });
};

const unassignTeamleadRepo = repository<EmployeeModel>($api, "/employees/unassign");
const unAssign = (data: EmployeeModel) => {
  setAlert(
    "warning",
    "Are you sure you want to set this user as Team Lead?",
    "",
    "Confirm update"
  ).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await unassignTeamleadRepo.update(data);
        employeeData.value = employeeData.value.map((emp) =>
          emp.id === data.id
            ? { ...emp, role: response.data?.role as EmployeeModel["role"] }
            : emp
        );
        $toast.success(response.message);
      } catch (error) {
        return handleApiError(error);
      }
    }
  });
};
</script>

<template>
  <div class="flex flex-col items-center lg:items-start mb-3">
    <h2 class="font-extrabold text-2xl">Employee Module</h2>
    <span class="text-sm">Here's a list of employees!</span>
  </div>
  <EmployeeList @assign="assign" @unassign="unAssign" :data="employeeData">
  </EmployeeList>
</template>
