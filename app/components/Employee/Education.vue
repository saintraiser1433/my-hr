<script setup lang="ts">
defineProps({
  educData: {
    type: Array as PropType<Education[]>,
    required: true,
  },
  year: {
    type: Array as PropType<string[]>,
    required: true,
  },
});

const emit = defineEmits(["add-educ"]);
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
          <h3 class="font-semibold">Education Attainment</h3>
          <span class="text-gray-500">Include all college or university degrees</span>
        </div>
      </div>
    </template>
    <div class="flex flex-col">
      <div v-if="educData.length === 0" class="text-center font-semibold text-xl">
        No data available kindly click + button
      </div>
      <div
        class="grid grid-cols-12 gap-5 flex-1 p-3 border border-(--border) rounded-sm my-2"
        v-for="(data, index) in educData"
        :key="index"
      >
        <div v-if="educData.length == 0">dasdasukjdhjk</div>
        <UFormField class="col-span-6 lg:col-span-5" label="Name of the School">
          <UITextInput
            class="w-full"
            placeholder="School Name"
            v-model="data.school_name"
          />
        </UFormField>
        <UFormField class="col-span-6 lg:col-span-3" label="Degree">
          <UITextInput
            class="w-full"
            placeholder="Enter your degree"
            v-model="data.degree"
          />
        </UFormField>
        <UFormField class="col-span-3 lg:col-span-1" label="Year Started">
          <USelectMenu
            v-model="data.year_started"
            :items="year"
            class="w-full"
            placeholder="Started"
          />
        </UFormField>
        <UFormField class="col-span-3 lg:col-span-1" label="Year End">
          <USelectMenu
            v-model="data.year_ended"
            :items="year"
            class="w-full"
            placeholder="End"
          />
        </UFormField>
        <UFormField class="col-span-6 lg:col-span-2" label="Description">
          <USelectMenu
            v-model="data.description"
            :items="DESCRIPTION_ITEM"
            class="w-full"
            placeholder="Description"
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
          @click="emit('add-educ')"
        ></UButton>
      </div>
    </template>
  </UCard>
</template>
