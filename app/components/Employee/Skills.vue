<script setup lang="ts">
defineProps({
  skillsData: {
    type: Array as PropType<Skill[]>,
    required: true,
  },
});

const emit = defineEmits(["add-skills"]);
</script>

<template>
  <UCard
    class="w-full my-5"
    :ui="{
      root: 'rounded-lg',
      header: 'border-l-3 rounded-t-lg border-l-(--ui-primary)  p-3 sm:p-3',
      body: 'p-3 sm:p-3',
      footer: 'p-2 sm:p-2',
    }"
  >
    <template #header>
      <div class="flex justify-between items-center">
        <div>
          <h3 class="font-semibold">Skills & Expertise</h3>
          <span class="text-gray-500">Include all your skills</span>
        </div>
      </div>
    </template>
    <div class="flex flex-col">
      <div v-if="skillsData.length === 0" class="text-center font-semibold text-xl">
        No data available kindly click + button
      </div>
      <div
        class="grid grid-cols-12 gap-5 flex-1 p-3 border-1 border-(--border) rounded-sm my-2"
        v-for="(data, index) in skillsData"
        :key="index"
      >
        <UFormField class="col-span-12" label="Skills & Expertise">
          <UITextInput
            class="w-full"
            v-model="data.skills_name"
            placeholder="Company Name"
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
          @click="emit('add-skills')"
        ></UButton>
      </div>
    </template>
  </UCard>
</template>
