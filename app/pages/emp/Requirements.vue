<script setup lang="ts">
definePageMeta({
  requiredRole: "Employee",
});

useSeoMeta({
  title: "SUPERHURE Screening Type Module",
  description: "CRUD for Screening Type",
  ogTitle: "SUPERHURE Screening Type Module",
  ogDescription: "CRUD for Screening Type",
});
const store = useAuthStore();
const { $toast, $api } = useNuxtApp();
const { handleApiError } = useErrorHandler();
const { description, updateModal, isOpen, title, resetModal } = useCustomModal();
const requirementsData = ref<EmployeeRequirements[]>([]);
const id = ref<number | undefined>(0);
const statuses = ref("PENDING");
//jobscreen list
const { data, status, error } = await useAPI<EmployeeWithRequirementModel>(
  `/employees/req/${store.getId}`
);
if (data.value) {
  requirementsData.value = data.value.employeeRequirements;
}
if (error.value) {
  $toast.error(error.value.message || "Failed to fetch items");
}

const openUploadFile = (data: EmployeeRequirements) => {
  updateModal("Upload File");
  id.value = data.id;
};

const requirementRepo = repository<UploadRequirements>($api, "/requirements/submit");
const submitRequirements = async (file: File) => {
  try {
    const res = await requirementRepo.updateFileCustom(
      { id: id.value, status: statuses.value },
      file,
      "requirements"
    );
    const data = res.data as EmployeeRequirements;
    requirementsData.value = requirementsData.value.map((item) =>
      item.id === data.id ? { ...item, ...data } : item
    );
    resetModal();
    $toast.success(res.message);
  } catch (err) {
    handleApiError(err);
  }
};
</script>

<template>
  <RequirementsUpload
    v-model:open="isOpen"
    @submit="submitRequirements"
    :title="title"
    :description="description"
  ></RequirementsUpload>
  <div class="flex flex-col items-center lg:items-start mb-3">
    <h2 class="font-extrabold text-2xl capitalize">My Requirements</h2>
    <span class="text-sm">Here's a list pending and submitted requirements ! </span>
  </div>
  <UCard
    :ui="{
      root: 'border-b-3 border-(--ui-primary) rounded-md',
    }"
  >
    <EmployeeRequireList @submit="openUploadFile" :data="requirementsData">
    </EmployeeRequireList>
  </UCard>
</template>
