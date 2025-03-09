<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";

const { $joi } = useNuxtApp();
const emits = defineEmits<{
  (e: "dataTemplate", payload: TemplateDetail): void;
}>();

defineProps({
  title: {
    type: String,
    required: true,
    default: "",
  },
});

const open = defineModel("open", { default: false, required: true });
const model = defineModel<TemplateDetail>("state", { required: true });
const schema = $joi.object({
  title: $joi.string().required().messages({
    "any.required": `Legend Name is Required`,
    "string.empty": `Legend Name is Required`,
  }),
  description: $joi.string().required().messages({
    "any.required": `Description is Required`,
    "string.empty": `Description is Required`,
  }),
  score: $joi.number().required().messages({
    "any.required": `Score is Required`,
    "number.empty": `Score is Required`,
  }),
  templateId: $joi.number().required().messages({
    "any.required": "The template header id field is required",
    "string.empty": "The template header id field cannot be empty"
  }),
  id: $joi.number().optional(),
});

const onSubmit = async (event: FormSubmitEvent<TemplateDetail>) => {
  emits("dataTemplate", event.data);
};

const formRef = useTemplateRef("formRef");
const submitForm = () => {
  if (formRef.value) {
    formRef.value.submit();
  }
};
</script>

<template>
  <UModal
    v-model:open="open"
    description="Test"
    :title="title"
    :ui="{ content: 'max-w-sm' }"
  >
    <template #body>
      <UForm
        ref="formRef"
        :schema="schema"
        :state="model"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField label="Legend" name="title" required>
          <UITextInput v-model.trim="model.title" placeholder="Enter Title" />
        </UFormField>
        <UFormField label="Description" name="description" required>
          <UITextInput v-model.trim="model.description" placeholder="Enter description" />
        </UFormField>
        <UFormField label="Score" name="score" required>
          <UITextInput type="number"  v-model.number="model.score" placeholder="Enter Score" />
        </UFormField>
      </UForm>
    </template>

    <template #footer>
      <UButton label="Cancel" color="neutral" variant="outline" @click="open = false" />
      <UButton label="Submit" type="submit" color="neutral" @click="submitForm" />
    </template>
  </UModal>
</template>
