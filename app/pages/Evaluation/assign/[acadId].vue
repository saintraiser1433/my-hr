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
const { openModal, description, isOpen, title } = useCustomModal();
const acadId = ref<number>(Number(route.params.acadId));


const { data: departments, status, error } = await useAPI<DepartmentModel[]>(
  "/department"
);
const selectedDepartment = ref<ListDepartment | undefined>({});
const deptId = computed(() => selectedDepartment.value?.id || 0);


const { data: result, error: errorEvaluation } = await useAPI<EvaluationResult[]>(
  `/evaluation/viewPeer`,
  {
    watch: [selectedDepartment],
    immediate: false,
    params: {
      acadId: acadId,
      deptId: deptId,
    },
    server: false,
  }
);
const { data: countEmployee, error: errorEmployee } = await useAPI<number>(
  `/employees/deptCount`,
  {
    watch: [selectedDepartment],
    immediate: false,
    params: {
      deptId: deptId,
    },
    server: false,
  }
);

if (error.value) {
  $toast.error(error.value.message || "Failed to fetch items");
}
if (errorEvaluation.value) {
  $toast.error(errorEvaluation.value.message || "Failed to fetch items");
}
if (errorEmployee.value) {
  $toast.error(errorEmployee.value.message || "Failed to fetch items");
}

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

const view = () => {
  if(countEmployee.value === 0){
    return $toast.error('Cant do random shuffling. Reason: No employee attached in that department')
  }
  openModal("Peers to evaluate");
};

const assignRepo = repository<AssignPeerEvaluations>($api, "/evaluation/assign");
const assign = async (data: AssignPeerEvaluations) => {
  try {
    const response = await assignRepo.add(data);
    $toast.success(response.message);
    isOpen.value = false;
    result.value = (response.data as unknown) as EvaluationResult[];
  } catch (err) {
    handleApiError(err);
  }
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
</script>

<template>

  <EvaluationPeerAssigningForm
    :academic-year-id="acadId"
    :employee-count="countEmployee"
    :department-id="selectedDepartment?.id"
    :description="description"
    :title="title"
    v-model:open="isOpen"
    @assign="assign"
  />

  <div class="flex flex-col items-center lg:items-start mb-3">
    <h2 class="font-extrabold text-2xl">
      Assign evaluation peer performance departments
    </h2>
    <span class="text-sm">Here's a list of assign evaluation peer!</span>
  </div>
  <div class="grid grid-cols-12 gap-2">
    <div class="col-span-3">
      <UCard
        :ui="{
          root: 'overflow-hidden border-t-3 border-(--ui-primary) rounded-md ',
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
    <div class="col-span-9">
      <UCard
        :ui="{
          root: 'overflow-hidden border-t-3 border-(--ui-primary) rounded-md',
        }"
      >
        <EvaluationPeerAssigning
          :data="result ?? []"
          @view="view"
        />
       
      </UCard>
    </div>
  </div>
</template>
