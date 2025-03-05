<script setup lang="ts">
const ongoingData = ref<OngoingApplicantDetails[]>([]);
const config = useRuntimeConfig();
const route = useRoute();
const { handleApiError } = useErrorHandler();
const { $api, $datefns, $toast } = useNuxtApp();
const { data: ongoing, status: ongoingStatus, error: ongoingError } = await useAPI<OngoingApplicantDetails[]>(`/applicant/ongoing/${route.params.id}`);
if (ongoing.value) {
  ongoingData.value = ongoing.value;
}

const dateFormat = computed(() => {
  const dateStr = ongoingData.value?.[0]?.appliedDate;
  return dateStr ? $datefns.format(new Date(dateStr), "dd-MMM-yyyy") : "N/A";
});
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

    // Update progress list statuses
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

    const allPassed = firstOngoingData.progressList?.every(
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

    $toast.success(response.message);
  } catch (err: any) {
    $toast.error(err.data?.details || "An error occurred");
  }
};


const finalizedRepo = repository<InterviewStatus>($api, "/applicant/finalize");
const finalizeApplicant = () => {
  setAlert("warning", "Are you sure to finalize this application?", "", "Confirm finalize").then(
    async (result) => {
      if (result.isConfirmed) {
        try {

          const ongoing = ongoingData.value?.[0];
          if (!ongoing) return;
          const data = {
            id: ongoing.id,
            status: ongoing.remarks === ApplicationStatus.PASSED
              ? ApplicationStatus.PASSED
              : ApplicationStatus.FAILED
          };
          const response = await finalizedRepo.update(data);
          $toast.success(response.message);
          await navigateTo({ path: '/applicants' })
        } catch (error) {
          return handleApiError(error);
        }
      }
    }
  );


}



</script>

<template>
  <div class="flex flex-col lg:flex-row items-center gap-5 pb-2">
    <div class="flex items-center justify-center p-1 ml-5 border-1 bg-(--primary) rounded-full">
      <NuxtImg class="rounded-full" :src="ongoingData[0]?.photo ? `${config.public.STORAGE_URL_AVATAR}/${ongoingData[0].photo}` : '/uploads/default.png'" quality="100"
        height="180" width="180"></NuxtImg>
    </div>
    <div class="flex flex-col items-center lg:items-start gap-1 py-2 w-full">
      <h1 class="font-(family-name:--font-poppins) uppercase font-semibold">
        {{ ongoingData[0]?.applicantName || "Unknown applicant" }}
      </h1>
      <div class="flex items-center gap-2 py-2 lg:pb-2 pt-0">
        <h2>{{ ongoingData[0]?.jobTitle || "Unknown Position" }}</h2>
      </div>
      <div class="grid grid-cols-12 gap-5">
        <div class="col-span-12 lg:col-span-2">
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide:calendar"></UIcon>
            <h4 class="font-semibold">Applied on:</h4>
            <h4>
              {{ dateFormat }}
            </h4>
          </div>
        </div>
        <div class="col-span-12 lg:col-span-2">
          <div class="flex items-center gap-2">
            <UIcon name="i-uil:refresh"></UIcon>
            <h4 class="font-semibold">Current Stage:</h4>
            <h4>Final Interview</h4>
          </div>
        </div>

        <div class="col-span-12 lg:col-span-2">
          <div class="flex items-center gap-2">
            <UIcon name="i-raphael:arrowright"></UIcon>
            <h4 class="font-semibold">Next Step:</h4>
            <h4>HR Review</h4>
          </div>
        </div>
        <div class="col-span-12 lg:col-span-3">
          <div class="flex items-center gap-2">
            <UIcon name="i-fluent:next-48-regular"></UIcon>
            <h4 class="font-semibold">Next Scheduled:</h4>
            <h4>Jan 10,2025</h4>
          </div>
        </div>
        <div class="col-span-12 lg:col-span-2">
          <div class="flex items-center gap-2 w-full">
            <UIcon name="i-ic:round-alternate-email"></UIcon>
            <h4 class="font-semibold">Email:</h4>
            <h4>{{ ongoingData[0]?.email || "Unknown email" }}</h4>
          </div>
        </div>
        <div class="col-span-12 lg:col-span-2">
          <div class="flex items-center gap-2 w-full">
            <UIcon name="i-hugeicons:contact"></UIcon>
            <h4 class="font-semibold">Contact:</h4>
            <h4>{{ ongoingData[0]?.contactNumber || "Unknown contact number" }}</h4>
          </div>
        </div>

        <div class="col-span-12 lg:col-span-2">
          <div class="flex items-center gap-2 w-full">
            <UIcon name="i-fluent:person-info-16-regular"></UIcon>
            <h4 class="font-semibold">Resume:</h4>
            <a :href="`${config.public.STORAGE_URL_RESUME}/${ongoingData[0]?.resume}`"><u>Click to view resume</u></a>
          </div>
        </div>
        <div class="col-span-12 w-60 lg:w-full lg:col-span-2">
          <div class="flex items-center gap-2">
            <UIcon name="i-mdi:google-analytics"></UIcon>
            <h4 class="font-semibold">Progression:</h4>
            <UProgress animation="carousel" size="lg" :model-value="ongoingData[0]?.countApplicantScreening || 0"
              :max="ongoingData[0]?.countJobScreening || 1" />
          </div>
        </div>
        <div class="col-span-12 lg:col-span-3">
          <div class="flex items-center gap-2 w-full">
            <UBadge variant="solid">({{ ongoingData[0]?.countApplicantScreening }} OUT OF
              {{ ongoingData[0]?.countJobScreening || 0 }} Screening Completed)</UBadge>
          </div>
        </div>
        <div class="col-span-12 lg:col-span-2">
          <div class="flex items-center gap-2 w-full">
            <UIcon name="i-material-symbols:info-outline"></UIcon>
            <h4 class="font-semibold">Remarks:</h4>
            <UBadge variant="subtle" v-if="ongoingData[0]?.remarks === 'ONGOING'">{{ ongoingData[0]?.remarks }}</UBadge>
            <UBadge variant="solid" color="error" v-else-if="ongoingData[0]?.remarks === 'FAILED'">{{
              ongoingData[0]?.remarks }}</UBadge>
            <UBadge variant="solid" v-else-if="ongoingData[0]?.remarks === 'PASSED'">{{ ongoingData[0]?.remarks }}
            </UBadge>
          </div>
        </div>
      </div>
    </div>
  </div>

  <USeparator class="pb-2"></USeparator>

  <ApplicantsProgress @data-status="updateStatus" @data-date="updateTime" :data="ongoingData[0]?.progressList">
  </ApplicantsProgress>


  <div class="flex justify-end items-center mt-2 gap-2">
    <UButton v-if="ongoingData[0]?.remarks === 'FAILED' || ongoingData[0]?.remarks === 'PASSED'" size="md"
      variant="solid" color="success" @click="finalizeApplicant">
      FINALIZE APPLICANT</UButton>
  </div>
</template>
