<script setup lang="ts">
definePageMeta({
  requiredRole: "Admin",
});

function random() {
  return Math.round(300 + Math.random() * 700) / 10;
}
const data = ref([
  {
    Category: "Project Consultant",
    count: random(),
  },
  {
    Category: "IT Specialist",
    count: random(),
  },
  {
    Category: "Software Developer",
    count: random(),
  },
  {
    Category: "Teacher 1",
    count: random(),
  },
  {
    Category: "Teacher 2",
    count: random(),
  },
  {
    Category: "Teacher 3",
    count: random(),
  },
]);

const dataPie = ref<ChartModel[]>([
  {
    name: "Project Consultant",
    value: random(),
  },
  {
    name: "IT Specialist",
    value: random(),
  },
  {
    name: "Software Developer",
    value: random(),
  },
  {
    name: "Teacher 1",
    value: random(),
  },
  {
    name: "Teacher 2",
    value: random(),
  },
  {
    name: "Teacher 3",
    value: random(),
  },
]);

const { optionCategory } = useStackedBar(data);

const { optionPie } = usePieChart();
const { optionBarChart } = useBarChart();

const pieChartData = optionPie(dataPie);
const barData = optionBarChart(dataPie);
</script>
<template>
  <div class="flex flex-col items-center lg:items-start mb-3">
    <h2 class="font-extrabold text-2xl capitalize">My Analytical Dashbaord</h2>
    <span class="text-sm">Analytical dashboard base on results ! </span>
  </div>
  <div class="grid grid-cols-12 gap-2">
    <div class="col-span-12 lg:col-span-8">
      <UCard
        :ui="{
          header: 'p-0 px-2 py-2 sm:p-0 sm:px-2 sm:py-2',
          root: 'border-b-3 border-(--ui-primary) rounded-md',
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-semibold">Recruitment Reference Analytics</h3>
              <span class="italic text-xs"
                >Analyzing Recruitment References for Smarter Hiring</span
              >
            </div>
            <svg-icon name="iconx/job" width="32" height="32"></svg-icon>
          </div>
        </template>
        <!--  :option="optionCategory" -->
        <div class="w-full h-[400px] relative">
          <VChart
            ref="chart"
            :option="barData"
            class="w-full h-full"
            :auto-resize="true"
          />
        </div>
      </UCard>
    </div>
    <div class="col-span-12 lg:col-span-4">
      <UCard
        :ui="{
          header: 'p-0 px-2 py-2 sm:p-0 sm:px-2 sm:py-2',
          root: 'border-b-3 border-(--ui-primary) rounded-md',
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-semibold">Trending Job to Apply</h3>
              <span class="italic text-xs"
                >Analyzing Recruitment References for Smarter Hiring</span
              >
            </div>
            <svg-icon name="iconx/trend" width="32" height="32"></svg-icon>
          </div>
        </template>
        <div class="w-full h-[400px] relative">
          <VChart
            ref="chart"
            :option="pieChartData"
            class="w-full h-full"
            :auto-resize="true"
          />
        </div>
      </UCard>
    </div>
  </div>

  <div class="grid grid-cols-12 gap-2 py-4">
    <div class="col-span-12 md:col-span- lg:col-span-6">
      <DashboardRankings
        title="Top 10 Overall Peer Highest Ranking"
        subtitle="Recognizing Top-Performing Peers in Evaluations"
      />
    </div>
    <div class="col-span-12 md:col-span-6">
      <DashboardRankings
        title="Top 10 Overall Teamlead Highest Ranking"
        subtitle="Top-Ranked Team Leads Results"
      />
    </div>
  </div>
</template>
