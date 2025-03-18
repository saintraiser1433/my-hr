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
const { openModal, isOpen, title, description } = useCustomModal();
const employeeData = ref<EmployeesEvaluate[]>([]);
const employeeRatingData = ref<EmployeeRating[]>();
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

const viewRating = async (employeeId: number) => {
  openModal("View Ratings");
  try {
    const response = await $api<EmployeeRating[]>(
      `/evaluation/result/${route.params.acadId}/${employeeId}`
    );
    employeeRatingData.value = response || [];
  } catch (err) {
    handleApiError(err);
  }
};

watch(
  () => selectedDepartment.value?.id ?? null,
  async (newId) => {
    if (!newId) {
      employeeData.value = [];
      return;
    }
    try {
      const response = await $api<EmployeesEvaluate[]>(
        `/employees/evaluate/${newId}/${route.params.acadId}`
      );
      employeeData.value = response || [];
    } catch (err) {
      handleApiError(err);
    }
  },
  { flush: "post" }
);
</script>

<template>
  <PerformanceViewRatings
    :acad-id="Number(route.params.acadId)"
    v-model:open="isOpen"
    :data="employeeRatingData"
    :title="title"
    :description="description"
  >
  </PerformanceViewRatings>
  <div class="flex flex-col items-center lg:items-start mb-3">
    <h2 class="font-extrabold text-2xl">Superior to peer performance departments</h2>
    <span class="text-sm">Here's a list of team leader per departments!</span>
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
        <EmployeeEvaluateList type="custom" :data="employeeData" @view="viewRating" />
      </UCard>
    </div>
  </div>
</template>
