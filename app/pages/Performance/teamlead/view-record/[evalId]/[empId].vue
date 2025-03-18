<script setup lang="ts">
const route = useRoute();
const { data: questionnaires, status, error } = await useAPI<TeamLeadQuestionnaires[]>(
  `/evaluation/criteria/${route.params.empId}/${route.params.evalId}`
);

const { data: questionAnswer } = await useAPI<GetEvaluateQuestion>(
  `/evaluation/view/${route.params.empId}/${route.params.evalId}`
);

const selected = ref<Record<string, SubmitResult>>({});

questionAnswer.value?.transformData.forEach((item) => {
  const key = item.questionId.toString();   
  selected.value[key] = item;
});


const items = questionnaires.value?.map((q) => {
  const percentage = q.teamLeadEvaluation.percentage * 100;
  const label = `${q.teamLeadEvaluation.name} - ${percentage}%`;
  return {
    label: label,
    slot: sanitizeKey(q.teamLeadEvaluation.name),
  };
});


</script>

<template>

  <div class="flex flex-col py-4 px-2 gap-2">
    <div class="flex flex-col items-center lg:items-start mb-3">
        <h2 class="font-extrabold text-2xl">View Evaluation Form</h2>
        <span class="text-sm">Viewing evaluation of the evaluated user!</span>
    </div>
    <UTabs :items="items" variant="pill" class="gap-4 w-full" :ui="{ trigger: 'flex-1' }">
      <template
        v-for="q in questionnaires"
        #[sanitizeKey(q.teamLeadEvaluation.name)]="{ item }"
      >
        <div class="p-4 border rounded-lg">
          <div class="flex items-center gap-2">
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
          <USeparator class="py-2"></USeparator>
          <div class="py-2">
            <QuestionEvaluate
              :data="q.criteria"
              :legend="q.template?.details"
              :selected="selected"
              :employees-id="Number(route.params.empId)"
              :evaluation-id="Number(route.params.evalId)"
            ></QuestionEvaluate>
          </div>
        </div>
      </template>
    </UTabs>
    <div class="w-full py-2">
      <h2 class="font-bold">COMMENTS</h2>
      <USeparator class="py-2"></USeparator>
      <UITiptapEditor :modelValue="questionAnswer?.commentsDetail.comment" :disabled="true" />
    </div>
    <div class="py-2">
        <h3 class="font-bold">Evaluated By: <span class="font-normal underline">{{ questionAnswer?.commentsDetail.evaluatedBy }}</span></h3>
    </div>
  </div>
</template>



