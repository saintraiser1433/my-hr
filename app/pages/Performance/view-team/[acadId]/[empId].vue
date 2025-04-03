<script setup lang="ts">
const route = useRoute();
const { data: questionnaires, status, error } = await useAPI<Questionnaires[]>(
  `/evaluation/criteria/${route.params.empId}/${route.params.acadId}`
);

const { data: questionAnswer } = await useAPI<GetEvaluateQuestion>(
  `/evaluation/view/${route.params.empId}/${route.params.acadId}`
);

const selected = ref<Record<string, SubmitResult>>({});

questionAnswer.value?.transformData.forEach((item) => {
  const key = item.questionId.toString();
  selected.value[key] = item;
});

const items = questionnaires.value?.map((q) => {
  const percentage = q.evaluation.percentage * 100;
  const label = `${q.evaluation.name} - ${percentage}%`;
  return {
    label: label,
    slot: sanitizeKey(q.evaluation.name),
  };
});
</script>

<template>
  <div class="flex flex-col py-4 px-2 gap-2">
    <div class="flex flex-col items-center lg:items-start mb-3">
      <h2 class="font-extrabold text-2xl">View Evaluation Form</h2>
      <span class="text-sm">Viewing evaluation of the evaluated user!</span>
    </div>
    <UCard
    :ui="{
      root: 'border-b-3 border-(--ui-primary) rounded-md shadow-lg',
      body: 'p-3 sm:p-3',
    }"
  >
    <UTabs :items="items" variant="pill" class="gap-4 w-full" :ui="{ trigger: 'flex-1' }">
      <template v-for="q in questionnaires" #[sanitizeKey(q.evaluation.name)]="{ item }">
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
            :data="q.questions"
            :legend="q.template?.details"
            :selected="selected"
          ></QuestionEvaluate>
        </UCard>
      </template>
    </UTabs>
    <div class="w-full py-2">
      <h3 class="font-bold">COMMENTS</h3>
      <USeparator class="py-2"></USeparator>
      <UITiptapEditor
        :modelValue="questionAnswer?.commentsDetail.comment"
        :disabled="true"
      />
    </div>
  </UCard>
  </div>
</template>
