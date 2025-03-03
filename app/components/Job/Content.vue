<script setup lang="ts">
defineProps({
  data: {
    type: Object as PropType<Omit<JobModel, "requirements">>,
    required: true,
    default: () => {},
  },
});

const config = useRuntimeConfig();

const openModal = defineModel("open", { default: false, required: true });
</script>

<template>
  <UModal
    v-model:open="openModal"
    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, totam architecto! Provident tempore porro ipsa!"
    title="View Content"
    :ui="{ content: 'max-w-6xl' }"
  >
    <template #body>
      <div class="flex flex-col flex-wrap gap-2">
        <h1 class="font-semibold">Job Title: {{ data.title }}</h1>
        <NuxtImg
          :src="`${config.public.STORAGE_URL_JOB}/${data.headerImage}`"
          quality="100"
        ></NuxtImg>
        <USeparator />
        <div class="custom-scrollbar" v-html="data.description"></div>
      </div>
    </template>

    <template #footer>
      <UButton
        label="Cancel"
        color="neutral"
        variant="outline"
        @click="openModal = false"
      />
    </template>
  </UModal>
</template>
