<script lang="ts" setup>
const props = defineProps({
  ongoingData: {
    type: Array as PropType<OngoingApplicantDetails[]>,
    required: true,
    default: () => [],
  },
});

const { $datefns } = useNuxtApp();
const config = useRuntimeConfig();
const { ongoingData } = toRefs(props);
const dateFormat = computed(() => {
  const dateStr = ongoingData.value?.[0]?.appliedDate;
  return dateStr ? $datefns.format(new Date(dateStr), "dd-MMM-yyyy") : "N/A";
});

const nextSchedDate = computed(() => {
  const dateStr = ongoingData.value?.[0]?.nextSched;
  return dateStr ? $datefns.format(new Date(dateStr), "dd-MMM-yyyy") : "TBD";
});
</script>

<template>
  <div class="flex flex-col lg:flex-row items-center gap-5 pb-2">
    <div
      class="flex items-center justify-center p-1 ml-5 border-1 bg-(--primary) rounded-full aspect-square w-[180px] h-[180px] overflow-hidden"
    >
      <NuxtImg
        class="w-full h-full object-cover rounded-full"
        :src="
          ongoingData[0]?.photo
            ? `${config.public.STORAGE_URL_AVATAR}/${ongoingData[0].photo}`
            : '/uploads/default.png'
        "
        quality="100"
        width="180"
        height="180"
        loading="lazy"
      />
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
            <h4 class="capitalize">{{ ongoingData[0]?.currentStage || "N/A" }}</h4>
          </div>
        </div>

        <div class="col-span-12 lg:col-span-2">
          <div class="flex items-center gap-2">
            <UIcon name="i-raphael:arrowright"></UIcon>
            <h4 class="font-semibold">Next Step:</h4>
            <h4 class="capitalize">{{ ongoingData[0]?.nextStep || "N/A" }}</h4>
          </div>
        </div>
        <div class="col-span-12 lg:col-span-3">
          <div class="flex items-center gap-2">
            <UIcon name="i-fluent:next-48-regular"></UIcon>
            <h4 class="font-semibold">Next Scheduled:</h4>
            <h4 class="capitalize">{{ nextSchedDate }}</h4>
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
            <a :href="`${config.public.STORAGE_URL_RESUME}/${ongoingData[0]?.resume}`"
              ><u>Click to view resume</u></a
            >
          </div>
        </div>
        <div class="col-span-12 w-60 lg:w-full lg:col-span-2">
          <div class="flex items-center gap-2">
            <UIcon name="i-mdi:google-analytics"></UIcon>
            <h4 class="font-semibold">Progression:</h4>
            <UProgress
              animation="carousel"
              size="lg"
              :model-value="ongoingData[0]?.countApplicantScreening || 0"
              :max="ongoingData[0]?.countJobScreening || 1"
            />
          </div>
        </div>
        <div class="col-span-12 lg:col-span-3">
          <div class="flex items-center gap-2 w-full">
            <UBadge variant="solid"
              >({{ ongoingData[0]?.countApplicantScreening }} OUT OF
              {{ ongoingData[0]?.countJobScreening || 0 }} Screening Completed)</UBadge
            >
          </div>
        </div>
        <div class="col-span-12 lg:col-span-2">
          <div class="flex items-center gap-2 w-full">
            <UIcon name="i-material-symbols:info-outline"></UIcon>
            <h4 class="font-semibold">Remarks:</h4>
            <UBadge variant="subtle" v-if="ongoingData[0]?.remarks === 'ONGOING'">{{
              ongoingData[0]?.remarks
            }}</UBadge>
            <UBadge
              variant="solid"
              color="error"
              v-else-if="ongoingData[0]?.remarks === 'FAILED'"
              >{{ ongoingData[0]?.remarks }}</UBadge
            >
            <UBadge variant="solid" v-else-if="ongoingData[0]?.remarks === 'PASSED'"
              >{{ ongoingData[0]?.remarks }}
            </UBadge>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
