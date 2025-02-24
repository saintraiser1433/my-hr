<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";

const { $joi } = useNuxtApp();
const emits = defineEmits<{
  (e: "dataRequirements", payload: RequirementModel): void;
}>();

defineProps({
  title: {
    type: String,
    required: true,
    default: "",
  },
});

const open = defineModel("open", { default: false, required: true });
const model = defineModel<RequirementModel>("state", { required: true });
const schema = $joi.object({
  title: $joi.string().required().messages({
    "any.required": `Title is Required`,
    "string.empty": `Title is Required`,
  }),
  description: $joi.string().required().messages({
    "any.required": `Description is Required`,
    "string.empty": `Description is Required`,
  }),
  id: $joi.number().optional(),
});

const onSubmit = async (event: FormSubmitEvent<RequirementModel>) => {
  emits("dataRequirements", event.data);
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
    description=" "
    :title="title"
    :ui="{ content: 'max-w-6xl' }"
  >
    <template #body>
      <UForm
        ref="formRef"
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField label="Job Title" name="email">
          <UITextInput />
        </UFormField>

        <UFormField label="Description" name="password">
          <UITiptapEditor />
        </UFormField>
        <UFormField label="Availability" name="email">
          <UITextInput class="w-1/2" type="number" />
        </UFormField>
        <UFormField label="Department" name="password">
          <USelectMenu class="w-1/2" size="sm" />
        </UFormField>
        <UFormField label="Job Background Image" name="password">
          <UInput type="file" class="w-1/2" size="sm" />
        </UFormField>
      </UForm>
    </template>

    <template #footer>
      <UButton label="Cancel" color="neutral" variant="outline" @click="open = false" />
      <UButton label="Submit" type="submit" color="neutral" @click="submitForm" />
    </template>
  </UModal>
</template>
