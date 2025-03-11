<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";

const { $joi } = useNuxtApp();
const emits = defineEmits<{
  (e: "dataCriteria", payload: TeamLeadCriteria): void;
}>();

defineProps({
  title: {
    type: String,
    required: true,
    default: "",
  },
  description: {
    type: String,
    required: true,
    default: "",
  },
});

const open = defineModel("open", { default: false, required: true });
const model = defineModel<TeamLeadCriteria>("state", { required: true });

const schema = $joi.object({
  name: $joi.string().required().messages({
    "any.required": `Name is Required`,
    "string.empty": `Name is Required`,
  }),
  teamLeadEvaluationId: $joi.number().optional(),
  id: $joi.number().optional(),
});

const onSubmit = async (event: FormSubmitEvent<TeamLeadCriteria>) => {
  emits("dataCriteria", event.data);
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
    :description="description"
    :title="title"
    :ui="{ content: 'max-w-md' }"
  >
    <template #body>
      <UForm
        ref="formRef"
        :schema="schema"
        :state="model"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField label="Critieria" name="name" required>
          <UITextInput v-model.trim="model.name" placeholder="Enter Criteria Name" />
        </UFormField>
      </UForm>
    </template>

    <template #footer>
      <UButton label="Cancel" color="neutral" variant="outline" @click="open = false" />
      <UButton label="Submit" type="submit" color="neutral" @click="submitForm" />
    </template>
  </UModal>
</template>
