<script setup lang="ts">
import type { CommandPaletteItem, FormSubmitEvent } from "@nuxt/ui";

const { $joi } = useNuxtApp();
const { file, onFileChange, previewUrl } = useFileDialog("job");
const emits = defineEmits<{
  (e: "dataJob", payload: JobModel): void;
}>();

const props = defineProps({
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
  description: {
    type: String,
    required: true,
    default: "",
  },
});

const openModal = defineModel("open", { default: false, required: true });
const model = defineModel<JobModel>("state", { required: true });
const { isUpdate } = toRefs(props);
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
  requirements: $joi.optional(),
  status: $joi.boolean().optional(),
  id: $joi.number().optional(),
});

const onSubmit = async (event: FormSubmitEvent<any>) => {

  emits("dataJob", {
    ...event.data,
    file: file.value,
    requirements: model.value.requirements?.map((item) => item.id),
  });
};

const formRef = useTemplateRef("formRef");
const submitForm = () => {
  if (formRef.value) {
    formRef.value.submit();
  }
};
const searchTerm = ref("");

const { data: users, status } = await useAPI<RequirementModel[]>('/requirements', {
  lazy: true
})

const groups = computed(() => [{
  id: 'users',
  label: searchTerm.value ? `Users matching “${searchTerm.value}”...` : 'Users',

  items: users.value?.map((item) => ({
    id: item.id,
    label: item.title
  })) || []
}])

const removeRequirements = (id: number) => {
  const index = model.value.requirements.findIndex((item) => item.id === id);
  model.value.requirements.splice(index, 1);
}




</script>

<template>

  <UModal v-model:open="openModal"
    :description="description"
    :title="title"  :ui="{ content: 'max-w-6xl' }">
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
                <UITextInput v-model="model.totalAvailable" placeholder="Enter Availability" class="w-full"
                  type="number" />
              </UFormField>
              <UFormField class="lg:flex-1" label="Department" name="departmentsId">
                <USelectMenu placeholder="Select Department" v-model="model.departmentsId" label-key="title"
                  value-key="id" :items="department" class="w-full" :ui="{ base: 'capitalize' }" size="sm" />
              </UFormField>
              <UFormField class="lg:flex-1" label="Header Background Image">
                <UInput type="file" @change="onFileChange" accept="images/*" class="w-full" size="sm" />
              </UFormField>
              <UFormField class="flex-none" v-if="isUpdate" label="Status" name="status">
                <USwitch color="neutral" :default-value="model.status"
                  @update:modelValue="(value) => (model.status = value)" />
              </UFormField>
            </div>
          </div>

          <div class="col-span-12 lg:col-span-3">
            <div class="flex justify-between items-center pb-2">
              <h5>Requirements</h5>
              <UModal>
                <UButton label="Select requirements" color="neutral" variant="subtle" icon="i-lucide-search" />

                <template #content>

                  <UCommandPalette multiple v-model="model.requirements" v-model:search-term="searchTerm"
                    :loading="status === 'pending'" :groups="groups" class="flex-1 h-80" />
                </template>
              </UModal>
            </div>
            <USeparator class="pb-1"></USeparator>
            <ul class="flex items-center flex-wrap gap-2  mt-1" v-for="(data, index) in model.requirements"
              :key="data.id">
              <li>

                <UButton type="button" @click="removeRequirements(data.id)">{{ index + 1 }} - {{ data.label }}
                </UButton>
              </li>
            </ul>
          </div>
        </div>
      </UForm>
    </template>

    <template #footer>
      <UButton label="Cancel" color="neutral" variant="outline" @click="openModal = false" />
      <UButton label="Submit" type="submit" color="neutral" @click="submitForm" />
    </template>
  </UModal>
</template>
