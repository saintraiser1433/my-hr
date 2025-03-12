<script setup lang="ts">
definePageMeta({
    requiredRole: "Admin",
});
useSeoMeta({
    title: "SUPERHURE Applicants Progress",
    description: "CRUD for Applicants Progress",
    ogTitle: "SUPERHURE Applicants Progress",
    ogDescription: "CRUD for Applicants Progress",
});

defineProps({
  mode: {
    type: String,
  },
});

const ongoingData = ref<OngoingApplicantDetails[]>([]);

const route = useRoute();
const { handleApiError } = useErrorHandler();
const { $api, $toast } = useNuxtApp();
const { data: ongoing, status: ongoingStatus, error: ongoingError } = await useAPI<
  OngoingApplicantDetails[]
>(`/applicant/ongoing/${route.params.id}`);
if (ongoing.value) {
  ongoingData.value = ongoing.value;
}



const IDRepo = repository<InterviewDate>($api, "/interview/date");
const updateTime = async (data: InterviewDate) => {
  try {
    const response = await IDRepo.update(data);
    if (!ongoingData.value?.[0]?.progressList) return;
    ongoingData.value = [
      {
        ...ongoingData.value[0],
        progressList: ongoingData.value[0].progressList.map((item) =>
          item.id === data.id ? { ...item, dateInterview: response.data?.date } : item
        ),
      },
    ];
    $toast.success(response.message);
  } catch (err) {
    return handleApiError(err);
  }
};

const ISRepo = repository<InterviewStatus>($api, "/interview/status");
const updateStatus = async (data: InterviewStatus) => {
  try {
    const response = await ISRepo.update(data);

    if (!ongoingData.value?.[0]?.progressList) return;

    const firstOngoingData = ongoingData.value[0];

    // Update progress list statuses reactively
    firstOngoingData.progressList = firstOngoingData.progressList?.map((item) => {
      if (item.id === data.id) {
        if (item.status === ApplicationStatus.PENDING) {
          if (typeof firstOngoingData.countApplicantScreening === "number") {
            firstOngoingData.countApplicantScreening += 1;
          }
        }
        return { ...item, status: response.data?.status as ApplicationStatus };
      }
      return item;
    });

    // Recalculate currentStage, nextStep, and nextSched
    const sortedProgressList = firstOngoingData.progressList ?? [];

    let currentStage = null;
    let nextStep = null;
    let nextSched = null;

    for (let i = 0; i < sortedProgressList.length; i++) {
      const screening = sortedProgressList[i];

      if (screening?.status === ApplicationStatus.PENDING) {
        if (!currentStage) {
          // First "PENDING" is the current stage
          currentStage = screening.screening.title;
        } else if (!nextStep) {
          // Next "PENDING" is the next step
          nextStep = screening.screening.title;
          nextSched = screening.dateInterview;
          break;
        }
      }
    }

    // Update remarks
    const allPassed = sortedProgressList.every(
      (item) => item.status === ApplicationStatus.PASSED
    );

    if (allPassed) {
      firstOngoingData.remarks = ApplicationStatus.PASSED;
    } else if (response.data?.status == ApplicationStatus.PASSED && !allPassed) {
      firstOngoingData.remarks = ApplicationStatus.ONGOING;
    } else if (response.data?.status == ApplicationStatus.FAILED) {
      firstOngoingData.remarks = ApplicationStatus.FAILED;
    } else {
      firstOngoingData.remarks = ApplicationStatus.ONGOING;
    }

    firstOngoingData.currentStage = currentStage;
    firstOngoingData.nextStep = nextStep;
    firstOngoingData.nextSched = nextSched || null;

    $toast.success(response.message);
  } catch (err: any) {
    $toast.error(err.data?.details || "An error occurred");
  }
};

const finalizedRepo = repository<InterviewStatus>($api, "/applicant/finalize");
const finalizeApplicant = () => {
  setAlert(
    "warning",
    "Are you sure to finalize this application?",
    "",
    "Confirm finalize"
  ).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const ongoing = ongoingData.value?.[0];
        if (!ongoing) return;
        const data = {
          id: ongoing.id,
          status:
            ongoing.remarks === ApplicationStatus.PASSED
              ? ApplicationStatus.PASSED
              : ApplicationStatus.FAILED,
        };
        const response = await finalizedRepo.update(data);
        $toast.success(response.message);
        await navigateTo({ path: "/applicants" });
      } catch (error) {
        return handleApiError(error);
      }
    }
  });
};
</script>

<template>

  <ApplicantsProgressHeader :ongoingData="ongoingData">

  </ApplicantsProgressHeader>
  <USeparator class="pb-2"></USeparator>

  <ApplicantsProgress
    @data-status="updateStatus"
    @data-date="updateTime"
    :data="ongoingData[0]?.progressList"
  >
  </ApplicantsProgress>

  <div class="flex justify-end items-center mt-2 gap-2">
    <UButton
      v-if="ongoingData[0]?.remarks === 'FAILED' || ongoingData[0]?.remarks === 'PASSED'"
      size="md"
      variant="solid"
      color="success"
      @click="finalizeApplicant"
    >
      FINALIZE APPLICANT</UButton
    >
  </div>
</template>
