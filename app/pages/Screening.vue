<script setup lang="ts">
definePageMeta({
  requiredRole: "admin",
});

useSeoMeta({
  title: "SUPERHURE Screening Type Module",
  description: "CRUD for Screening Type",
  ogTitle: "SUPERHURE Screening Type Module",
  ogDescription: "CRUD for Screening Type",
});

const { $api, $toast } = useNuxtApp();
const { handleApiError } = useErrorHandler();
const { openModal, updateModal, resetModal, isOpen, isUpdate, title } = useCustomModal();

const initialState = {
  id: 0,
  title: "",
  description: "",
  status: false,
};
const screeningTypeForm = reactive<ScreeningModel>({ ...initialState });
const screeningTypeData = ref<ScreeningModel[]>([]);
const screeningTypeRepo = repository<ScreeningModel>($api, "/screening");

const { data, status, error } = await useAPI<ScreeningModel[]>("/screening");
if (data.value) {
  screeningTypeData.value = data.value;
}
if (error.value) {
  $toast.error(error.value.message || "Failed to fetch items");
}

const submit = async (response: ScreeningModel) => {
  try {
    if (!isUpdate.value) {
      const res = await screeningTypeRepo.add(response); //error on this code
      screeningTypeData.value = [...screeningTypeData.value, res.data as ScreeningModel];
      $toast.success(res.message);
    } else {
      const res = await screeningTypeRepo.update(response); //error on this code
      if (res.data) {
        const data = res.data as ScreeningModel;
        screeningTypeData.value = screeningTypeData.value.map((item) =>
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

const edit = (response: ScreeningModel) => {
  screeningTypeForm.id = response.id;
  screeningTypeForm.description = response.description;
  screeningTypeForm.title = response.title;
  screeningTypeForm.status = response.status;
  updateModal(`${response.title}`);
};

const remove = (id: number) => {
  setAlert("warning", "Are you sure you want to delete?", "", "Confirm delete").then(
    async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await screeningTypeRepo.delete(id);
          screeningTypeData.value = screeningTypeData.value.filter(
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
  Object.assign(screeningTypeForm, initialState);
};

const toggleModal = () => {
  resetForm();
  openModal(`Create Screening Type`);
};
</script>

<template>
  <ScreeningForm
    :isUpdate="isUpdate"
    @data-screeningType="submit"
    v-model:state="screeningTypeForm"
    :title="title"
    v-model:open="isOpen"
  />
  <div class="flex flex-col items-center lg:items-start mb-3">
    <h2 class="font-extrabold text-2xl">Screening Types Module</h2>
    <span class="text-sm">Here's a list of screening types available!</span>
  </div>

  <ScreeningList :data="screeningTypeData" @update="edit" @delete="remove">
    <template #actions>
      <UButton icon="i-lucide-plus" size="sm" variant="solid" @click="toggleModal"
        >Add Screening Type</UButton
      >
    </template>
  </ScreeningList>
</template>
