<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";

const { $joi } = useNuxtApp();
const emits = defineEmits<{
  (e: "dataJobScreen", payload: JobScreeningModel): void;
}>();

defineProps({
  title: {
    type: String,
    required: true,
    default: "",
  },
  isUpdate: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const open = defineModel("open", { default: false, required: true });
const model = defineModel<JobScreeningModel>("state", { required: true });
const schema = $joi.object({
  job_id: $joi.number().required().empty().messages({
    "any.required": "The Job field is required",
    "number.empty": "The Job field is required",
  }),
  screening_id: $joi.number().required().empty().messages({
    "any.required": "The Screening field is required",
    "number.empty": "The Screening field is required",
  }),
});

const onSubmit = async (event: FormSubmitEvent<JobScreeningModel>) => {
  emits("dataJobScreen", event.data);
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
        <UFormField label="Screening Type" name="title" required>
          <UITextInput v-model.trim="model.title" placeholder="Enter Screening Type" />
        </UFormField>
        <UFormField label="Description" name="description" required>
          <UITextInput v-model.trim="model.description" placeholder="Enter description" />
        </UFormField>
        <UFormField v-if="isUpdate" label="Status" name="status" required>
          <USwitch
            color="neutral"
            :default-value="model.status"
            @update:modelValue="(value) => (model.status = value)"
          />
        </UFormField>
      </UForm>
    </template>

    <template #footer>
      <UButton label="Cancel" color="neutral" variant="outline" @click="open = false" />
      <UButton label="Submit" type="submit" color="neutral" @click="submitForm" />
    </template>
  </UModal>
</template>
