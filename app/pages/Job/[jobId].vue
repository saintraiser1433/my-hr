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

//typescreening
const { data: screeningData, error: errorScreening } = await useAPI<ScreeningModel[]>(`/screening/f/${route.params.jobId}`);

if (errorScreening.value) {
  $toast.error(errorScreening.value.message || "Failed to fetch items");
}

//jobscreen list
const { data, status, error } = await useAPI<JobScreeningModel[]>("/screening/assign");
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
      screening_title: item.title ?? '',
      sequence_number: Number(index + 1)
    }))
    const payload = finalData.map(({ screening_title, ...rest }) => rest);

    const response = await jobScreenRepo.add(payload);

    //pushing jobscreendata
    jobScreenData.value = [...jobScreenData.value, ...finalData];
    //pushing screendata
    screeningData.value = screeningData.value?.filter(
      (item) => !data.some((items) => items.id === item.id)
    ) || [];
    $toast.success(response.message);
  } catch (err) {
    return handleApiError(err);
  }
};





const unAssignJob = (index: Record<number, number>) => {
  const values = Object.keys(index);
  const itemData = values.map((item) => jobScreenData.value[Number(item)]) as JobScreenDataModel[];

  setAlert("warning", "Are you sure you want to delete?", "", "Confirm delete").then(
    async (result) => {
      if (result.isConfirmed) {
        try {
          // Extract job and screening IDs
          const jobIds = itemData.map((item) => item.job_id || 0);
          const screenIds = itemData.map((item) => item.screening_id || 0);

          // Delete each job-screening association
          await Promise.all(jobIds.map((jobId, i) => jobScreenRepo.deleteTwo(jobId, screenIds[i])));

          // Remove deleted items from jobScreenData
          jobScreenData.value = jobScreenData.value.filter(
            (item) => !itemData.some((data) => data.job_id === item.job_id && data.screening_id === item.screening_id)
          );

          $toast.success("Successfully unassigned job(s)!");
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
    <h2 class="font-extrabold text-2xl">Job Screening Module</h2>
    <span class="text-sm">Here's a list of Job screening available!</span>
  </div>

  <JobAssignList :data="jobScreenData" :items="screeningData" @assign="assignData" @test="unAssignJob">
  </JobAssignList>
</template>
