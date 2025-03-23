<script setup lang="ts">
definePageMeta({
  requiredRole: "Admin",
});

useSeoMeta({
  title: "SUPERHURE Requirements Module",
  description: "CRUD for Requirements",
  ogTitle: "SUPERHURE Requirements Module",
  ogDescription: "CRUD for Requirements",
});

const { $api, $toast } = useNuxtApp();
const { handleApiError } = useErrorHandler();
const {
  openModal,
  description,
  updateModal,
  resetModal,
  isOpen,
  isUpdate,
  title,
} = useCustomModal();

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
  updateModal("Update Requirements");
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
  openModal("Create Requirements");
};
</script>

<template>
  <div v-if="status === 'pending'">Gwapo</div>
  <div v-else>
    <RequirementsForm
      @data-requirements="submit"
      v-model:state="requirementsForm"
      :title="title"
      v-model:open="isOpen"
      :description="description"
    />
    <div class="flex flex-col items-center lg:items-start mb-3">
      <h2 class="font-extrabold text-2xl">Requirements Module</h2>
      <span class="text-sm">Here's a list of requirements available!</span>
    </div>
    <UCard
      :ui="{
        root: 'border-b-3 border-(--ui-primary) rounded-md',
      }"
    >
      <RequirementsList :data="requirementsData" @update="edit" @delete="remove">
        <template #actions>
          <UButton icon="i-lucide-plus" size="sm" variant="solid" @click="toggleModal"
            >Add Requirements</UButton
          >
        </template>
      </RequirementsList>
    </UCard>
  </div>
</template>
