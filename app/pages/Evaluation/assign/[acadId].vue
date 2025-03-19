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
const { openModal,description, isOpen, title } = useCustomModal();
const acadId = ref<number>(Number(route.params.acadId));
const departmentItems = computed(
  () =>
    departments.value?.map((item) => ({
      id: item.id,
      label: item.title,
    })) || []
);
const checkSelectedDepartment = computed(() => Object.keys(selectedDepartment.value).length === 0);

const { data: departments, status, error } = await useAPI<DepartmentModel[]>(
  "/department"
);
const selectedDepartment = ref<ListDepartment>({});

const deptId = computed(() => selectedDepartment.value.id || 0);



const { data: result, error:errorEvaluation  } = await useAPI<EvaluationResult[]>(
  `/evaluation/viewPeer`,{
    watch:[selectedDepartment],
    immediate:false,
    params:{
      acadId: acadId,
      deptId: deptId
    },
    server:false
  },
);



if (error.value) {
  $toast.error(error.value.message || "Failed to fetch items");
}
if (errorEvaluation.value) {
  $toast.error(errorEvaluation.value.message || "Failed to fetch items");
}

const groups = ref([
  {
    id: "Departments",
    label: "Departments",
    items: departmentItems,
  },
]);

const view = () => {
  openModal("Peers to evaluate");
}

const assignRepo = repository<AssignPeerEvaluations>($api,"/evaluation/assign")
const assign = async(data:AssignPeerEvaluations) => {
  try{
    const response = await assignRepo.add(data);
    $toast.success(response.message);
    isOpen.value = false;
    result.value = response.data as unknown as EvaluationResult[];
  }catch(err){
    handleApiError(err)
  }
}
</script>

<template>

  <EvaluationPeerAssigningForm :academic-year-id="acadId" :department-id="selectedDepartment.id" :description="description" :title="title" v-model:open="isOpen" @assign="assign"/>

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
    <div class="col-span-9">
      <UCard
        :ui="{
          root: 'overflow-hidden border-t-3 border-(--ui-primary) ',
          body: 'p-2 sm:p-2',
          footer: 'p-0 sm:px-0',
        }"
      >
        <EvaluationPeerAssigning :data="result" v-if="!checkSelectedDepartment &&  result" @view="view" />
        <div v-else class="flex justify-center flex-col items-center py-50">
          <h5 class="italic">Image Here</h5>
          <h2 class="font-semibold">Please select department to assign peers to evaluate</h2>
        </div>
      </UCard>
    </div>
  </div>
</template>
