<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";

const { $joi } = useNuxtApp();
const emits = defineEmits<{
  (e: "dataPeer", payload: PeerModel): void;
}>();

defineProps({
  title: {
    type: String,
    required: true,
    default: "",
  },
});

const open = defineModel("open", { default: false, required: true });
const model = defineModel<PeerModel>("state", { required: true });
const schema = $joi.object({
  title: $joi.string().required().messages({
    "any.required": `Title is Required`,
    "string.empty": `Title is Required`,
  }),
  evaluationId: $joi.number().optional(),
  id: $joi.number().optional(),
});

const onSubmit = async (event: FormSubmitEvent<PeerModel>) => {
  emits("dataPeer", event.data);
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
        <UFormField label="Category Name" name="category_name" required>
          <UITextInput v-model.trim="model.title" placeholder="Enter Category Name" />
        </UFormField>
      </UForm>
    </template>

    <template #footer>
      <UButton label="Cancel" color="neutral" variant="outline" @click="open = false" />
      <UButton label="Submit" type="submit" color="neutral" @click="submitForm" />
    </template>
  </UModal>
</template>
