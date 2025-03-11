<script setup lang="ts">
definePageMeta({
  requiredRole: "admin",
});

useSeoMeta({
  title: "SUPERHURE Criteria Module",
  description: "CRUD for Criteria",
  ogTitle: "SUPERHURE Criteria Module",
  ogDescription: "CRUD for Criteria",
});

const { $api, $toast } = useNuxtApp();
const route = useRoute();
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
  name: "",
  teamLeadEvaluationId: Number(route.params.id),
};
const teamleadForm = reactive<TeamLeadCriteria>({ ...initialState });
const teamleadData = ref<TeamLeadCriteria[]>([]);
const { data, status, error } = await useAPI<TeamLeadCriteria[]>(
  `/teamlead/criteria/${route.params.id}`
);
if (data.value) {
  teamleadData.value = data.value;
}
if (error.value) {
  $toast.error(error.value.message || "Failed to fetch items");
}

const teamleadRepo = repository<TeamLeadCriteria>($api, "/teamlead/criteria");
const submit = async (response: TeamLeadCriteria) => {
  try {
    if (!isUpdate.value) {
      const res = await teamleadRepo.add(response);
      teamleadData.value = [...teamleadData.value, res.data as TeamLeadCriteria];
      $toast.success(res.message);
    } else {
      const res = await teamleadRepo.update(response);
      if (res.data) {
        const data = res.data as TeamLeadCriteria;
        teamleadData.value = teamleadData.value.map((item) =>
          item.id === data.id ? { ...item, ...data } : item
        );
      }

      $toast.success(res.message);
    }
    resetModal();
  } catch (error) {
    return handleApiError(error);
  }
};

const edit = (response: TeamLeadCriteria) => {
  teamleadForm.id = response.id;
  teamleadForm.name = response.name;
  updateModal(`Update Criteria`);
};

const remove = (id: number) => {
  setAlert(
    "warning",
    "Are you sure you want to delete once delete it will delete also all the question associate in this category",
    "",
    "Confirm delete"
  ).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await teamleadRepo.delete(id);
        teamleadData.value = teamleadData.value.filter((item) => item.id !== id);
        $toast.success(response.message);
      } catch (error) {
        return handleApiError(error);
      }
    }
  });
};

const resetForm = () => {
  Object.assign(teamleadForm, initialState);
};

const toggleModal = () => {
  resetForm();
  openModal(`Add Criteria`);
};
</script>

<template>
  <EvaluationTeamleadCriteriaForm
    @data-criteria="submit"
    :description="description"
    v-model:state="teamleadForm"
    :title="title"
    v-model:open="isOpen"
  />
  <!-- <Question
    :title="questionTitle"
    :is-updating="isUpdating"
    :legend-data="legendData"
    :description="questionDesc"
    :question-data="questionData"
    @submit="submitQuestion"
    @edit="editQuestion"
    @delete="removeQuestion"
    @reset="resetForm"
    v-model:open="questionisOpen"
    v-model:state="questionForm"
  >
  </Question> -->
  <div>
    <div class="flex flex-col items-center lg:items-start mb-3">
      <h2 class="font-extrabold text-2xl">Criteria Module</h2>
      <span class="text-sm">Here's a list of Criteria module!</span>
    </div>

    <EvaluationTeamleadCriteriaList :data="teamleadData" @update="edit" @delete="remove">
      <template #actions>
        <UButton icon="i-lucide-plus" size="sm" variant="solid" @click="toggleModal"
          >Add Criteria</UButton
        >
      </template>
    </EvaluationTeamleadCriteriaList>
  </div>
</template>
