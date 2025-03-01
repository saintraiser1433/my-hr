<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";

const { $joi } = useNuxtApp();
const { file, onFileChange, previewUrl } = useFileDialog("job");
const emits = defineEmits<{
  (e: "dataJob", payload: JobModel): void;
}>();

defineProps({
  title: {
    type: String,
    required: true,
    default: "",
  },
  department: {
    type: Array as PropType<DepartmentModel[]>,
    required: true,
    default: () => [],
  },
  isUpdate: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const openModal = defineModel("open", { default: false, required: true });
const model = defineModel<JobModel>("state", { required: true });
const schema = $joi.object({
  title: $joi.string().required().messages({
    "any.required": "The title field is required",
    "string.empty": "The title field cannot be empty",
  }),
  description: $joi.string().required().messages({
    "any.required": "The description field is required",
    "string.empty": "The description field cannot be empty",
  }),
  totalAvailable: $joi.number().required().messages({
    "any.required": "The availability field is required",
    "number.empty": "The availability field cannot be empty",
  }),
  departmentsId: $joi.number().required().messages({
    "any.required": "The department field is required",
    "number.empty": "The department field cannot be empty",
  }),
  requirementsId: $joi.optional(),
  status: $joi.boolean().optional(),
  id: $joi.number().optional(),
});

const onSubmit = async (event: FormSubmitEvent<any>) => {
  emits("dataJob", {
    ...event.data,
    file: file.value,
    requirementsId: model.value.requirements?.map((item) => item.id),
  });
};

const formRef = useTemplateRef("formRef");
const submitForm = () => {
  if (formRef.value) {
    formRef.value.submit();
  }
};
const searchTerm = ref("");
const { data: rawRequirements, status, error } = await useAPI<RequirementModel[]>(
  "/requirements",
  {
    lazy: true,
  }
);

const requirements = computed(() =>
  (rawRequirements.value || []).map((req) => ({
    id: String(req.id),
    label: req.title || "",
  }))
);

const groups = computed(() => [
  {
    id: "requirements",
    label: searchTerm.value
      ? `Requirements matching “${searchTerm.value}”...`
      : "Requirements",
    items: requirements.value, // Use transformed data here
  },
]);

const removeRequirements = (id: number) => {
  const index = model.value.requirements?.findIndex((item) => item.id === id);
  if (index !== undefined && index !== -1) {
    model.value.requirements?.splice(index, 1);
  }
};
</script>

<template>
  <UModal
    v-model:open="openModal"
    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, totam architecto! Provident tempore porro ipsa! "
    :title="title"
    :ui="{ content: 'max-w-6xl' }"
  >
    <template #body>
      <UForm ref="formRef" :schema="schema" :state="state" @submit="onSubmit">
        <div class="grid grid-cols-12 gap-5">
          <div class="col-span-12 lg:col-span-9 space-y-4">
            <UFormField label="Job Title" name="title">
              <UITextInput v-model="model.title" placeholder="Enter Job Title" />
            </UFormField>
            <UFormField label="Description" name="description">
              <UITiptapEditor v-model="model.description" />
            </UFormField>

            <div class="flex flex-wrap items-center gap-3">
              <UFormField class="lg:flex-1" label="Availability" name="totalAvailable">
                <UITextInput
                  v-model="model.totalAvailable"
                  placeholder="Enter Availability"
                  class="w-full"
                  type="number"
                />
              </UFormField>
              <UFormField class="lg:flex-1" label="Department" name="departmentsId">
                <USelectMenu
                  placeholder="Select Department"
                  v-model="model.departmentsId"
                  label-key="title"
                  value-key="id"
                  :items="department"
                  class="w-full"
                  size="sm"
                />
              </UFormField>
              <UFormField class="lg:flex-1" label="Header Background Image">
                <UInput
                  type="file"
                  @change="onFileChange"
                  accept="images/*"
                  class="w-full"
                  size="sm"
                />
              </UFormField>
              <UFormField class="flex-none" v-if="isUpdate" label="Status" name="status">
                <USwitch
                  color="neutral"
                  :default-value="model.status"
                  @update:modelValue="(value) => (model.status = value)"
                />
              </UFormField>
            </div>
          </div>

          <div class="col-span-12 lg:col-span-3">
            <div class="flex justify-between items-center pb-2">
              <h5>Requirements</h5>
              <UModal description=" ">
                <UButton
                  label="Select requirements"
                  color="neutral"
                  variant="subtle"
                  icon="i-lucide-search"
                />

                <template #content>
                  <UCommandPalette
                    multiple
                    v-model="model.requirements"
                    v-model:search-term="searchTerm"
                    :loading="status === 'pending'"
                    :groups="groups"
                    placeholder="Select requirements"
                    class="h-80"
                  />
                </template>
              </UModal>
            </div>
            <USeparator class="pb-1"></USeparator>
            <ul
              class="flex items-center flex-wrap gap-2 text-xs mt-1"
              v-for="(data, index) in model.requirements"
              :key="data.id"
            >
              <li>
                <UButton type="button" @click="removeRequirements(data.id)"
                  >{{ index + 1 }} - {{ data.label }}</UButton
                >
              </li>
            </ul>
          </div>
        </div>
      </UForm>
    </template>

    <template #footer>
      <UButton
        label="Cancel"
        color="neutral"
        variant="outline"
        @click="openModal = false"
      />
      <UButton label="Submit" type="submit" color="neutral" @click="submitForm" />
    </template>
  </UModal>
</template>
