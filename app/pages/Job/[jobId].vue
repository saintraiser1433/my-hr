<script setup lang="ts">
definePageMeta({
  requiredRole: "admin",
});

useSeoMeta({
  title: "SUPERHURE Screening Type Module",
  description: "CRUD for Screening Type",
  ogTitle: "SUPERHURE Screening Type Module",
  ogDescription: "CRUD for Screening Type",
});

const { $api, $toast } = useNuxtApp();
const { handleApiError } = useErrorHandler();
const { openModal, updateModal, resetModal, isOpen, isUpdate, title } = useCustomModal();

const initialState = {
  job_id: undefined,
  screening_id: undefined,
};
const assignJobScreenForm = reactive<JobScreeningModel>({ ...initialState });
const jobScreenData = ref<JobScreeningModel[]>([]);
const jobScreenRepo = repository<JobScreeningModel>($api, "/screening/assign");

const { data, status, error } = await useAPI<JobScreeningModel[]>("/screening/assign");
if (data.value) {
  jobScreenData.value = data.value;
}
if (error.value) {
  $toast.error(error.value.message || "Failed to fetch items");
}

const submit = async (response: JobScreeningModel) => {
  try {
    if (!isUpdate.value) {
      const res = await jobScreenRepo.add(response);
      jobScreenData.value = [...jobScreenData.value, res.data as JobScreeningModel];
      $toast.success(res.message);
    } else {
      const res = await jobScreenRepo.update(response);
      if (res.data) {
        const data = res.data as JobScreeningModel;
        jobScreenData.value = jobScreenData.value.map((item) =>
          item.job_id === data.job_id && item.screening_id === data.screening_id
            ? data
            : item
        );
      }

      $toast.success(res.message);
    }
    resetModal();
  } catch (error) {
    return handleApiError(error);
  }
};

const edit = (response: JobScreeningModel) => {
  assignJobScreenForm.job_id = response.job_id;
  assignJobScreenForm.screening_id = response.screening_id;

  updateModal(`Update Assign Job Screen`);
};

const remove = (id: number) => {
  //   setAlert("warning", "Are you sure you want to delete?", "", "Confirm delete").then(
  //     async (result) => {
  //       if (result.isConfirmed) {
  //         try {
  //           const response = await jobScreenRepo.delete(id);
  //           jobScreenData.value = jobScreenData.value.filter((item) => item.job_id !== id);
  //           $toast.success(response.message);
  //         } catch (error) {
  //           return handleApiError(error);
  //         }
  //       }
  //     }
  //   );
};

const resetForm = () => {
  Object.assign(assignJobScreenForm, initialState);
};

const toggleModal = () => {
  resetForm();
  openModal(`Assign Job Screening`);
};
</script>

<template>
  <ScreeningForm
    :isUpdate="isUpdate"
    @data-screeningType="submit"
    v-model:state="assignJobScreenForm"
    :title="title"
    v-model:open="isOpen"
  />
  <div class="flex flex-col items-center lg:items-start mb-3">
    <h2 class="font-extrabold text-2xl">Job Screening Module</h2>
    <span class="text-sm">Here's a list of Job screening available!</span>
  </div>

  <ScreeningList :data="jobScreenData" @update="edit" @delete="remove">
    <template #actions>
      <UButton icon="i-lucide-plus" size="sm" variant="solid" @click="toggleModal"
        >Assign Job Screening</UButton
      >
    </template>
  </ScreeningList>
</template>
