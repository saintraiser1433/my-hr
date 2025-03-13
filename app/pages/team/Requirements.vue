<script setup lang="ts">
definePageMeta({
  requiredRole: "TeamLead",
});

useSeoMeta({
  title: "SUPERHURE Screening Type Module",
  description: "CRUD for Screening Type",
  ogTitle: "SUPERHURE Screening Type Module",
  ogDescription: "CRUD for Screening Type",
});
const store = useAuthStore();
const { $api, $toast } = useNuxtApp();
const { handleApiError } = useErrorHandler();
const { updateModal, resetModal, isOpen, title } = useCustomModal();
const route = useRoute();
const titleName = useState(
  "title",
  () => localStorage.getItem("title") || "Unknown module"
);

const requirementsData = ref<EmployeeRequirements[]>([]);
const listRequirements = ref<UnchosenRequirements[]>([]);

const initialState = {
  id: undefined,
  submittedAt: undefined,
  expiryDate: undefined,
  status: EmployeeRequirementStatus.PENDING,
};
const departmentForm = reactive<SubmittedRequirements>({ ...initialState });
//jobscreen list
const { data, status, error } = await useAPI<EmployeeWithRequirementModel>(
  `/employees/req/${store.getId}`
);
if (data.value) {
  requirementsData.value = data.value.employeeRequirements;
  listRequirements.value = data.value.unchosenRequirements;
}
if (error.value) {
  $toast.error(error.value.message || "Failed to fetch items");
}


</script>

<template>
  


  <div class="flex flex-col items-center lg:items-start mb-3">
    <h2 class="font-extrabold text-2xl capitalize">My Requirements</h2>
    <span class="text-sm"
      >Here's a list pending and submitted requirements ! </span
    >
  </div>
  <EmployeeRequireList
    :data="requirementsData"
    :items="listRequirements"
  >
  </EmployeeRequireList>
</template>
