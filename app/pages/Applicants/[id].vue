<script setup lang="ts">
const ongoingData = ref<ApplicantModel[]>([]);
const progressVal = ref(1);
const config = useRuntimeConfig();
const { data: ongoing, status: ongoingStatus, error: ongoingError } = await useAPI<
  ApplicantModel[]
>("/applicant/pending");
if (ongoing.value) {
  ongoingData.value = ongoing.value;
}
</script>

<template>
  <div class="flex items-center gap-5 pb-2">
    <div
      class="flex items-center justify-center p-1 ml-5 border-1 bg-(--primary) rounded-full"
    >
      <NuxtImg
        class="rounded-full"
        src="profile.jpg"
        quality="100"
        height="140"
        width="140"
      ></NuxtImg>
    </div>
    <div class="flex flex-col gap-1 py-2 w-full">
      <h1 class="font-(family-name:--font-poppins) uppercase font-semibold">
        JOHN REY N. DECOSTA
      </h1>
      <div class="flex items-center gap-2">
        <h3 class="font-semibold">Position Applied:</h3>
        <h3>Project Technical Assistant</h3>
      </div>
      <div class="grid grid-cols-12 gap-2 lg:mt-2">
        <div class="col-span-12 lg:col-span-3">
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide:calendar"></UIcon>
            <h4 class="font-semibold">Applied on:</h4>
            <h4>Jan 10, 2025</h4>
          </div>
        </div>
        <div class="col-span-12 lg:col-span-3">
          <div class="flex items-center gap-2">
            <UIcon name="i-uil:refresh"></UIcon>
            <h4 class="font-semibold">Current Stage:</h4>
            <h4>Final Interview</h4>
          </div>
        </div>

        <div class="col-span-12 lg:col-span-3">
          <div class="flex items-center gap-2">
            <UIcon name="i-raphael:arrowright"></UIcon>
            <h4 class="font-semibold">Next Step:</h4>
            <h4>HR Review</h4>
          </div>
        </div>
        <div class="col-span-12 lg:col-span-3">
          <div class="flex items-center gap-2">
            <UIcon name="i-ph:calendar"></UIcon>
            <h4 class="font-semibold">Next Scheduled:</h4>
            <h4>Jan 10,2025</h4>
          </div>
        </div>
        <div class="col-span-12 lg:col-span-2">
          <div class="flex items-center gap-2">
            <UIcon name="i-octicon:graph-16"></UIcon>
            <h4 class="font-semibold">Progression:</h4>
            <UProgress animation="carousel" size="lg" v-model="progressVal" :max="2" />
          </div>
        </div>
        <div class="col-span-12 lg:col-span-2">
          <div class="flex items-center gap-2 w-full">
            <UBadge variant="solid">(1 OUT OF 2 Screening Completed)</UBadge>
          </div>
        </div>
        <div class="col-span-12 lg:col-span-4">
          <div class="flex items-center gap-2 w-full">
            <UIcon name="i-lucide-book"></UIcon>
            <h4 class="font-semibold">Resume:</h4>
            <a :href="`${config.public.STORAGE_URL_RESUME}/1.pdf`"
              ><u>Click to view resume</u></a
            >
          </div>
        </div>
      </div>
    </div>
  </div>

  <div>
    <!-- <div class="flex flex-col">
                <h3 class="font-(family-name:--font-poppins) uppercase font-semibold">PROGRESSIONS</h3>
                <h3>2 out of 5</h3>
            </div> -->
  </div>

  <USeparator class="pb-2"></USeparator>

  <ApplicantsProgress :data="ongoingData"> </ApplicantsProgress>
</template>
