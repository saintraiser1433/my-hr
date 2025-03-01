<script setup lang="ts">
definePageMeta({
  requiredRole: "admin",
});

useSeoMeta({
  title: "SUPERHURE Requirements Module",
  description: "CRUD for Requirements",
  ogTitle: "SUPERHURE Requirements Module",
  ogDescription: "CRUD for Requirements",
});

const { $api, $toast } = useNuxtApp();
const { handleApiError } = useErrorHandler();
const { openModal, updateModal, resetModal, isOpen, isUpdate, title } = useCustomModal();

const initialState = {
  id: undefined,
  title: undefined,
  description: undefined,
  totalAvailable: undefined,
  departmentsId: undefined,
  requirements: [],
  status: undefined,
};
const jobForm = reactive<JobModel>({ ...initialState });
const jobData = ref<JobModel[]>([]);
const viewedJob = ref<Omit<JobModel, "requirements">>({});
const isViewing = ref(false);
const jobRepo = repository<JobModel>($api, "/job");
const { data: department, status: statusDept, error: errorDept } = await useAPI<
  DepartmentModel[]
>("/department", {
  transform: (item) => {
    return item
      .filter((item) => item.status)
      .map((items) => ({
        ...items,
      }));
  },
  server: false,
});

const { data, status, error } = await useAPI<JobModel[]>("/job", {
  transform: (item) => {
    return item.map((item) => ({
      ...item,
      departmentTitle: item.department?.title,
    }));
  },
  server: false,
});
if (data.value) {
  jobData.value = data.value;
}
if (error.value) {
  $toast.error(error.value.message || "Failed to fetch items");
}

if (errorDept.value) {
  $toast.error(errorDept.value.message || "Failed to fetch items");
}

const submit = async (response: JobModel) => {
  try {
    const { file, ...finalData } = response;

    if (!isUpdate.value) {
      const res = await jobRepo.addWithImage(finalData, file);
      jobData.value = [...jobData.value, res.data as JobModel];
      $toast.success(res.message);
    } else {
      const res = await jobRepo.updateWithImage(finalData, file);
      if (res.data) {
        const data = res.data as JobModel;
        jobData.value = jobData.value.map((item) => (item.id === data.id ? data : item));
      }
      $toast.success(res.message);
    }
    resetModal();
  } catch (error) {
    return handleApiError(error);
  }
};

const edit = (response: JobModel) => {
  isViewing.value = false;
  jobForm.id = response.id;
  jobForm.description = response.description;
  jobForm.title = response.title;
  jobForm.totalAvailable = response.totalAvailable;
  jobForm.departmentsId = response.departmentsId;
  jobForm.status = response.status;
  const transformData = response.requirements.map((item) => ({
    id: item.id,
    label: item.title
  }))
  jobForm.requirements = transformData;
  updateModal(`${response.title}`);
};

const view = (response: JobModel) => {
  isViewing.value = true;
  viewedJob.value = { ...response };
};

const remove = (id: number) => {
  setAlert("warning", "Are you sure you want to delete?", "", "Confirm delete").then(
    async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await jobRepo.delete(id);
          jobData.value = jobData.value.filter((item) => item.id !== id);
          $toast.success(response.message);
        } catch (error) {
          return handleApiError(error);
        }
      }
    }
  );
};

const resetForm = () => {
  Object.assign(jobForm, initialState);
};
const toggleModal = () => {
  resetForm();
  openModal(`Create Job Offer`);
};
</script>

<template>
  <JobContent v-model:open="isViewing" :data="viewedJob"></JobContent>

  <JobForm @data-job="submit" :department="department" v-model:state="jobForm" :is-update="isUpdate" :title="title"
    v-model:open="isOpen" />
  <div class="flex flex-col items-center lg:items-start mb-3">
    <h2 class="font-extrabold text-2xl">Job Offers Module</h2>
    <span class="text-sm">Here's a list of Job offers !</span>
  </div>
  <JobList :data="jobData" @update="edit" @delete="remove" @view="view">
    <template #actions>
      <UButton icon="i-lucide-plus" size="sm" variant="solid" @click="toggleModal">Add Job Offer</UButton>
    </template>
  </JobList>
</template>
