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
const route = useRoute();
const { $api, $toast } = useNuxtApp();
const { handleApiError } = useErrorHandler();
const { openModal, updateModal, resetModal, isOpen, isUpdate, title } = useCustomModal();

const initialState = {
  id: undefined,
  title: "",
  description: "",
  score: 0,
  templateId: Number(route.params.tempId),
};
const templateForm = reactive<TemplateDetail>({ ...initialState });
const templateData = ref<TemplateDetail[]>([]);
const templateRepo = repository<TemplateDetail>($api, "/template/detail");

const { data, status, error } = await useAPI<TemplateDetail[]>(
  `/template/detail/${route.params.tempId}`
);
if (data.value) {
  templateData.value = data.value;
}
if (error.value) {
  $toast.error(error.value.message || "Failed to fetch items");
}

const submit = async (response: TemplateDetail) => {
  try {
    if (!isUpdate.value) {
      const res = await templateRepo.add(response); //error on this code
      templateData.value = [res.data as TemplateDetail, ...templateData.value];
      $toast.success(res.message);
    } else {
      const res = await templateRepo.update(response); //error on this code
      if (res.data) {
        const data = res.data as TemplateDetail;
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

const edit = (response: TemplateDetail) => {
  templateForm.id = response.id;
  templateForm.description = response.description;
  templateForm.title = response.title;
  templateForm.score = response.score;
  updateModal(`Update Template Detail`);
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
  openModal(`Create Template Detail`);
};
</script>

<template>
  <div>
    <EvaluationTemplateDetailForm
      @data-template="submit"
      v-model:state="templateForm"
      :title="title"
      v-model:open="isOpen"
    />
    <div class="flex flex-col items-center lg:items-start mb-3">
      <h2 class="font-extrabold text-2xl">Template Module</h2>
      <span class="text-sm">Here's a list of template available!</span>
    </div>
    <UCard
      :ui="{
        root: 'border-b-3 border-(--ui-primary) rounded-md',
      }"
    >
      <EvaluationTemplateDetailList :data="templateData" @update="edit" @delete="remove">
        <template #actions>
          <UButton icon="i-lucide-plus" size="sm" variant="solid" @click="toggleModal"
            >Add Template</UButton
          >
        </template>
      </EvaluationTemplateDetailList>
    </UCard>
  </div>
</template>
