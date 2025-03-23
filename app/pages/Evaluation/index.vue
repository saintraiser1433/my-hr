<script setup lang="ts">
definePageMeta({
  requiredRole: "Admin",
});

useSeoMeta({
  title: "SUPERHURE Evaluation Module",
  description: "CRUD for Evaluation",
  ogTitle: "SUPERHURE Evaluation Module",
  ogDescription: "CRUD for Evaluation",
});

const { $api, $toast } = useNuxtApp();
const { handleApiError } = useErrorHandler();
const {
  openModal,
  updateModal,
  description,
  resetModal,
  isOpen,
  isUpdate,
  title,
} = useCustomModal();

const initialState = {
  id: undefined,
  school_year: undefined,
  semester: undefined,
  status: undefined,
};
const evaluationForm = reactive<EvaluationModel>({ ...initialState });
const evaluationData = ref<EvaluationModel[]>([]);
const evaluationRepo = repository<EvaluationModel>($api, "/evaluation");
const { data, status, error } = await useAPI<EvaluationModel[]>("/evaluation");
if (data.value) {
  evaluationData.value = data.value;
}
if (error.value) {
  $toast.error(error.value.message || "Failed to fetch items");
}

const { data: template, status: statusTemp, error: errorTemp } = await useAPI<
  TemplateModel[]
>("/template");

const submit = async (response: EvaluationModel) => {
  try {
    if (!isUpdate.value) {
      const res = await evaluationRepo.add(response); //error on this code
      evaluationData.value = [res.data as EvaluationModel, ...evaluationData.value]; // Add new item at the start
      $toast.success(res.message);
    } else {
      const res = await evaluationRepo.update(response); //error on this code
      if (res.data) {
        const data = res.data as EvaluationModel;
        evaluationData.value = evaluationData.value.map((item) =>
          item.id === data.id ? data : item
        );
      }

      $toast.success(res.message);
    }
    resetModal();
  } catch (error) {
    handleApiError(error);
  }
};

const edit = (response: EvaluationModel) => {
  evaluationForm.id = response.id;
  evaluationForm.status = response.status;
  evaluationForm.school_year = response.school_year;
  evaluationForm.semester = response.semester;
  evaluationForm.peerTemplateId = Number(response.peerTemplateId);
  evaluationForm.teamLeadTemplateId = Number(response.teamLeadTemplateId);
  updateModal(`Update Evaluation`);
};

const remove = (id: number) => {
  setAlert("warning", "Are you sure you want to delete?", "", "Confirm delete").then(
    async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await evaluationRepo.delete(id);
          evaluationData.value = evaluationData.value.filter((item) => item.id !== id);
          $toast.success(response.message);
        } catch (error) {
          return handleApiError(error);
        }
      }
    }
  );
};

const resetForm = () => {
  Object.assign(evaluationForm, initialState);
};

const toggleModal = () => {
  resetForm();
  openModal(`Create Evaluation`);
};
</script>

<template>
  <div>
    <EvaluationForm
      @data-evaluation="submit"
      :isUpdate="isUpdate"
      :template="template"
      :title="title"
      :description="description"
      v-model:state="evaluationForm"
      v-model:open="isOpen"
    />
    <div class="flex flex-col items-center lg:items-start mb-3">
      <h2 class="font-extrabold text-2xl">Evaluation Module</h2>
      <span class="text-sm">Here's a list of Evaluation available!</span>
    </div>
    <UCard
      :ui="{
        root: 'overflow-hidden border-b-3 border-(--ui-primary)  rounded-md ',
      }"
    >
      <EvaluationList :data="evaluationData" @update="edit" @delete="remove">
        <template #actions>
          <UButton icon="i-lucide-plus" size="sm" variant="solid" @click="toggleModal"
            >Add Evaluation
          </UButton>
        </template>
      </EvaluationList>
    </UCard>
  </div>
</template>
