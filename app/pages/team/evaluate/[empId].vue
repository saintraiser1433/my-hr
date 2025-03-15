<script setup lang="ts">
definePageMeta({
  requiredRole: "TeamLead",
});

useSeoMeta({
  title: "SUPERHURE Employee Module",
  description: "CRUD for Employee",
  ogTitle: "SUPERHURE Employee Module",
  ogDescription: "CRUD for Employee",
});
const { $api, $toast } = useNuxtApp();
const { handleApiError } = useErrorHandler();
const acad = useAcademicYearStore();
const auth = useAuthStore();
const route = useRoute();

const { data: questionnaires, status, error } = await useAPI<TeamLeadQuestionnaires[]>(
  `/evaluation/criteria/${route.params.empId}/${acad.acadId}`
);

if (error.value) {
  $toast.error(error.value.message || "Failed to fetch items");
}



const items = questionnaires.value?.map((q) => {
  const percentage = q.teamLeadEvaluation.percentage * 100;
  const label = `${q.teamLeadEvaluation.name} - ${percentage}%`;
  return {
    label: label,
    slot: sanitizeKey(q.teamLeadEvaluation.name),
  };
});

const selected = ref<Record<string, SubmitTeamLeadResult>>({});
const comments = ref("")
const handleCheckboxChange = (rowId: string, data: SubmitTeamLeadResult) => {
  selected.value[rowId] = data;
};

const totalCheckboxes = computed(() => {
  return questionnaires.value?.reduce((total, q) => {
    const questionCount = q.criteria.reduce((criteriaTotal, criterion) => {
      return criteriaTotal + criterion.questions.length;
    }, 0);
    return total + questionCount;
  }, 0) || 0;
});



const checkedCheckboxes = computed(() => {
  return Object.keys(selected.value).length;
});

const isEditorContentEmpty = (content: string): boolean => {
  const strippedContent = content.replace(/<[^>]*>/g, '');
  return strippedContent.trim() === '';
}

const isCommentsEmpty = computed(() => {
  return isEditorContentEmpty(comments.value);
});


const validateCheckboxes = () => {
  if (checkedCheckboxes.value < totalCheckboxes.value) {
    return false;
  }
  return true;
};


const handleSubmit = async () => {
  if (!validateCheckboxes()) {
    return $toast.error('Please check all checkboxes before submitting.');
  }
  if (isCommentsEmpty.value) {
    return $toast.error('Please enter a comment.');
  }

  const selectedArray = Object.keys(selected.value).map((rowId) => ({
    rowId,
    data: selected.value[rowId],
  }));

  const commentData = {
    evaluationId: acad.acadId,
    employeesId: route.params.empId,
    commenterId: auth.getId,
    description: comments.value,
  };

  const data = {
    evaluate: selectedArray,
    commentData,
  };

  // Example: Submit data to an API
  const evaluationRepo = repository<EvaluationModel>($api, "/evaluation/submit");
  try {
    const response = await evaluationRepo.add(data);
    $toast.success('Evaluation submitted successfully!');
  } catch (err) {
    $toast.error('Failed to submit evaluation.');
    handleApiError(err);
  }
};
</script>

<template>


  <div class="flex flex-col py-4 px-2 gap-2">
    <h1 class="text-center font-bold font-poppins">
      EMPLOYEE PERFORMANCE APPRAISAL FORM
    </h1>
    <h4>
      Employee Performance Appraisal shall be conducted periodically and designed to
      measure the effectiveness of South East Asian Institute of Technology Inc. Employee
      in performing his assigned duties & responsibilities. This shall also serve as a
      tool in pinpointing their performance deficiencies.
    </h4>
    <USeparator class="py-2"></USeparator>
    <div class="flex items-center gap-5">
      <h3 class="font-bold">Evaluate:</h3>
      <h3>John Rey Decosta</h3>
      <h3 class="font-bold">Position:</h3>
      <h3>Software Engineer</h3>
    </div>
    <USeparator class="py-2"></USeparator>
    <UTabs :items="items" variant="pill" class="gap-4 w-full" :ui="{ trigger: 'flex-1' }">
      <template v-for="q in questionnaires" #[sanitizeKey(q.teamLeadEvaluation.name)]="{ item }">
        <div class="p-4 border rounded-lg">
          <div class="flex items-center gap-2">
            <h4 class="font-semibold">Legends:</h4>
            <UBadge variant="subtle" size="md" v-for="detail in q.template?.details" :key="detail.id">
              <span class="capitalize">{{ detail.score }} - {{ detail.title }}</span>
            </UBadge>
          </div>
          <USeparator class="py-2"></USeparator>
          <div class="py-2">
            <QuestionEvaluate :evaluation-id="Number(acad.acadId)" :employees-id="Number(route.params.empId)"
              :data="q.criteria" :legend="q.template?.details" :selected="selected"
              @checkbox-change="handleCheckboxChange"></QuestionEvaluate>
          </div>
        </div>
      </template>
    </UTabs>
    <div class="w-full py-2">
      <h2 class="font-bold">ADD COMMENTS</h2>
      <USeparator class="py-2"></USeparator>
      <UITiptapEditor v-model="comments" />
      <USeparator class="py-2"></USeparator>
      <UButton size="lg" @click="handleSubmit">Submit Evaluation</UButton>
    </div>
  </div>







</template>
