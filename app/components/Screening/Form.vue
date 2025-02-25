<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";

const { $joi } = useNuxtApp();
const emits = defineEmits<{
  (e: "dataScreeningType", payload: ScreeningModel): void;
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
const model = defineModel<ScreeningModel>("state", { required: true });
const schema = $joi.object({
  title: $joi.string().required().messages({
    "any.required": `Screening Type is Required`,
    "string.empty": `Screening Type is Required`,
  }),
  description: $joi.string().required().messages({
    "any.required": `Description is Required`,
    "string.empty": `Description is Required`,
  }),
  status: $joi.boolean().optional(),
  id: $joi.number().optional(),
});

const onSubmit = async (event: FormSubmitEvent<ScreeningModel>) => {
  emits("dataScreeningType", event.data);
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
