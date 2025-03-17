<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";

const { $joi } = useNuxtApp();
const emits = defineEmits<{
  (e: "dataDepartment", payload: DepartmentModel): void;
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
const model = defineModel<DepartmentModel>("state", { required: true });
const schema = $joi.object({
  title: $joi.string().required().messages({
    "any.required": `Department Name is Required`,
    "string.empty": `Department Name is Required`,
  }),
  id: $joi.number().optional(),
  status: $joi.boolean().optional(),
});

const onSubmit = async (event: FormSubmitEvent<DepartmentModel>) => {
  emits("dataDepartment", event.data);
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
        <UFormField label="Department Name" name="title" required>
          <UITextInput v-model.trim="model.title" placeholder="Enter Department" />
        </UFormField>
        <UFormField v-if="isUpdate" label="Status" name="status">
          <USwitch color="neutral" :modelValue="model.status"  @update:modelValue="(value:any) => model.status = value"  />
        </UFormField>
      </UForm>
    </template>

    <template #footer>
      <UButton label="Cancel" color="neutral" variant="outline" @click="open = false" />
      <UButton label="Submit" type="submit" color="neutral" @click="submitForm" />
    </template>
  </UModal>
</template>
