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

const ongoingData = ref<OngoingApplicantDetails[]>([]);

const route = useRoute();
const { handleApiError } = useErrorHandler();
const { $api, $toast, $datefns } = useNuxtApp();
const { send } = useSms();
const { templates } = useInterviewResults();
const screenData = ref<ScreeningModel[]>([]);
const { data: ongoing, status: ongoingStatus, error: ongoingError } = await useAPI<
  OngoingApplicantDetails[]
>(`/applicant/ongoing/${route.params.id}`);
if (ongoing.value) {
  ongoingData.value = ongoing.value;
}

const { data: screeningData, error: errorScreening } = await useAPI<ScreeningModel[]>(
  `/screening/f/${ongoing.value?.[0]?.jobId}`
);
if (screeningData.value) {
  screenData.value = screeningData.value;
}
if (errorScreening.value) {
  $toast.error(errorScreening.value.message || "Failed to fetch items");
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

    if (ongoing.value && ongoing.value[0]) {
      await send(
        `Dear ${ongoing.value[0].applicantName},\n\n` +
          `Your ${data.screening} interview for SEAIT School has been scheduled for ` +
          `${$datefns.format(new Date(data.date), "dd MMMM yyyy 'at' hh:mm a")}.\n\n` +
          `Please arrive 10 minutes prior to your scheduled time.\n` +
          `Should you require any assistance, kindly contact our office.\n\n` +
          `Best regards,\n` +
          `SEAIT School Hiring Committee`,
        ongoing.value[0].contactNumber
      );
    }
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
          jobId: ongoing.jobId,
          status:
            ongoing.remarks === ApplicationStatus.PASSED
              ? ApplicationStatus.PASSED
              : ApplicationStatus.FAILED,
        };

        const response = await finalizedRepo.update(data);
        $toast.success(response.message);

        if (ongoing.remarks === ApplicationStatus.PASSED) {
        }

        if (ongoing.remarks === ApplicationStatus.PASSED) {
          await send(
            templates.passed({
              name: ongoing.applicantName,
              position: ongoing.jobTitle,
              startDate: $datefns.format(new Date(), "MMMM d, yyyy"),
              hrContact: "hr-team@seait.edu",
            }),
            ongoing.contactNumber
          );
        } else {
          await send(
            templates.failed({
              name: ongoing.applicantName,
              position: ongoing.jobTitle,
              feedback: "We suggest strengthening your technical demonstration skills",
            }),
            ongoing.contactNumber
          );
        }
        await navigateTo({ path: "/applicants" });
      } catch (error) {
        return handleApiError(error);
      }
    }
  });
};
</script>

<template>
  <ApplicantsProgressHeader :ongoingData="ongoingData"/> 
  <UCard
    :ui="{
      root: 'border-b-3 border-(--ui-primary) rounded-md',
    }"
  >
    <ApplicantsProgress
      :items="screeningData"
      @data-status="updateStatus"
      @data-date="updateTime"
      :data="ongoingData[0]?.progressList"
    />
  </UCard>

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
