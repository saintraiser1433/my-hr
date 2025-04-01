<script setup lang="ts">
import type { PropType } from "vue";

defineProps({
  information: {
    type: Object,
    required: true,
  },
  educData: {
    type: Array as PropType<Education[]>,
    required: true,
  },
  workData: {
    type: Array as PropType<WorkExperience[]>,
    required: true,
  },
  skillsData: {
    type: Array as PropType<Skill[]>,
    required: true,
  },
  referencesData: {
    type: Array as PropType<References[]>,
    required: true,
  },
  year: {
    type: Array as PropType<string[]>,
    required: true,
    default: () => [],
  },
});

const emit = defineEmits(["add-educ", "add-work", "add-skills", "add-references"]);
</script>

<template>
  <div class="flex flex-start">
    <UTabs
      size="lg"
      variant="link"
      :items="TAB_EMP"
      class="mt-2 w-full"
      :ui="{
        list: 'flex-wrap',
      }"
    >
      <template #information="{ item }">
        <EmployeePersonalInfo :information="information" />
        <EmployeeFamilyBackground :information="information" />
      </template>
      <template #education="{ item }">
        <EmployeeEducation
          :educData="educData"
          :year="year"
          @add-educ="emit('add-educ')"
        />
      </template>
      <template #work="{ item }">
        <EmployeeWorkExperience
          :workData="workData"
          :year="year"
          @add-work="emit('add-work')"
        />
      </template>
      <template #skill="{ item }">
        <EmployeeSkills :skillsData="skillsData" @add-skills="emit('add-skills')" />
      </template>
      <template #reference="{ item }">
        <EmployeeReferences
          :referencesData="referencesData"
          @add-references="emit('add-references')"
        />
      </template>
      <template #settings="{ item }">
        <EmployeeAccount :information="information" />
      </template>
    </UTabs>
  </div>
</template>
