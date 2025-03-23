<script setup lang="ts">
definePageMeta({
  requiredRole: "Admin",
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
const titleName = useState(
  "title",
  () => localStorage.getItem("title") || "Unknown module"
);

//typescreening
const { data: screeningData, error: errorScreening } = await useAPI<ScreeningModel[]>(
  `/screening/f/${route.params.jobId}`
);
if (screeningData.value) {
  screenData.value = screeningData.value;
}
if (errorScreening.value) {
  $toast.error(errorScreening.value.message || "Failed to fetch items");
}

//jobscreen list
const { data, status, error } = await useAPI<JobScreeningModel[]>(
  `/screening/assign/${route.params.jobId}`
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
    const payload = data.map((item, index) => ({
      job_id: Number(route.params.jobId),
      screening_id: Number(item.id),
    }));
    const response = await jobScreenRepo.add(payload);
    jobScreenData.value = [
      ...jobScreenData.value,
      ...(response.data as JobScreeningModel[]),
    ];
    screenData.value =
      screenData.value?.filter((item) => !data.some((items) => items.id === item.id)) ||
      [];
    $toast.success(response.message);
  } catch (err) {
    return handleApiError(err);
  }
};

const jobScreenRmvRepo = repository<ScreeningModel[]>($api, "/screening/assign/delete");
const unAssignJob = (data: number[]) => {
  setAlert("warning", "Are you sure you want to delete?", "", "Confirm delete").then(
    async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await jobScreenRmvRepo.deleteMany(data);

          screenData.value = [
            ...screenData.value,
            ...(response.data as ScreeningModel[]),
          ];

          jobScreenData.value = jobScreenData.value.filter(
            (item) => !data.includes(item.id || 0)
          );

          $toast.success(response.message);
        } catch (error) {
          return handleApiError(error);
        }
      }
    }
  );
};

const sequenceRepo = repository<DirectionModel>($api, "/screening/sequence");
const up = async (datas: DirectionModel) => {
  try {
    await sequenceRepo.update(datas);
    // shouldRefetch.value++; // Trigger API re-fetch
    // jobScreenData.value = data.value?.map((item) => item);
  } catch (error) {
    handleApiError(error);
  }
};

const down = async (datas: DirectionModel) => {
  try {
    await sequenceRepo.update(datas);
    // shouldRefetch.value++; // Trigger API re-fetch
    // jobScreenData.value = data.value?.map((item) => item);
  } catch (error) {
    handleApiError(error);
  }
};
</script>

<template>
  <div class="flex flex-col items-center lg:items-start mb-3">
    <h2 class="font-extrabold text-2xl capitalize">{{ titleName }}</h2>
    <span class="text-sm"
      >Here's a list assigned screening type for {{ titleName }} !</span
    >
  </div>
  <UCard
    :ui="{
      root: 'border-b-3 border-(--ui-primary) rounded-md',
    }"
  >
    <JobAssignList
      :data="jobScreenData"
      :items="screenData"
      @up="up"
      @down="down"
      @assign="assignData"
      @unAssign="unAssignJob"
    >
    </JobAssignList>
  </UCard>
</template>
