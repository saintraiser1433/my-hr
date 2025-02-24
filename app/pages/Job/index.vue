<script setup lang="ts">
definePageMeta({
  requiredRole: "admin",
});

useSeoMeta({
  title: "SUPERHURE Requirements Module",
  description: "CRUD for Requirements",
  ogTitle: "SUPERHURE Requirements Module",
  ogDescription: "CRUD for Requirements",
});

const { $api, $toast } = useNuxtApp();
const { handleApiError } = useErrorHandler();
const { openModal, updateModal, resetModal, isOpen, isUpdate, title } = useCustomModal();

const initialState = {
  id: undefined,
  title: undefined,
  description: undefined,
};
const requirementsForm = reactive<RequirementModel>({ ...initialState });
const requirementsData = ref<RequirementModel[]>([]);
const requirementsRepo = repository<RequirementModel>($api, "/requirements");

const { data, status, error } = await useAPI<RequirementModel[]>("/requirements");
if (data.value) {
  requirementsData.value = data.value;
}
if (error.value) {
  $toast.error(error.value.message || "Failed to fetch items");
}

const submit = async (response: RequirementModel) => {
  try {
    if (!isUpdate.value) {
      const res = await requirementsRepo.add(response); //error on this code
      requirementsData.value = [...requirementsData.value, res.data as RequirementModel];
      $toast.success(res.message);
    } else {
      const res = await requirementsRepo.update(response); //error on this code
      if (res.data) {
        const data = res.data as RequirementModel;
        requirementsData.value = requirementsData.value.map((item) =>
          item.id === data.id ? data : item
        );
      }

      $toast.success(res.message);
    }
    resetModal();
  } catch (error) {
    return handleApiError(error);
  }
};

const edit = (response: RequirementModel) => {
  requirementsForm.id = response.id;
  requirementsForm.description = response.description;
  requirementsForm.title = response.title;
  updateModal(`${response.title}`);
};

const remove = (id: number) => {
  setAlert("warning", "Are you sure you want to delete?", "", "Confirm delete").then(
    async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await requirementsRepo.delete(id);
          requirementsData.value = requirementsData.value.filter(
            (item) => item.id !== id
          );
          $toast.success(response.message);
        } catch (error) {
          return handleApiError(error);
        }
      }
    }
  );
};

const resetForm = () => {
  Object.assign(requirementsForm, initialState);
};
const toggleModal = () => {
  resetForm();
  openModal(`Create Job Offer`);
};

import type { FormSubmitEvent } from "@nuxt/ui";
const { $joi } = useNuxtApp();
const schema = $joi.object({
  email: $joi.string().required(),
  password: $joi.string().min(8).required(),
});

const state = reactive({
  email: undefined,
  password: undefined,
});

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<any>) {
  toast.add({
    title: "Success",
    description: "The form has been submitted.",
    color: "success",
  });
  console.log(event.data);
}
</script>

<template>
  <JobForm
    @data-requirements="submit"
    v-model:state="requirementsForm"
    :title="title"
    v-model:open="isOpen"
  />
  <div class="flex flex-col items-center lg:items-start mb-3">
    <h2 class="font-extrabold text-2xl">Job Offers Module</h2>
    <span class="text-sm">Here's a list of Job offers !</span>
  </div>
  <JobList :data="requirementsData" @update="edit" @delete="remove">
    <template #actions>
      <UButton icon="i-lucide-plus" size="sm" variant="solid" @click="toggleModal"
        >Add Job Offer</UButton
      >
    </template>
  </JobList>
</template>
