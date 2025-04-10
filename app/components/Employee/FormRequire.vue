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
  get: () => {
    const value = model.value.submittedAt;
    if (!value) return "";
    const date = value instanceof Date ? value : new Date(value);
    return isNaN(date.getTime()) ? "" : date.toISOString().split("T")[0];
  },
  set: (val: string) => {
    model.value.submittedAt = val ? new Date(val) : undefined;
  },
});



const expiryDateFormatted = computed({
  get: () =>{
    const value = model.value.expiryDate;
    if (!value) return "";
    const date = value instanceof Date ? value : new Date(value);
    return isNaN(date.getTime()) ? "" : date.toISOString().split("T")[0];
  },
  set: (val: string) => {
    model.value.expiryDate = val ? new Date(val) : undefined;
  },
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
const isCheck = ref(false);
const onSubmit = async (event: FormSubmitEvent<SubmittedRequirements>) => {
  emits("dataRequirement", {
    ...event.data,
    status: EmployeeRequirementStatus.SUBMITTED,
    isCheck:isCheck.value
  });
};

const formRef = useTemplateRef("formRef");
const submitForm = () => {
  if (formRef.value) {
    formRef.value.submit();
  }
};





watch(() => isCheck.value,(newVal) => {
  model.value.expiryDate = null;
})
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
          <UInput
            type="date"
            class="w-full"
            v-model="submittedAtFormatted"
            placeholder="Select Submitted Date"
          />
        </UFormField>
        <UFormField v-if="!isCheck" label="Expiry Date" name="expiryDate" required>
          <UInput
            type="date"
            class="w-full"
            v-model="expiryDateFormatted"
            placeholder="Selected Expiry Date"
          />
        </UFormField>
        <UFormField label="No Expiry?" name="isExpiry" required>
          <UCheckbox v-model="isCheck" />
          <!-- <UInput
            type="checkbox"
            class="w-full"
            v-model="expiryDateFormatted"
            placeholder="Selected Expiry Date"
          /> -->
        </UFormField>
      </UForm>
    </template>

    <template #footer>
      <UButton label="Cancel" variant="outline" @click="open = false" />
      <UButton label="Submit" type="submit" @click="submitForm" />
    </template>
  </UModal>
</template>
