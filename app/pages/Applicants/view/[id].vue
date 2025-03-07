<script setup lang="ts">
const ongoingData = ref<OngoingApplicantDetails[]>([]);
const route = useRoute();
const { data: ongoing, status: ongoingStatus, error: ongoingError } = await useAPI<
  OngoingApplicantDetails[]
>(`/applicant/failapprv/${route.params.id}`);
if (ongoing.value) {
  ongoingData.value = ongoing.value;
}


</script>

<template>
   <ApplicantsProgressHeader :ongoingData="ongoingData"/>
  <USeparator class="pb-2"></USeparator>

  <ApplicantsViewProgress :data="ongoingData[0]?.progressList"> </ApplicantsViewProgress>
</template>
