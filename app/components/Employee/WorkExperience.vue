<script setup lang="ts">
defineProps({
  workData: {
    type: Array as PropType<WorkExperience[]>,
    required: true,
  },
  year: {
    type: Array as PropType<string[]>,
    required: true,
  },
});

const emit = defineEmits(["add-work"]);
</script>

<template>
  <UCard
    class="w-full my-5"
    :ui="{
      root: 'rounded-md',
      header: 'border-l-3 rounded-t-lg border-l-(--ui-primary) p-3 sm:p-3',
      body: 'p-3 sm:p-3',
      footer: 'p-2 sm:p-2',
    }"
  >
    <template #header>
      <div class="flex justify-between items-center">
        <div>
          <h3 class="font-semibold">Work Experiences</h3>
          <span class="text-gray-500">Include all your work experience</span>
        </div>
      </div>
    </template>
    <div class="flex flex-col">
      <div v-if="workData.length === 0" class="text-center font-semibold text-xl">
        No data available kindly click + button
      </div>
      <div
        class="grid grid-cols-12 gap-5 flex-1 p-3 border-1 border-(--border) rounded-sm my-2"
        v-for="(data, index) in workData"
        :key="index"
      >
        <UFormField class="col-span-6 lg:col-span-5" label="Name of the company ">
          <UITextInput
            class="w-full"
            v-model="data.company_name"
            placeholder="Company Name"
          />
        </UFormField>
        <UFormField class="col-span-6 lg:col-span-5" label="Job Title">
          <UITextInput class="w-full" v-model="data.job_title" placeholder="Job Title" />
        </UFormField>
        <UFormField class="col-span-6 lg:col-span-1" label="Year Started">
          <USelectMenu
            v-model="data.work_year_started"
            :items="year"
            class="w-full"
            placeholder="Started"
          />
        </UFormField>
        <UFormField class="col-span-6 lg:col-span-1" label="Year End">
          <USelectMenu
            v-model="data.work_year_ended"
            :items="year"
            class="w-full"
            placeholder="End"
          />
        </UFormField>
      </div>
    </div>
    <template #footer>
      <div class="flex justify-end">
        <UButton
          icon="i-lucide-plus"
          size="md"
          variant="solid"
          @click="emit('add-work')"
        ></UButton>
      </div>
    </template>
  </UCard>
</template>
