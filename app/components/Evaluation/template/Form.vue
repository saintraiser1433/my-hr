<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";

const { $joi } = useNuxtApp();
const emits = defineEmits<{
  (e: "dataTemplate", payload: TemplateModel): void;
}>();

defineProps({
  title: {
    type: String,
    required: true,
    default: "",
  },
});

const open = defineModel("open", { default: false, required: true });
const model = defineModel<TemplateModel>("state", { required: true });
const schema = $joi.object({
  template_name: $joi.string().required().messages({
    "any.required": `Template Name is Required`,
    "string.empty": `Template Name is Required`,
  }),
  description: $joi.string().required().messages({
    "any.required": `Description is Required`,
    "string.empty": `Description is Required`,
  }),
  id: $joi.number().optional(),
});

const onSubmit = async (event: FormSubmitEvent<TemplateModel>) => {
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
        <UFormField label="Template Name" name="template_name" required>
          <UITextInput v-model.trim="model.template_name" placeholder="Enter Title" />
        </UFormField>
        <UFormField label="Description" name="description" required>
          <UITextInput v-model.trim="model.description" placeholder="Enter description" />
        </UFormField>
      </UForm>
    </template>

    <template #footer>
      <UButton label="Cancel" color="neutral" variant="outline" @click="open = false" />
      <UButton label="Submit" type="submit" color="neutral" @click="submitForm" />
    </template>
  </UModal>
</template>
