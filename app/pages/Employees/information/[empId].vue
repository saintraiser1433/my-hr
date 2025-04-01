<script setup lang="ts">
useSeoMeta({
  title: "SUPERHURE Employee Module",
  description: "CRUD for Employee",
  ogTitle: "SUPERHURE Employee Module",
  ogDescription: "CRUD for Employee",
});

const { $api, $toast, $joi } = useNuxtApp();
const { handleApiError } = useErrorHandler();
const route = useRoute();
const year = ref<string[]>([]);
const yearsStart = 1900;
for (let i = yearsStart; i <= new Date().getFullYear(); i++) {
  year.value.push(i.toString());
}

const schema = $joi.object({
  password: $joi.string().min(6).required().messages({
    "any.required": `Department Name is Required`,
    "string.empty": `Department Name is Required`,
  }),
  confirmPassword: $joi
    .string()
    .valid($joi.ref("password"))
    .required()
    .label("Confirm Password")
    .messages({ "any.only": "Confirm Password must match Password" }),
});   
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
const accountData = ref<AccountCredentials>({
  username: "",
  password: "",
  
});
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
  accountData.value.username = data.value.accountData.username;
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

const informationRepo = repository<CombinedInformation>($api, "/employees/info");
const submitData = async () => {
  // const { error } = schema.validate(data);

  // if (error) {
  //   console.log(error.details.map((err) => err.message));
  // } else {
  //   console.log("Validation passed");
  // }
  try {
    const data = {
      id: Number(route.params.empId),
      status: statuses.value,
      applicantInfo: information.value,
      educData: educData.value,
      workData: workData.value,
      skillsData: skillsData.value,
      referencesData: referencesData.value,
      accountData: accountData.value,
    };
    const response = await informationRepo.update(data);
    $toast.success(response.message);
  } catch (err) {
    return handleApiError(err);
  }
};
</script>

<template>
  <div class="flex flex-col p-2">
    <EmployeeProfile
      v-model:status="statuses"
      :information="information"
      @submit="submitData"
    />
    <EmployeeTabs
      :credentials="accountData"
      :information="information"
      :educData="educData"
      :workData="workData"
      :skillsData="skillsData"
      :referencesData="referencesData"
      :year="year"
      @add-educ="addEduc"
      @add-work="addWork"
      @add-skills="addSkills"
      @add-references="addReferences"
    />
  </div>
</template>
