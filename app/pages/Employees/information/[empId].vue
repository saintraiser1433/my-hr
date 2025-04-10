<script setup lang="ts">
useSeoMeta({
  title: "SUPERHURE Employee Module",
  description: "CRUD for Employee",
  ogTitle: "SUPERHURE Employee Module",
  ogDescription: "CRUD for Employee",
});

const { $api, $toast } = useNuxtApp();
const { getRole } = useAuthStore();
const { handleApiError } = useErrorHandler();
const fileValue = useState<File | null>('employee-image', () => null)
const route = useRoute();
const year = ref<string[]>([]);
const username = ref<string | undefined>('');
const yearsStart = 1900;

for (let i = yearsStart; i <= new Date().getFullYear(); i++) {
  year.value.push(i.toString());
}

  
const educData = ref<Education[]>([
  {
    school_name: "",
    degree: "",
    year_started: "",
    year_ended: "",
    description: "",
  },
]);

const statuses = ref(false);


const information = ref<PersonalInformation>({
  jobTitle: "",
  hiredDate: "",
  department: "",
  first_name: "",
  middle_name: "",
  last_name: "",
  gender: "",
  date_of_birth: "",
  email: "",
  contact_number: "",
  telephone_number: "",
  permanent_address: "",
  current_address: "",
  religion: "",
  citizenship: "",
  language_spoken: "",
  civil_status: "",
  nickname: "",
  fathers_name: "",
  mothers_name: "",
  fathers_occupation: "",
  mothers_occupation: "",
  parents_address: "",
  person_to_be_contact: "",
  photo_path:undefined,
});

const workData = ref<WorkExperience[]>([
  {
    company_name: "",
    job_title: "",
    work_year_started: "",
    work_year_ended: "",
  },
]);

const skillsData = ref<Skill[]>([
  {
    skills_name: "",
  },
]);

const referencesData = ref<References[]>([
  {
    name_of_person: "",
    position: "",
    ref_contact_number: "",
  },
]);

const { data, status, error } = await useAPI<CombinedInformation>(
  `/employees/info/${route.params.empId}`
);
if (data.value) {
  statuses.value = data.value.status;
  information.value = data.value.applicantInfo;
  educData.value = data.value.educData;
  workData.value = data.value.workData;
  skillsData.value = data.value.skillsData;
  referencesData.value = data.value.referencesData;
  username.value = data.value.accountData?.username;
}

const addEduc = () => {
  educData.value.push({
    school_name: "",
    degree: "",
    year_started: "",
    year_ended: "",
    description: "",
  });
};

const addWork = () => {
  workData.value.push({
    company_name: "",
    job_title: "",
    work_year_started: "",
    work_year_ended: "",
  });
};

const addSkills = () => {
  skillsData.value.push({
    skills_name: "",
  });
};

const addReferences = () => {
  referencesData.value.push({
    name_of_person: "",
    position: "",
    ref_contact_number: "",
  });
};

const isDisabled = computed(() => getRole === 'Employee' || getRole === 'TeamLead');

const informationRepo = repository<CombinedInformation>($api, "/employees/info");
const imageEmployeeRepo = repository<CombinedInformation>($api, "/employees/infoImage");
const submitData = async () => {

  try {
    const data = {
      id: Number(route.params.empId),
      status: statuses.value,
      applicantInfo: information.value,
      educData: educData.value,
      workData: workData.value,
      skillsData: skillsData.value,
      referencesData: referencesData.value,
    };
     const response = await informationRepo.update(data);
     if(fileValue.value) {
       await imageEmployeeRepo.updateFileCustom({id: Number(route.params.empId)},fileValue.value,'photo_path');
     }

    $toast.success(response.message);
  } catch (err) {
    return handleApiError(err);
  }
};

provide('username',username.value)
</script>

<template>

  <div class="flex flex-col p-2">
    <EmployeeProfile
      v-model:status="statuses"
      :information="information"
      @submit="submitData"
    />
    <EmployeeTabs
      :information="information"
      :educData="educData"
      :workData="workData"
      :skillsData="skillsData"
      :referencesData="referencesData"
      :year="year"
      :is-disabled="isDisabled"
      @add-educ="addEduc"
      @add-work="addWork"
      @add-skills="addSkills"
      @add-references="addReferences"
    />
  </div>
</template>
