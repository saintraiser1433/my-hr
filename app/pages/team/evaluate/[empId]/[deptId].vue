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
const infoTeam = ref<EmployeeRatingStatus | null>(
  JSON.parse(localStorage.getItem("evaluateeInfo") || "null")
);
const { data: questionnaires, status, error } = await useAPI<Questionnaires[]>(
  `/evaluation/criteria/${route.params.empId}/${acad.acadId}`
);

if (error.value) {
  $toast.error(error.value.message || "Failed to fetch items");
}

const items = questionnaires.value?.map((q) => {
  const percentage = q.evaluation.percentage * 100;
  const label = `${q.evaluation.name} - ${percentage}%`;
  return {
    label: label,
    slot: sanitizeKey(q.evaluation.name),
  };
});

const selected = ref<Record<string, SubmitResult>>({});
const comments = ref("");
const handleCheckboxChange = (rowId: string, data: SubmitResult) => {
  selected.value[rowId] = data;
};

const totalCheckboxes = computed(() => {
  return (
    questionnaires.value?.reduce((total, q) => {
      const questionCount = q.questions.length;
      return total + questionCount;
    }, 0) || 0
  );
});

const checkedCheckboxes = computed(() => {
  return Object.keys(selected.value).length;
});

const isEditorContentEmpty = (content: string): boolean => {
  const strippedContent = content.replace(/<[^>]*>/g, "");
  return strippedContent.trim() === "";
};

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
    return $toast.error("Please check all checkboxes before submitting.");
  }
  if (isCommentsEmpty.value) {
    return $toast.error("Please enter a comment.");
  }

  const evaluate = Object.keys(selected.value)
    .map((rowId) => selected.value[rowId])
    .filter((item): item is SubmitResult => item !== undefined);

  const headerStatus: HeaderStatus = {
    academicYearId: Number(acad.acadId),
    evaluateeId: Number(route.params.empId),
    evaluatorId: Number(auth.getId),
    description: comments.value,
    type: Type.TEAMLEAD,
    departmentsId: Number(route.params.deptId),
  };

  const data: SubmissionModel = {
    evaluate,
    headerStatus,
  };

  const submissionRepo = repository<SubmissionModel>($api, "/evaluation/submit");
  setAlert("warning", "Are you sure you want to submit?", "", "Confirm submit").then(
    async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await submissionRepo.add(data);
          await navigateTo({ name: "team-evaluate" });
          $toast.success(response.message);
        } catch (err) {
          handleApiError(err);
        }
      }
    }
  );
};
</script>

<template>
  <UCard
    :ui="{
      root: 'border-b-3 border-(--ui-primary) rounded-md shadow-lg',
      body: 'px-2 sm:px-2',
    }"
  >
    <div class="flex flex-col py-4 px-2 gap-2">
      <h1 class="text-center font-bold font-poppins">
        EMPLOYEE PERFORMANCE APPRAISAL FORM
      </h1>
      <h4>
        Employee Performance Appraisal shall be conducted periodically and designed to
        measure the effectiveness of South East Asian Institute of Technology Inc.
        Employee in performing his assigned duties & responsibilities. This shall also
        serve as a tool in pinpointing their performance deficiencies.
      </h4>
      <USeparator class="py-2"></USeparator>
      <div class="flex items-center gap-5 capitalize">
        <h3 class="font-bold">Evaluate:</h3>
        <h3>{{ infoTeam?.evaluatee }}</h3>
        <h3 class="font-bold">Position:</h3>
        <h3>{{ infoTeam?.job }}</h3>
      </div>
      <USeparator class="py-2"></USeparator>
      <UTabs
        :items="items"
        variant="pill"
        class="gap-4 w-full"
        :ui="{ trigger: 'flex-1' }"
      >
        <template
          v-for="q in questionnaires"
          #[sanitizeKey(q.evaluation.name)]="{ item }"
        >
          <UCard
            :ui="{
              root: 'rounded-md',
            }"
          >
            <div class="flex items-center gap-2 px-5 py-2">
              <h4 class="font-semibold">Legends:</h4>
              <UBadge
                variant="subtle"
                size="md"
                v-for="detail in q.template?.details"
                :key="detail.id"
              >
                <span class="capitalize">{{ detail.score }} - {{ detail.title }}</span>
              </UBadge>
            </div>
            <QuestionEvaluate
              :academic-year-id="Number(acad.acadId)"
              :data="q.questions"
              :legend="q.template?.details"
              :selected="selected"
              @checkbox-change="handleCheckboxChange"
            ></QuestionEvaluate>
          </UCard>
        </template>
      </UTabs>
      <div class="w-full py-2">
        <h3 class="font-bold">COMMENTS</h3>
        <USeparator class="py-2"></USeparator>
        <UITiptapEditor v-model="comments" />
        <USeparator class="py-2"></USeparator>
        <UButton size="lg" @click="handleSubmit">Submit Evaluation</UButton>
      </div>
    </div>
  </UCard>
</template>
