<script setup lang="ts">
definePageMeta({
  requiredRole: "Admin",
});

const {$toast} = useNuxtApp();
const {vAcadId,vSemester,vActiveYear} = useAcademicYearStore();

const peerValue = ref(0)
const teamLeadValue = ref(0)
const { optionPie } = usePieChart();
const {optionStackedBar} = useStackedBarChartv2()
const { optionBarChart } = useBarChart();
const peerDepartment = computed(() => optionBarChart(peerRankingsByDept).value);
const teamDepartment = computed(() => optionBarChart(teamRankingByDept).value);
const recruitmentData = computed(() => recruitment.value || []);
const jobData = computed(() => topJob.value || []);
const subtitle = computed(() => `For academic year ${vActiveYear} - ${vSemester === 1 ? 'First Sem' : 'Second Sem'}`)


const departmentItem = computed(() => department.value?.map((item) => ({
  id:item.id,
  label:item.title
})) || [])

const peerRankingsByDept = computed<ChartModel[]>(() => {
  return (topPeerHighestRanking.value || [])
    .filter(employee => employee.departmentId === peerValue.value)
    .map(({ name, averageRating }) => ({ 
      name, 
      value: averageRating 
    }));
});

const teamRankingByDept = computed<ChartModel[]>(() => {
  return (topTLHighestRanking.value || [])
    .filter(employee => employee.departmentId === teamLeadValue.value)
    .map(({ name, averageRating }) => ({ 
      name, 
      value: averageRating 
    }));
});

const {data:summary,error:errorSummary} = await useAPI<SummaryModel>('/summary'); 
const {data:recruitment,error:errorRecruitment} = await useAPI<any[]>('/applicant/countjob'); 
const {data:department,error:errorDepartment} = await useAPI<DepartmentModel[]>('/department'); 
const {data:topJob,error:errorJob} = await useAPI<ChartModel[]>('/applicant/topjob'); 


const { data: topPeerHighestRanking, error: topPeerError } = await useAPI<any[]>('/evaluation/peerResult', {
  params: {
    acadId:vAcadId
  },
  transform: (data) => {
    const employeeRatings = data.reduce((acc, item) => {
      if (!acc[item.employeeId]) {
        acc[item.employeeId] = {
          name: item.name,
          departmentId:item.departmentId,
          departmentName:item.departmentName,
          photo_path:item.photo_path,
          totalRating: 0,
          count: 0
        };
      }
      acc[item.employeeId].totalRating += item.summaryRating.rating;
      acc[item.employeeId].count++;
      return acc;
    }, {});
    return Object.values(employeeRatings).map((employee: any) => ({
      name: employee.name,
      departmentId:employee.departmentId,
      departmentName:employee.departmentName,
      photo_path:employee.photo_path,
      averageRating: parseFloat((employee.totalRating / employee.count).toFixed(2))
    })).sort((a, b) => b.averageRating - a.averageRating); // Sort descending
  }
});

const { data: topTLHighestRanking, error: topTLError } = await useAPI<any[]>('/evaluation/teamResult', {
  params: {
    acadId:vAcadId
  },
  transform: (data) => {
    const employeeRatings = data.reduce((acc, item) => {
      if (!acc[item.employeeId]) {
        acc[item.employeeId] = {
          name: item.name,
          departmentId:item.departmentId,
          departmentName:item.departmentName,
          photo_path:item.photo_path,
          totalRating: item.summaryRating.rating,
        };
      }
      return acc;
    }, {});

    return Object.values(employeeRatings).map((employee: any) => ({
      name: employee.name,
      departmentId:employee.departmentId,
      departmentName:employee.departmentName,
      photo_path:employee.photo_path,
      averageRating: parseFloat(employee.totalRating.toFixed(2))
    })).sort((a, b) => b.averageRating - a.averageRating); 
  }
});

if(errorRecruitment.value){
  $toast.error(errorRecruitment.value || 'An error occured');
}
if(errorRecruitment.value){
  $toast.error(errorJob.value || 'An error occured');
}
if(topPeerError.value){
  $toast.error(topPeerError.value || 'An error occured');
}
if(topTLError.value){
  $toast.error(topTLError.value || 'An error occured');
}

if(errorDepartment.value){
  $toast.error(errorDepartment.value || 'An error occured');
}
if(errorSummary.value){
  $toast.error(errorSummary.value || 'An error occured');
}



const stackedBarData = optionStackedBar(recruitmentData)
const pieChartData = optionPie(jobData);


</script>
<template>

  <div class="flex flex-col items-center lg:items-start mb-3">
    <h2 class="font-extrabold text-2xl capitalize">My Analytical Dashboard</h2>
    <span class="text-sm italic">{{subtitle}}</span>
  </div>
  <div class="grid grid-cols-12 gap-3 py-4">
    <div class="col-span-12 lg:col-span-3">
      <DashboardSummaryBar :total="summary?.applicantsCount" title="Total Applicants">
        <template #icon>
          <svg-icon name="iconx/apply" width="42" height="42"></svg-icon>
        </template>
       
      </DashboardSummaryBar>
    </div> 
    <div class="col-span-12 lg:col-span-3">
      <DashboardSummaryBar :total="summary?.employeesCount" title="Total Employees">
        <template #icon>
          <svg-icon name="iconx/employee" width="42" height="42"></svg-icon>
        </template>
       
      </DashboardSummaryBar>
    </div>
    <div class="col-span-12 lg:col-span-3">
      <DashboardSummaryBar :total="summary?.jobsCount" title="Total Jobs">
        <template #icon>
          <svg-icon name="iconx/jobs" width="42" height="42"></svg-icon>
        </template>
       
      </DashboardSummaryBar>
    </div>
    <div class="col-span-12 lg:col-span-3">
      <DashboardSummaryBar :total="summary?.departmentsCount" title="Total Departments">
        <template #icon>
          <svg-icon name="iconx/association" width="42" height="42"></svg-icon>
        </template>
       
      </DashboardSummaryBar>
    </div>
  </div>
  <div class="grid grid-cols-12 gap-2">
    <div class="col-span-12 lg:col-span-8">
      <DashboardRecruitmentAnalytics title="Recruitment Reference Analytics" description="Analyzing Recruitment References for Smarter Hiring" :data="stackedBarData">
        <template #icon><svg-icon name="iconx/job" width="32" height="32"></svg-icon></template> 
      </DashboardRecruitmentAnalytics>
    </div>
    <div class="col-span-12 lg:col-span-4">
      <DashboardRecruitmentAnalytics title="Trending Job to Apply" description="Analyzing Recruitment References for Smarter Hiring" :data="pieChartData">
        <template #icon> <svg-icon name="iconx/trend" width="32" height="32"></svg-icon></template>  
      </DashboardRecruitmentAnalytics>
    </div>
  </div>

  <div class="grid grid-cols-12 gap-2 py-4">
    <div class="col-span-12  lg:col-span-6">
      <DashboardRankings
        :data="topPeerHighestRanking"
        title="Top 10 Overall Peer Highest Ranking"
        subtitle="Recognizing Top-Performing Peers in Evaluations"
      >
      <template #right>
        <svg-icon name="iconx/peertop" width="32" height="32"></svg-icon>
      </template>
      </DashboardRankings>
    </div>
    <div class="col-span-12 lg:col-span-6">
      <DashboardRankings
        :data="topTLHighestRanking"
        title="Top 10 Overall Teamlead Highest Ranking"
        subtitle="Top-Ranked Team Leads Results"
      >
      <template #right>
        <svg-icon name="iconx/peertop" width="32" height="32"></svg-icon>
      </template>
      </DashboardRankings>
    </div>
  </div>
  <div class="grid grid-cols-12 gap-2">
    <div class="col-span-12 md:col-span- lg:col-span-6">

      <DashboardRecruitmentAnalytics title="Peer Result per Department" description="Recognizing Top-Performing Peers in Evaluations by Department" :data="peerDepartment">
        <template #icon>
          <div class="flex items-center gap-2">
            <span>Department:</span>
            <USelectMenu v-model="peerValue" value-key="id" :ui="{item:'capitalize'}" placeholder="Select Department"  :items="departmentItem" class="w-48" />
          </div>
        </template> 
      </DashboardRecruitmentAnalytics>
    </div>
    <div class="col-span-12 md:col-span-6">
      <DashboardRecruitmentAnalytics  title="Team Lead Result per Department"  description="Top-Ranked Team Leads Results by Department" :data="teamDepartment">
        <template #icon>
          <div class="flex items-center gap-2">
            <span>Department:</span>
            <USelectMenu v-model="teamLeadValue" value-key="id" :ui="{item:'capitalize'}"  placeholder="Select Department"  :items="departmentItem" class="w-48" />
          </div>
        </template> 
      </DashboardRecruitmentAnalytics>

    </div>
  </div>
</template>
