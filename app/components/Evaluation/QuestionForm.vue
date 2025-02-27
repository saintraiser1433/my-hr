<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";

const { $joi } = useNuxtApp();
const emits = defineEmits<{
  (e: "dataQuestion", payload: QuestionModel): void;
}>();


const model = defineModel<QuestionModel>("state", { required: true });
const schema = $joi.object({
  id: $joi.number().optional(),
  question: $joi.string().required().messages({
    "any.required": "The Question field is required",
    "string.empty": "The Question field is required"
  }),
});

const onSubmit = async (event: FormSubmitEvent<QuestionModel>) => {

  emits("dataQuestion", event.data);
  console.log('dasdsa')
};

const formRef = useTemplateRef("formRef");
const submitForm = () => {
  if (formRef.value) {
    formRef.value.submit();
  }
};





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
      <UFormField class="my-2" label="Description" name="question" required>
        <UITiptapEditor v-model="model.question" class="pt-1" />
      </UFormField>

    </UForm>
    <template #footer>
      <div class="flex justify-end items-center p-2">
        <UButton size="md" @click="submitForm">Submit</UButton>
      </div>
    </template>
  </UCard>

</template>
