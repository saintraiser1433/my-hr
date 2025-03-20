<script setup lang="ts">
const { $echarts, $joi } = useNuxtApp();
const config = useRuntimeConfig();

const props = defineProps({
  data: {
    type: Array as PropType<EmployeeRating[]>,
    required: true,
    default: () => [],
  },
  title: {
    type: String,
    required: true,
    default: "",
  },

  description: {
    type: String,
    required: true,
    default: "",
  },
  acadId: {
    type: Number,
    required: true,
    default: 0,
  },
  type: {
    type: String,
    default: "Admin",
  },
});
const { data } = toRefs(props);
const openModal = defineModel("open", { default: false, required: true });
const { optionCategory } = usePerformance(data);
const fullname = "Decosta John Rey";
const information = "Software Developer";
const department = "College of Information Technology";
const hiredData = "01-Jan-2024";
</script>

<template>
  <UModal
    v-model:open="openModal"
    :description="description"
    :title="title"
    :ui="{ content: 'max-w-8xl' }"
  >
    <template #body>
      <div
        class="flex gap-5 py-3 px-2 rounded-md border-b-3 border-(--ui-primary) bg-(--sidebar-background) w-full shadow-lg"
      >
        <div
          class="flex items-center justify-center p-1 ml-5 border-1 bg-(--primary) rounded-full w-42 h-42"
        >
          <NuxtImg
            class="rounded-full"
            :src="`${config.public.STORAGE_URL_AVATAR}/profile2.jpg`"
            quality="100"
          >
          </NuxtImg>
        </div>
        <div
          class="flex flex-1 flex-col items-start justify-center mb-5 font-(family-name:--font-poppins)"
        >
          <h1 class="font-semibold uppercase">{{ fullname }}</h1>
          <h2 class="text-gray-700 dark:text-gray-400 font-semibold capitalize">
            {{ information }}
          </h2>
          <div class="flex flex-col lg:flex-row mt-6 gap-5">
            <h5 class="font-semibold lg:ml-2">Head:</h5>
            <h5>Cyrus P. Teo</h5>
            <h5 class="font-semibold lg:ml-2">Department:</h5>
            <h5 class="capitalize">{{ department }}</h5>
            <h5 class="font-semibold">Hired date:</h5>
            <h5>
              {{ hiredData }}
            </h5>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-12 gap-3 py-5">
        <div
          v-if="type === 'Admin' || type === 'Peer'"
          :class="[type === 'Admin' ? 'col-span-6' : 'col-span-12']"
        >
          <UCard
            :ui="{
              root: 'overflow-hidden border-t-3 border-(--ui-primary) ',
            }"
          >
            <template #header>
              <div class="flex flex-col justify-center">
                <h3 class="font-semibold">Peer to Peer Evaluation</h3>
                <h5>Module rating for peer to peer</h5>
              </div>
            </template>
            <div class="mb-5">
              <h3 class="font-semibold">
                Evaluated by: <span class="font-normal">Anjelly Fusingan</span>
              </h3>
            </div>
            <div class="grid grid-cols-12 gap-5">
              <div class="col-span-6">
                <PerformanceCategorizeCard />
              </div>
              <div class="col-span-6">
                <PerformanceCategorizeCard />
              </div>
            </div>
            <UCard
              :ui="{
                root: 'overflow-hidden my-5',
                body: 'p-0 sm:p-0',
                footer: 'p-0 sm:px-0',
              }"
            >
              <div class="flex items-center justify-center py-2">
                <h2 class="font-semibold">Category Scores {{ acadId }}</h2>
              </div>
              <div class="py-2 w-full h-[400px] relative">
                <ClientOnly>
                  <!-- <VChart
                    ref="chart"
                    :option="option"
                    class="w-full h-full"
                    :auto-resize="true"
                    @native:mouseenter="showToolbox()"
                    @globalout="hideToolbox()"
                  /> -->
                </ClientOnly>
              </div>
            </UCard>
            <!-- <PerformanceActions></PerformanceActions> -->
          </UCard>
        </div>
        <div
          v-if="type === 'Admin' || type === 'TeamLead'"
          :class="[type === 'Admin' ? 'col-span-6' : 'col-span-12']"
        >
          <PerformanceSummaryRatings
            :employee-id="data[0]?.employeeId"
            :acad-id="acadId"
            :evaluated-by="data[0]?.evaluatedBy"
            :option="optionCategory"
            :rating="data[0]?.rating"
            :comment="data[0]?.comment"
            :average-rating="data[0]?.summaryRating?.rating"
            :adjective-rating="data[0]?.summaryRating?.adjectiveRating"
            title="Team Lead Ratings"
            subtitle="Module rating for teamlead"
          ></PerformanceSummaryRatings>
        </div>
      </div>
    </template>

    <template #footer>
      <UButton label="Cancel" variant="outline" size="lg" @click="openModal = false" />
    </template>
  </UModal>
</template>
