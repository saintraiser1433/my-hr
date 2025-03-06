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
const route = useRoute();
const jobScreenData = ref<JobScreeningModel[]>([]);
const screenData = ref<ScreeningModel[]>([]);
const titleName = useState('title', () => localStorage.getItem('title') || 'Unknown module');


//typescreening
const { data: screeningData, error: errorScreening } = await useAPI<ScreeningModel[]>(
  `/screening/f/1`
);
if (screeningData.value) {
  screenData.value = screeningData.value;
}
if (errorScreening.value) {
  $toast.error(errorScreening.value.message || "Failed to fetch items");
}

//jobscreen list
const { data, status, error } = await useAPI<JobScreeningModel[]>(
  `/employees/req/${route.params.empId}`
);
if (data.value) {
  jobScreenData.value = data.value;
}
if (error.value) {
  $toast.error(error.value.message || "Failed to fetch items");
}

const jobScreenRepo = repository<JobScreeningModel[]>($api, "/screening/assign");
const assignData = async (data: ScreeningModel[]) => {
  try {
    const finalData = data.map((item, index) => ({
      job_id: Number(route.params.jobId),
      screening_id: Number(item.id),
      screening_title: item.title ?? "",
      sequence_number: Number(index + 1),
    }));
    const payload = finalData.map(({ screening_title, ...rest }) => rest);

    const response = await jobScreenRepo.add(payload);

    //pushing jobscreendata
    jobScreenData.value = [...jobScreenData.value, ...finalData];
    //pushing screendata
    screenData.value =
      screenData.value?.filter((item) => !data.some((items) => items.id === item.id)) ||
      [];
    $toast.success(response.message);
  } catch (err) {
    return handleApiError(err);
  }
};

const jobScreenRmvRepo = repository<JobScreeningModel[]>(
  $api,
  "/screening/assign/delete"
);
const unAssignJob = (data: number[]) => {
  setAlert("warning", "Are you sure you want to delete?", "", "Confirm delete").then(
    async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await jobScreenRmvRepo.deleteMany(data);
          $toast.success(response.message);

          const removedItems = jobScreenData.value.filter((item) =>
            data.includes(item.id || 0)
          );

          screenData.value =
            screeningData.value?.filter((item) =>
              removedItems.some((removedItem) => removedItem.id === item.id)
            ) || [];

          jobScreenData.value = jobScreenData.value.filter(
            (item) => !data.includes(item.id || 0)
          );
        } catch (error) {
          return handleApiError(error);
        }
      }
    }
  );
};




</script>

<template>
  <div class="flex flex-col items-center lg:items-start mb-3">
    <h2 class="font-extrabold text-2xl capitalize">{{ titleName }}</h2>
    <span class="text-sm">Here's a list assigned screening type for {{ titleName }} !</span>
  </div>

  <EmployeeRequireList :data="jobScreenData" :items="screenData"  @assign="assignData"
    @unAssign="unAssignJob">
  </EmployeeRequireList>
</template>
