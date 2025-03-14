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
const {
    $toast
} = useNuxtApp();
const {
    handleApiError
} = useErrorHandler();
const store = useAcademicYearStore();
const route = useRoute();


const {
    data: questionnaires,
    status,
    error
} = await useAPI<TeamLeadQuestionnaires[]>(`/evaluation/criteria/${route.params.empId}/1`);


if (error.value) {
    $toast.error(error.value.message || "Failed to fetch items");
}

const sanitizeSlotName = (name: string) => name.replace(/[^a-zA-Z0-9-]/g, '-');


const items: TabItem[] = questionnaires.value.map(q => {
  const percentage = (q.teamLeadEvaluation.percentage * 100)
  const label = `${q.teamLeadEvaluation.name} - ${percentage}%`
  return {
    label: label,
    slot: sanitizeSlotName(q.teamLeadEvaluation.name)
  }

});
</script>

<template>
  <div class="flex flex-col p-2 gap-2">
    <h1 class="text-center font-bold font-poppins">
      EMPLOYEE PERFORMANCE APPRAISAL FORM
    </h1>
    <h4 class="text-center">
      Employee Performance Appraisal shall be conducted periodically and designed to measure the effectiveness of South East Asian Institute of Technology Inc. Employee in performing his assigned duties & responsibilities. This shall also serve as a tool in pinpointing their performance deficiencies.
    </h4>
  </div>

  <UTabs :items="items" variant="pill" class="gap-4 w-full" :ui="{ trigger: 'flex-1' }">
    <template v-for="q in questionnaires" #[sanitizeSlotName(q.teamLeadEvaluation.name)]="{ item }">
      <div class="p-4 border rounded-lg">

        <div class="flex items-center gap-2">
          <h4 class="font-semibold">Legends:</h4>
          <UBadge variant="subtle" size="md" v-for="detail in q.template.details" :key="detail.id">
              <span class="capitalize">{{detail.score}} - {{detail.title}}</span>
          </UBadge>
        </div>
        <USeparator class="py-2"></USeparator>
        <div class="py-2">
          <QuestionRender></QuestionRender>
          <!-- <QuestionRender :data="q.criteria" :legend="q.template.details"></QuestionRender> -->
        </div>

        <!-- Display Criteria & Questions -->
       
        <!-- <div v-for="criterion in q.criteria" :key="criterion.name" class="mt-4">
          <h3 class="font-semibold">{{ criterion.name }}</h3>
          <ul class="list-disc ml-6">
            <li v-for="question in criterion.questions" :key="question.id" v-html="question.question"></li>
          </ul>
        </div> -->
      </div>
    </template>
  </UTabs>
</template>
