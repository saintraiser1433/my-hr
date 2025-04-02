<script setup lang="ts">
const props = defineProps({
  information: {
    type: Object as PropType<PersonalInformation>,
    required: true,
  },
  type: {
    type: Boolean,
    default: true,
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
  <div
    class="flex gap-5 py-3 px-2 bg-(--sidebar-background) w-full shadow-lg border-l-3 border-(--ui-primary) rounded-md"
  >
    <div class="relative p-1 ml-5 border-1 bg-(--primary) rounded-full w-42 h-42">
      <NuxtImg
        class="rounded-full"
        :src="`${config.public.STORAGE_URL_AVATAR}/${information.photo_path}`"
        quality="100"
      ></NuxtImg>
      <UButton
        icon="i-lucide-edit"
        class="absolute right-7 top-5 p-1 rounded-full shadow-lg"
        size="xs"
        variant="soft"
        color="success"
      ></UButton>
    </div>
    <div
      class="flex flex-1 flex-col items-start justify-center mb-5 font-(family-name:--font-poppins)"
    >
      <h1 class="font-semibold uppercase">{{ fullname }}</h1>
      <h2 class="text-gray-700 dark:text-gray-400 font-semibold capitalize">
        {{ information.jobTitle }}
      </h2>
      <div class="flex flex-col lg:flex-row mt-6 gap-5">
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
      <div v-if="type">
        <USeparator class="py-2 w-full col-span-12"></USeparator>
        <div class="flex items-center justify-between gap-5">
          <USwitch
            v-if="store.getRole === 'Admin'"
            v-model="statusModel"
             size="sm"
            label="Active Status"
          />
          <UButton
            icon="i-lucide-check"
            variant="solid"
            color="success"
            size="xs"
            @click="emit('submit')"
            >Save</UButton
          >
        </div>
      </div>
    </div>
  </div>
</template>
