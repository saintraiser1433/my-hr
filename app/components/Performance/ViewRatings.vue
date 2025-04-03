<script setup lang="ts">
const config = useRuntimeConfig();
const { $datefns } = useNuxtApp();
const { getRole } = useAuthStore();
const props = defineProps({
  data: {
    type: Array as PropType<EmployeeRating[]>,
    default: () => [],
  },
  peerData: {
    type: Array as PropType<EmployeeRating[]>,
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
  informationData: {
    type: Object as PropType<EmployeeRatingStatus>,
    required: true,
    default: {},
  },
});
const { data, peerData } = toRefs(props);
const openModal = defineModel("open", {
  default: false,
  required: true,
});
const peerResult = inject<EmployeeRating[]>("peer", []);
const teamResult = inject<EmployeeRating[]>("team", []);
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
        class="flex gap-5 py-3 px-2 rounded-md border-l-3 border-(--ui-primary) bg-(--sidebar-background) w-full shadow-lg"
      >
        <div
          class="flex items-center justify-center p-1 ml-5 border-1 bg-(--primary) rounded-full w-42 h-42"
        >
          <NuxtImg
            class="rounded-full"
            :src="`${config.public.STORAGE_URL_AVATAR}/${informationData.photo_path}`"
            quality="100"
          >
          </NuxtImg>
        </div>
        <div
          class="flex flex-1 flex-col items-start justify-center mb-5 font-(family-name:--font-poppins)"
        >
          <h1 class="font-semibold uppercase">{{ informationData.evaluatee }}</h1>
          <h2 class="text-gray-700 dark:text-gray-400 font-semibold capitalize">
            {{ informationData.job }}
          </h2>
          <div class="flex flex-col lg:flex-row mt-6 gap-5">
            <h5 class="font-semibold">Department:</h5>
            <h5 class="capitalize">{{ informationData.department }}</h5>
            <h5 class="font-semibold">Hired date:</h5>
            <h5>
              {{ $datefns.format(new Date(informationData.hiredDate), "dd-MMM-yyyy") }}
            </h5>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-12 gap-3 py-5">
        <div v-if="type === 'Admin' || type === 'Peer'" class="col-span-12">
          <UCard
            v-if="peerData.length > 0"
            :ui="{
              root: 'overflow-hidden border-t-3 border-(--ui-primary) rounded-md ',
              body: 'sm:p-3 p-3',
            }"
          >
            <template #header>
              <div class="flex flex-col justify-center">
                <h3 class="font-semibold">Peer Ratings</h3>
                <h5>Module rating for Peer</h5>
              </div>
            </template>
            <PerformanceSummaryRatings
              v-for="(pdata, index) in peerData"
              :key="index"
              :employee-id="pdata?.employeeId"
              :acad-id="acadId"
              :peer-evaluation-id="pdata.peerEvalId"
              :category-data="pdata.categoryCounts"
              :evaluated-by="pdata?.evaluatedBy"
              :rating="pdata?.rating"
              :comment="pdata?.comment"
              :average-rating="pdata?.summaryRating?.rating"
              :adjective-rating="pdata?.summaryRating?.adjectiveRating"
            />
            <UButton
              v-if="getRole === 'Admin'"
              icon="i-lucide-printer"
              size="lg"
              @click="usePrintPeerResult(peerResult)"
              >Print Result</UButton
            >
          </UCard>
          <div class="flex flex-col justify-center items-center" v-else>
            <svg-icon
              name="vector/empty"
              title="Empty Evaluation"
              width="350px"
              height="350px"
            />
            <h2 class="italic">No peer has evaluated you yet.</h2>
            <USeparator class="py-5"></USeparator>
          </div>
        </div>

        <div v-if="type === 'Admin' || type === 'TeamLead'" class="col-span-12">
          <UCard
            v-if="data.length > 0"
            :ui="{
              root: 'overflow-hidden border-t-3 border-(--ui-primary) rounded-md ',
              body: 'sm:p-3 p-3',
            }"
          >
            <template #header>
              <div class="flex flex-col justify-center">
                <h3 class="font-semibold">Team Lead Ratings</h3>
                <h5>Module rating for Team Lead</h5>
              </div>
            </template>
            <PerformanceSummaryRatings
              v-if="data.length > 0"
              role="teamlead"
              :employee-id="data[0]?.employeeId"
              :acad-id="acadId"
              :category-data="data[0]?.categoryCounts"
              :evaluated-by="data[0]?.evaluatedBy"
              :rating="data[0]?.rating"
              :comment="data[0]?.comment"
              :average-rating="data[0]?.summaryRating?.rating"
              :adjective-rating="data[0]?.summaryRating?.adjectiveRating"
            />
            <UButton
              v-if="getRole === 'Admin'"
              icon="i-lucide-printer"
              size="lg"
              @click="usePrintTeamResult(teamResult)"
              >Print Result</UButton
            >
          </UCard>

          <div class="flex flex-col justify-center items-center" v-else>
            <svg-icon
              name="vector/empty"
              title="Empty Evaluation"
              width="350px"
              height="350px"
            />
            <h2 class="italic">Your Team Lead hasn't evaluated you yet.</h2>
            <USeparator class="py-5"></USeparator>
          </div>
        </div>
      </div>
    </template>

    <template #footer>
      <UButton label="Cancel" variant="outline" size="lg" @click="openModal = false" />
    </template>
  </UModal>
</template>
