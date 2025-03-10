<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";

const { $joi } = useNuxtApp();
const emits = defineEmits<{
  (e: "dataEvaluation", payload: EvaluationModel): void;
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
    default: false
  },
  description: {
    type: String,
    required: true,
    default: "",
  },
});

const open = defineModel("open", { default: false, required: true });
const model = defineModel<EvaluationModel>("state", { required: true });
const schema = $joi.object({
  id: $joi.number().optional(),
  school_year: $joi.string().required().messages({
    "any.required": "The School Year field is required",
    "string.empty": "The School Year field is required"
  }),
  semester: $joi.number().required().messages({
    "any.required": "The semester field is required",
    "number.empty": "The semester field cannot be empty"
  }),
  status: $joi.string().optional()
});

const onSubmit = async (event: FormSubmitEvent<EvaluationModel>) => {

  emits("dataEvaluation", event.data);

};

const formRef = useTemplateRef("formRef");
const submitForm = () => {
  if (formRef.value) {
    formRef.value.submit();
  }
};

const semesterItem = [
  {
    id: 1,
    label: 'First Semester'
  },
  {
    id: 2,
    label: 'Second Semester'
  }
]

const statusItems: statusesEvaluation[] = [
  'ONGOING',
  'FINISHED'
]

const schoolYearItem: string[] = [];

let startYear = 2020;
for (let i = 0; i < 50; i++) {
  const nextYear = startYear + 1;
  schoolYearItem.push(`${startYear}-${nextYear}`);
  startYear++;
}


</script>

<template>
  <UModal v-model:open="open" :description="description" :title="title" :ui="{ content: 'max-w-sm' }">
    <template #body>

      <UForm ref="formRef" :schema="schema" :state="model" class="space-y-4" @submit="onSubmit">
        <UFormField label="School Year" name="school_year" required>
          <USelectMenu :items="schoolYearItem" v-model="model.school_year" class="w-full" size="sm"
            placeholder="Select School Year"></USelectMenu>

        </UFormField>
        <UFormField label="Semester" name="semester" required>
          <USelectMenu :items="semesterItem" v-model="model.semester" label-key="label" value-key="id" class="w-full"
            size="sm" placeholder="Select Semester"></USelectMenu>
        </UFormField>
        <UFormField v-if="isUpdate" label="Status" name="status">
          <USelectMenu :items="statusItems" v-model="model.status" class="w-full"
            size="sm" placeholder="Select Status"></USelectMenu>
        </UFormField>
      </UForm>
    </template>

    <template #footer>
      <UButton label="Cancel" color="neutral" variant="outline" @click="open = false" />
      <UButton label="Submit" type="submit" color="neutral" @click="submitForm" />
    </template>
  </UModal>
</template>
