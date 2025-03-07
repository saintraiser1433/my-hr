<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";

const { $joi } = useNuxtApp();
const emits = defineEmits<{
  (e: "dataRequirement", payload: SubmittedRequirements): void;
}>();

defineProps({
  title: {
    type: String,
    required: true,
    default: "",
  },
});

const open = defineModel("open", { default: false, required: true });
const model = defineModel<SubmittedRequirements>("state", { required: true });
const submittedAtFormatted = computed({
  get: () => model.value.submittedAt ? model.value.submittedAt.toISOString().split("T")[0] : "",
  set: (val: string) => {
    model.value.submittedAt = val ? new Date(val) : undefined;
  }
});

const expiryDateFormatted = computed({
  get: () => model.value.expiryDate ? model.value.expiryDate.toISOString().split("T")[0] : "",
  set: (val: string) => {
    model.value.expiryDate = val ? new Date(val) : undefined;
  }
});


const schema = $joi.object({
  submittedAt: $joi.date().allow(null).required().messages({
    "any.required": `Submitted Date is Required`,
    "date.empty": `Submitted Date is Required`,
  }),
  expiryDate: $joi.date().optional().allow(null),
  status: $joi.string().optional(),
  id: $joi.number().optional(),
});


const onSubmit = async (event: FormSubmitEvent<SubmittedRequirements>) => {
  console.log(event.data);
  emits("dataRequirement", {...event.data,status:EmployeeRequirementStatus.SUBMITTED});
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
    description="Select the date you want to assign"
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
        <UFormField label="Submitted Date" name="submittedAt" required>
          <UITextInput type="date" v-model="submittedAtFormatted" placeholder="Select Submitted Date" />
        </UFormField>
        <UFormField label="Expiry Date" name="expiryDate" required>
          <UITextInput type="date" v-model="expiryDateFormatted" placeholder="Selected Expiry Date" />
        </UFormField>
      </UForm>
    </template>

    <template #footer>
      <UButton label="Cancel"  variant="outline" @click="open = false" />
      <UButton label="Submit" type="submit" @click="submitForm" />
    </template>
  </UModal>
</template>
