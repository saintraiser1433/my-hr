<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";

const { $joi } = useNuxtApp();
const emits = defineEmits<{
  (e: "dataTeamlead", payload: TeamLeadModel): void;
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
const model = defineModel<TeamLeadModel>("state", { required: true });

const schema = $joi.object({
  name: $joi.string().required().messages({
    "any.required": `Category is Required`,
    "string.empty": `Category is Required`,
  }),
  percentage: $joi.number().required().messages({
    "any.required": `Percentage is Required`,
    "number.empty": `Percentage is Required`,
  }),
  forTeamLead: $joi.boolean().optional(),
  academicYearId: $joi.number().optional(),
  id: $joi.number().optional(),
});

const onSubmit = async (event: FormSubmitEvent<TeamLeadModel>) => {
  emits("dataTeamlead", event.data);
};

const formRef = useTemplateRef("formRef");
const submitForm = () => {
  if (formRef.value) {
    formRef.value.submit();
  }
};
const percentage = ref<{ id: number; label: string }[]>([]);
for (let i = 1; i <= 100; i++) {
  percentage.value.push({
    id: i / 100, // Convert to decimal
    label: `${i}%`,
  });
}
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
        <UFormField label="Category Name" name="name" required>
          <UITextInput v-model.trim="model.name" placeholder="Enter Category Name" />
        </UFormField>
        <UFormField label="Percentage" name="percentage" required>
          <USelectMenu
            v-model="model.percentage"
            value-key="id"
            :items="percentage"
            class="w-full"
            placeholder="Select Percentage"
          />
        </UFormField>
        <UFormField name="forTeamLead">
          <USwitch v-model="model.forTeamLead" size="md" label="For Team Lead" />
        </UFormField>
      </UForm>
    </template>

    <template #footer>
      <UButton label="Cancel" color="neutral" variant="outline" @click="open = false" />
      <UButton label="Submit" type="submit" color="neutral" @click="submitForm" />
    </template>
  </UModal>
</template>
