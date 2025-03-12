<script setup lang="ts">
definePageMeta({
    requiredRole: "Admin",
});

useSeoMeta({
  title: "SUPERHURE Template Module",
  description: "CRUD for Template",
  ogTitle: "SUPERHURE Template Module",
  ogDescription: "CRUD for Template",
});

const { $api, $toast } = useNuxtApp();
const { handleApiError } = useErrorHandler();
const { openModal, updateModal, resetModal, isOpen, isUpdate, title } = useCustomModal();

const initialState = {
  id: undefined,
  template_name: "",
  description: "",
};
const templateForm = reactive<TemplateModel>({ ...initialState });
const templateData = ref<TemplateModel[]>([]);
const templateRepo = repository<TemplateModel>($api, "/template");

const { data, status, error } = await useAPI<TemplateModel[]>("/template");
if (data.value) {
  templateData.value = data.value;
}
if (error.value) {
  $toast.error(error.value.message || "Failed to fetch items");
}

const submit = async (response: TemplateModel) => {
  try {
    if (!isUpdate.value) {
      const res = await templateRepo.add(response); //error on this code
      templateData.value = [...templateData.value, res.data as TemplateModel];
      $toast.success(res.message);
    } else {
      const res = await templateRepo.update(response); //error on this code
      if (res.data) {
        const data = res.data as TemplateModel;
        templateData.value = templateData.value.map((item) =>
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

const edit = (response: TemplateModel) => {
  templateForm.id = response.id;
  templateForm.description = response.description;
  templateForm.template_name = response.template_name;
  updateModal(`${response.template_name}`);
};

const remove = (id: number) => {
  setAlert("warning", "Are you sure you want to delete?", "", "Confirm delete").then(
    async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await templateRepo.delete(id);
          templateData.value = templateData.value.filter((item) => item.id !== id);
          $toast.success(response.message);
        } catch (error) {
          return handleApiError(error);
        }
      }
    }
  );
};

const resetForm = () => {
  Object.assign(templateForm, initialState);
};

const toggleModal = () => {
  resetForm();
  openModal(`Create Template`);
};
</script>

<template>
  <div>
    <EvaluationTemplateForm
      @data-template="submit"
      v-model:state="templateForm"
      :title="title"
      v-model:open="isOpen"
    />
    <div class="flex flex-col items-center lg:items-start mb-3">
      <h2 class="font-extrabold text-2xl">Template Module</h2>
      <span class="text-sm">Here's a list of template available!</span>
    </div>

    <EvaluationTemplateList :data="templateData" @update="edit" @delete="remove">
      <template #actions>
        <UButton icon="i-lucide-plus" size="sm" variant="solid" @click="toggleModal"
          >Add Template</UButton
        >
      </template>
    </EvaluationTemplateList>
  </div>
</template>
