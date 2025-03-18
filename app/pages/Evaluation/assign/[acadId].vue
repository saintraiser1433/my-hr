<script setup lang="ts">
definePageMeta({
  requiredRole: "Admin",
});

useSeoMeta({
  title: "SUPERHURE Departments Module",
  description: "CRUD for Departments",
  ogTitle: "SUPERHURE Departments Module",
  ogDescription: "CRUD for Departments",
});

const { $api, $toast } = useNuxtApp();
const { handleApiError } = useErrorHandler();
const route = useRoute();
const employeeData = ref<EmployeesEvaluate[]>([]);
const departmentItems = computed(
  () =>
    departments.value?.map((item) => ({
      id: item.id,
      label: item.title,
    })) || []
);

const { data: departments, status, error } = await useAPI<DepartmentModel[]>(
  "/department"
);

if (error.value) {
  $toast.error(error.value.message || "Failed to fetch items");
}

const selectedDepartment = ref<ListDepartment>({});
const groups = ref([
  {
    id: "Departments",
    label: "Departments",
    items: departmentItems,
  },
]);
</script>

<template>
  <div class="flex flex-col items-center lg:items-start mb-3">
    <h2 class="font-extrabold text-2xl">
      Assign evaluation peer performance departments
    </h2>
    <span class="text-sm">Here's a list of assign evaluation peer!</span>
  </div>
  <div class="grid grid-cols-12 gap-2">
    <div class="col-span-4">
      <UCard
        :ui="{
          root: 'overflow-hidden border-t-3 border-(--ui-primary) ',
          body: 'p-0 sm:p-0',
          footer: 'p-0 sm:px-0',
        }"
      >
        <UCommandPalette
          v-model="selectedDepartment"
          :groups="groups"
          class="flex-1"
          :ui="{ item: 'capitalize' }"
        />
      </UCard>
    </div>
    <div class="col-span-8">
      <UCard
        :ui="{
          root: 'overflow-hidden border-t-3 border-(--ui-primary) ',
          body: 'p-2 sm:p-2',
          footer: 'p-0 sm:px-0',
        }"
      >
        <EvaluationPeerAssigning />
        <!-- <EmployeeEvaluateList type="custom" :data="employeeData" @view="viewRating" /> -->
      </UCard>
    </div>
  </div>
</template>
