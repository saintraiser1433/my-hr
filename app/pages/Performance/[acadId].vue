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

const { $toast } = useNuxtApp();
const route = useRoute();
const { openModal, isOpen, title, description } = useCustomModal();
const employeeIds = ref(0);
const selectedDepartment = ref<ListDepartment | undefined>({});
const deptId = computed(() => selectedDepartment.value?.id || 0);
const selectedEmployee = ref<EmployeeRatingStatus>();

const departmentItems = computed(
  () =>
    departments.value?.map((item) => ({
      id: item.id,
      label: item.title,
    })) || []
);
const groups = ref([
  {
    id: "Departments",
    label: "Departments",
    items: departmentItems,
  },
]);

const { data: departments, status, error } = await useAPI<DepartmentModel[]>(
  "/department"
);

if (error.value) {
  $toast.error(error.value.message || "Failed to fetch items");
}

const { data: result, error: errorEvaluation } = await useAPI<EmployeeRatingStatus[]>(
  `/evaluation/status`,
  {
    watch: [selectedDepartment],
    immediate: false,
    params: {
      acadId: route.params.acadId,
      deptId: deptId,
    },
    server: false,
  }
);
if (errorEvaluation.value) {
  $toast.error(errorEvaluation.value.message || "Failed to fetch items");
}

const { data: teamResult, error: resultError } = await useAPI<EmployeeRating[]>(
  `/evaluation/teamResult`,
  {
    watch: [employeeIds],
    params: {
      acadId: route.params.acadId,
      empId: employeeIds,
    },
    immediate: false,
  }
);
if (resultError.value) {
  $toast.error(resultError.value.message || "Failed to fetch items");
}

const { data: peerResult, error: peerResultError } = await useAPI<EmployeeRating[]>(
  `/evaluation/peerResult`,
  {
    watch: [employeeIds],
    params: {
      acadId: route.params.acadId,
      empId: employeeIds,
    },
    immediate: false,
  }
);
if (peerResultError.value) {
  $toast.error(peerResultError.value.message || "Failed to fetch items");
}

const viewRating = async (data: EmployeeRatingStatus) => {
  openModal("View Ratings","View rating of employee");
  employeeIds.value = data.employeeId;
  selectedEmployee.value = data;
};

watch(
  departmentItems,
  (newItems) => {
    if (newItems.length > 0) {
      selectedDepartment.value = newItems[0];
    }
  },
  { immediate: true } 
);


provide("peer", peerResult);
provide("team", teamResult);
</script>

<template>

  <PerformanceViewRatings
    v-model:open="isOpen"
    :information-data="selectedEmployee"
    :acad-id="Number(route.params.acadId)"
    :peer-data="peerResult"
    :data="teamResult"
    :title="title"
    :description="description"
  />

  <div class="flex flex-col items-center lg:items-start mb-3">
    <h2 class="font-extrabold text-2xl">Performance Results</h2>
    <span class="text-sm">Here's a list of team leader per departments!</span>
  </div>
  <div class="grid grid-cols-12 gap-2">
    <div class="col-span-4">
      <UCard
        :ui="{
          root: 'border-t-3 border-(--ui-primary) rounded-md',
        }"
      >
        <UCommandPalette
          v-model="selectedDepartment"
          :groups="groups"
          placeholder="Please select department or search department"
          class="flex-1"
          :ui="{ item: 'capitalize' }"
        />
      </UCard>
    </div>
    <div class="col-span-8">
      <UCard
        :ui="{
          root: 'border-t-3 border-(--ui-primary) rounded-md',
        }"
      >
        <EmployeeEvaluateList role="admin" :data="result" @view="viewRating" />
      </UCard>
    </div>
  </div>
</template>
