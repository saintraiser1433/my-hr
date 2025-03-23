<script setup lang="ts">
definePageMeta({
  requiredRole: "Admin",
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
const { data, status, error } = await useAPI<TeamLeadCriteria[]>(
  `/teamlead/criteria/${route.params.id}`
);

const criteriaId = ref<number>(0);
const question = ref<QuestionModel[]>([]);
const legend = ref<TemplateDetail[]>([]);

if (error.value) {
  $toast.error(error.value.message || "Failed to fetch items");
}

const {
  toggleModal,
  remove,
  edit,
  submit,
  teamleadForm,
  dataTeamlead,
  description,
  title,
  isOpen,
} = useTeamLeadCategories(data, Number(route.params.id), "/teamlead/criteria");

const {
  isUpdating,
  questionisOpen,
  questionDesc,
  questionTitle,
  questionForm,
  legendData,
  questionData,
  questionOpenModal,
  submitQuestion,
  editQuestion,
  removeQuestion,
  resetForm,
} = useQuestions(question, legend, criteriaId, "TeamLead");

const fetchPeerQuestion = async (item: TeamLeadCriteria) => {
  try {
    const response = await $api<CombinedPeerQuestionWithLegend>(`/question/${item.id}`);
    question.value = response.questions || [];
    legend.value = response.legends || [];
    criteriaId.value = item.id || 0;
    questionOpenModal(`${item.name}`);
  } catch (err) {
    handleApiError(err);
  }
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
  <Question
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
  </Question>
  <div>
    <div class="flex flex-col items-center lg:items-start mb-3">
      <h2 class="font-extrabold text-2xl">Criteria Module</h2>
      <span class="text-sm">Here's a list of Criteria module!</span>
    </div>
    <UCard
      :ui="{
        root: 'border-b-3 border-(--ui-primary) rounded-md',
      }"
    >
      <EvaluationTeamleadCriteriaList
        :data="dataTeamlead"
        @modal-quest="fetchPeerQuestion"
        @update="edit"
        @delete="remove"
      >
        <template #actions>
          <UButton icon="i-lucide-plus" size="sm" variant="solid" @click="toggleModal"
            >Add Criteria</UButton
          >
        </template>
      </EvaluationTeamleadCriteriaList>
    </UCard>
  </div>
</template>
