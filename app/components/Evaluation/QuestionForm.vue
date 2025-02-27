<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";

const { $joi } = useNuxtApp();
const emits = defineEmits<{
  (e: "dataQuestion", payload: EvaluationModel): void;
}>();


const model = defineModel<EvaluationModel>("state", { required: true });
const schema = $joi.object({
  id: $joi.number().optional(),
  question: $joi.string().required().messages({
    "any.required": "The School Year field is required",
    "string.empty": "The School Year field is required"
  }),
});

const onSubmit = async (event: FormSubmitEvent<EvaluationModel>) => {

  emits("dataQuestion", event.data);

};

const formRef = useTemplateRef("formRef");
const submitForm = () => {
  if (formRef.value) {
    formRef.value.submit();
  }
};


const schoolYearItem: string[] = [];

let startYear = 2020;
for (let i = 0; i < 50; i++) {
  const nextYear = startYear + 1;
  schoolYearItem.push(`${startYear}-${nextYear}`);
  startYear++;
}


</script>

<template>

  <UCard :ui="{
    root: 'overflow-hidden ',
    header: 'p-0 sm:px-3 py-2',
    body: 'p-4 sm:px-3 sm:py-2',
    footer: 'p-0 sm:px-0',
  }">
  <template #header>
    <h3 class="font-bold text-(--foreground)">MANAGE QUESTIONS</h3>
  </template>
    <UForm ref="formRef" :schema="schema" :state="model" class="space-y-4" @submit="onSubmit">
      <UFormField  class="my-2" label="Description" name="description" required>
        <UITiptapEditor class="pt-1"  />
      </UFormField>
      
    </UForm>
    <template #footer>
      <div class="flex justify-end items-center p-2">
        <UButton size="md" @click="submitForm">Submit</UButton>
      </div>
    </template>
  </UCard>

</template>
