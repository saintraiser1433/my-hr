<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
const emits = defineEmits<{
  (e: "dataQuestion", payload: QuestionModel): void;
  (e: "cancel"): void;
}>();
defineProps({
  isUpdate: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const model = defineModel<QuestionModel>("state", { required: true });

const { $joi } = useNuxtApp();
const formRef = useTemplateRef("formRef");

const schema = $joi.object({
  id: $joi.number().optional(),
  question: $joi.string().required().messages({
    "any.required": "The Question field is required",
    "string.empty": "The Question field is required",
  }),
  peerId: $joi.number().optional(),
  teamLeadCriteriaId: $joi.number().optional(),
  assignTaskCriteriaId: $joi.number().optional(),
  type: $joi.string().optional(),
});

const onSubmit = async (event: FormSubmitEvent<QuestionModel>) => {
  emits("dataQuestion", event.data);
};

const onCancel = () => {
  emits("cancel");
};

const submitForm = () => {
  if (formRef.value) {
    formRef.value.submit();
  }
};
</script>

<template>
  <UCard
    :ui="{
      root: 'overflow-hidden ',
      header: 'p-0 sm:px-3 py-2',
      body: 'p-4 sm:px-3 sm:py-2',
      footer: 'p-0 sm:px-0',
    }"
  >
    <template #header>
      <h3 class="font-bold text-(--foreground)">MANAGE QUESTIONS</h3>
    </template>
    <UForm
      ref="formRef"
      :schema="schema"
      :state="model"
      class="space-y-4"
      @submit="onSubmit"
    >
      <UFormField class="my-2" label="Description" name="question" required>
        <UITiptapEditor v-model="model.question" class="pt-1" />
      </UFormField>
    </UForm>
    <template #footer>
      <div class="flex justify-end items-center p-2 gap-2">
        <UButton v-if="isUpdate" variant="outline" @click="onCancel">Cancel</UButton>
        <UButton @click="submitForm" :label="isUpdate ? 'Update' : 'Submit'"></UButton>
      </div>
    </template>
  </UCard>
</template>
