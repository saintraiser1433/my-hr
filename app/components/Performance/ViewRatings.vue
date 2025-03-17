<script setup lang="ts">


const { $echarts, $joi } = useNuxtApp();
const config = useRuntimeConfig()

defineProps({
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
});

const openModal = defineModel("open", { default: false, required: true });
const fullname = "Decosta John Rey"
const information = "Software Developer"
const department = "College of Information Technology"
const hiredData = "01-Jan-2024"

const chart = useTemplateRef('chart')
const option = shallowRef(getData())
function refreshData() {
  option.value = getData()
}

function hideToolbox() {
  chart.value?.setOption({ toolbox: { show: false } })
}
function showToolbox() {
  chart.value?.setOption({ toolbox: { show: true } })
}
function random() {
  return Math.round(300 + Math.random() * 700) / 10
}
function getData(): ECOption {
  const shadcnDarkColors = [
    '#0a0a0a', // black
    '#1f1f1f', // dark gray
    '#3f3f3f', // medium gray
    '#525252', // lighter gray
    '#737373', // soft gray
  ];

  return {
    animation: true,
    animationEasing: 'elasticIn',
    animationDuration: 100,
    legend: {},

    tooltip: {
      className: 'echarts-tooltip',
    },
    grid: {
      containLabel: true,
      left: '2%',
      right: '2%',
      bottom: '10%',
    },
    toolbox: {
      show: false,
      feature: {
        dataZoom: {},
        saveAsImage: {},
      },
    },
    dataset: {
      dimensions: ['Product', 'Fair', 'Good', 'VeryGood', 'Satisfactory', 'Outstanding'],
      source: [
        {
          Product: 'Performance',
          Fair: random(),
          Good: random(),
          VeryGood: random(),
          Satisfactory: random(),
          Outstanding: random(),
        },
        {
          Product: 'Performance Factor',
          Fair: random(),
          Good: random(),
          VeryGood: random(),
          Satisfactory: random(),
          Outstanding: random(),
        },
        {
          Product: 'Employee Soft Skills',
          Fair: random(),
          Good: random(),
          VeryGood: random(),
          Satisfactory: random(),
          Outstanding: random(),
        },
      ],
    },
    xAxis: { type: 'category' },
    yAxis: {},
    itemStyle: { borderRadius: 5 },
    series: [
      { type: 'bar', itemStyle: { color: shadcnDarkColors[0] } }, // Black
      { type: 'bar', itemStyle: { color: shadcnDarkColors[1] } }, // Dark Gray
      { type: 'bar', itemStyle: { color: shadcnDarkColors[2] } }, // Medium Gray
      { type: 'bar', itemStyle: { color: shadcnDarkColors[3] } }, // Light Gray
      { type: 'bar', itemStyle: { color: shadcnDarkColors[4] } }, // Soft Gray
    ],
  };
}



</script>

<template>
  <UModal v-model:open="openModal" :description="description" :title="title" :ui="{ content: 'max-w-8xl' }">
    <template #body>
      <div class="flex gap-5 py-3 px-2 rounded-md border-b-3 border-(--ui-primary) bg-(--sidebar-background) w-full shadow-lg">
        <div class="flex items-center justify-center p-1 ml-5 border-1 bg-(--primary) rounded-full w-42 h-42">
          <NuxtImg class="rounded-full" :src="`${config.public.STORAGE_URL_AVATAR}/profile2.jpg`" quality="100">
          </NuxtImg>
        </div>
        <div class="flex flex-1 flex-col items-start justify-center mb-5 font-(family-name:--font-poppins)">
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
              {{
                hiredData
              }}
            </h5>
          </div>

        </div>
      </div>
      <div class="grid grid-cols-12 gap-3 py-5">
        <div class="col-span-6">
          <UCard :ui="{
            root: 'overflow-hidden border-t-3 border-(--ui-primary) '
          }">
            <template #header>
              <div class="flex flex-col justify-center">
                <h3 class="font-semibold">Peer to Peer Evaluation</h3>
                <h5>Module rating for peer to peer</h5>
              </div>

            </template>
            <div class="mb-5">
              <h3 class="font-semibold">Evaluated by: <span class="font-normal">Anjelly Fusingan</span></h3>
            </div>
            <div class="grid grid-cols-12 gap-5">

              <div class="col-span-6">
                <PerformanceCategorizeCard/>
              </div>
              <div class="col-span-6">
                <PerformanceCategorizeCard/>
              </div>
            </div>
            <UCard :ui="{
              root: 'overflow-hidden my-5',
              body: 'p-0 sm:p-0',
              footer: 'p-0 sm:px-0',
            }">
              <div class="flex items-center justify-center py-2">
                <h2 class="font-semibold">Category Scores</h2>
              </div>
              <div class="py-2 w-full h-[400px] relative">
                <ClientOnly>
                  <VChart ref="chart" :option="option" class="w-full h-full" :auto-resize="true"
                    @native:mouseenter="showToolbox()" @globalout="hideToolbox()" />
                </ClientOnly>
              </div>

            </UCard>
            <PerformanceActions></PerformanceActions>
          </UCard>
        </div>
        <div class="col-span-6">
          <UCard :ui="{
            root: 'overflow-hidden border-t-3 border-(--ui-primary) '
          }">
            <template #header>
              <div class="flex flex-col justify-center">
                <h3 class="font-semibold">Team Lead Ratings</h3>
                <h5>Module rating for teamlead</h5>
              </div>

            </template>
            <div class="mb-5">
              <h3 class="font-semibold">Evaluated by: <span class="font-normal">Anjelly Fusingan</span></h3>
            </div>
            <div class="grid grid-cols-12 gap-5">

              <div class="col-span-6">
                <PerformanceCategorizeCard/>
              </div>
              <div class="col-span-6">
                <PerformanceCategorizeCard/>
              </div>
            </div>
            <UCard :ui="{
              root: 'overflow-hidden my-5',
              body: 'p-0 sm:p-0',
              footer: 'p-0 sm:px-0',
            }">
              <div class="flex items-center justify-center py-2">
                <h2 class="font-semibold">Category Scores</h2>
              </div>
              <div class="py-2 w-full h-[400px] relative">
                <ClientOnly>
                  <VChart ref="chart" :option="option" class="w-full h-full" :auto-resize="true"
                    @native:mouseenter="showToolbox()" @globalout="hideToolbox()" />
                </ClientOnly>
              </div>

            </UCard>
            <PerformanceActions></PerformanceActions>
          </UCard>
        </div>
      </div>


    </template>

    <template #footer>
      <UButton label="Cancel" variant="outline" size="lg" @click="openModal = false" />


    </template>
  </UModal>
</template>
