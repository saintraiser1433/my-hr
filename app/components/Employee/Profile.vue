<script setup lang="ts">
const props = defineProps({
  information: {
    type: Object as PropType<PersonalInformation>,
    required: true,
  },
});

const { $datefns } = useNuxtApp();
const config = useRuntimeConfig();
const store = useAuthStore();
const { information } = toRefs(props);
const fullname = computed(
  () =>
    information.value.first_name +
    " " +
    information.value.last_name +
    (" " + (information.value.middle_name ? information.value.middle_name[0] : " "))
);

const statusModel = defineModel("status", { default: false });
const emit = defineEmits(["submit"]);
</script>

<template>
  <div class="flex gap-5 py-3 px-2 rounded-md bg-(--sidebar-background) w-full shadow-lg">
    <div
      class="flex items-center justify-center p-1 ml-5 border-1 bg-(--primary) rounded-full w-42 h-42"
    >
      <NuxtImg
        class="rounded-full"
        :src="`${config.public.STORAGE_URL_AVATAR}/${information.photo_path}`"
        quality="100"
      ></NuxtImg>
    </div>
    <div
      class="flex flex-1 flex-col items-start justify-center mb-5 font-(family-name:--font-poppins)"
    >
      <h1 class="font-semibold uppercase">{{ fullname }}</h1>
      <h2 class="text-gray-700 dark:text-gray-400 font-semibold capitalize">
        {{ information.jobTitle }}
      </h2>
      <div class="flex flex-col lg:flex-row mt-6 gap-5">
        <h5 class="font-semibold lg:ml-2">Head:</h5>
        <h5>Cyrus P. Teo</h5>
        <h5 class="font-semibold lg:ml-2">Department:</h5>
        <h5 class="capitalize">{{ information.department }}</h5>
        <h5 class="font-semibold">Hired date:</h5>
        <h5>
          {{
            information.hiredDate
              ? $datefns.format(new Date(information.hiredDate), "dd-MMM-yyyy")
              : "N/A"
          }}
        </h5>
      </div>
      <USeparator class="py-2"></USeparator>
      <div class="flex items-center justify-between gap-5">
        <USwitch v-if="store.getRole === 'Admin'" v-model="statusModel" size="lg" label="Active Status" />
        <UButton
          icon="i-lucide-edit"
          variant="subtle"
          color="success"
          @click="emit('submit')"
          >Save</UButton
        >
      </div>
    </div>
  </div>
</template>
