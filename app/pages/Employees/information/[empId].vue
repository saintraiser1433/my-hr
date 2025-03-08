<script setup lang="ts">

definePageMeta({
  requiredRole: "admin",
});

useSeoMeta({
  title: "SUPERHURE Employee Module",
  description: "CRUD for Employee",
  ogTitle: "SUPERHURE Employee Module",
  ogDescription: "CRUD for Employee",
});
const { $api, $toast } = useNuxtApp();
const { handleApiError } = useErrorHandler();
const route = useRoute();
const maxLength = 12
const value = ref('');
const year = ref<string[]>([]);
const yearsStart = 1900;
for (let i = yearsStart; i <= new Date().getFullYear(); i++) {
  year.value.push(i.toString());
}

const information = reactive({
  first_name: '',
  middle_name: '',
  last_name: '',
  gender: '',
  date_of_birth: '',
  email: '',
  contact_number: '',
  telephone_number: '',
  permanent_address: '',
  current_address: '',
  religion: '',
  citizenship: '',
  language_spoken: '',
  civil_status: '',
  nickname: '',
  fathers_name: '',
  mothers_name: '',
  fathers_occupation: '',
  mothers_occupation: '',
  parents_address: '',
  person_to_be_contact: ''
})

const educData = ref<Education[]>([
  {
    school_name: '',
    degree: '',
    year_started: '',
    year_ended: '',
    description: ''
  }
]);

const workData = ref<WorkExperience[]>([
  {
    company_name: '',
    job_title: '',
    work_year_started: '',
    work_year_ended: '',
  }
]);

const skillsData = ref<Skill[]>([
  {
    skills_name: '',
  }
]);

const referencesData = ref<References[]>([
  {
    name_of_person: '',
    position: '',
    ref_contact_number: '',
  }
]);

const addEduc = () => {
  educData.value.push({
    school_name: '',
    degree: '',
    year_started: '',
    year_ended: '',
    description: ''
  });
}

const addWork = () => {
  workData.value.push({
    company_name: '',
    job_title: '',
    work_year_started: '',
    work_year_ended: '',
  });
}

const addSkills = () => {
  skillsData.value.push({
    skills_name: '',
  });
}

const addReferences = () => {
  referencesData.value.push({
    name_of_person: '',
    position: '',
    ref_contact_number: '',
  });
}

const informationRepo = repository<CombinedInformation>($api, "/employees/info");
const submitData = async () => {
  try {
    const data = {
      id: Number(route.params.empId),
      applicantInfo: information,
      educData: educData.value,
      workData: workData.value,
      skillsData: skillsData.value,
      referencesData: referencesData.value
    };

    const response = await informationRepo.update(data);
    $toast.success(response.message);
  } catch (err) {
    return handleApiError(err);
  }
}


</script>

<template>
  <div class="flex flex-col p-2">
    <div class="flex gap-5 py-3 px-2 rounded-md bg-(--sidebar-background) w-full shadow-lg">
      <div class="flex items-center justify-center p-1 ml-5 border-1 bg-(--primary) rounded-full w-42 h-42">
        <NuxtImg class="rounded-full" src="/profile.jpg" quality="100"></NuxtImg>
      </div>
      <div class="flex flex-1 flex-col items-start justify-center mb-5 font-(family-name:--font-poppins)">
        <h1 class="font-semibold">JOHN REY DECOSTA</h1>
        <h2 class=" text-gray-700 dark:text-gray-400 font-semibold">Software Developer</h2>
        <div class="flex flex-col lg:flex-row mt-6 gap-5">
          <h5 class="font-semibold lg:ml-2">Head:</h5>
          <h5>Cyrus P. Teo</h5>
          <h5 class="font-semibold lg:ml-2">Department:</h5>
          <h5>College of Information Technology</h5>
          <h5 class="font-semibold">Hired date: </h5>
          <h5>01-Jan-2024</h5>
        </div>
        <USeparator class="py-2"></USeparator>
        <div class="flex items-center justify-between gap-5">
          <USwitch label="Inactive" />
          <UButton icon="i-lucide-edit" variant="subtle" color="success" @click="submitData">Save</UButton>
        </div>
      </div>

    </div>
    <div class="flex flex-start">
      <UTabs size="lg" variant="link" :items="TAB_EMP" class="mt-2 w-full" :ui="{
        list: 'flex-wrap'
      }">

        <template #information="{ item }">
          <UCard class="w-full" :ui="{
            header: 'p-3 sm:p-3',
            body: 'p-3 sm:p-3',
            footer: 'p-2 sm:p-2'
          }">
            <template #header>
              <h3 class="font-semibold">Personal Information</h3>
              <span class="text-gray-500">Enter your information</span>
            </template>
            <div class="grid grid-cols-12 gap-5">
              <UFormField class="lg:col-span-4 col-span-6" label="First Name">
                <UITextInput v-model="information.first_name" class="w-full" placeholder="Enter your first name" />
              </UFormField>
              <UFormField class="lg:col-span-4 col-span-6" label="Last Name">
                <UITextInput v-model="information.last_name" class="w-full" placeholder="Enter your last name" />
              </UFormField>
              <UFormField class="lg:col-span-4 col-span-6" label="Middle Name">
                <UITextInput v-model="information.middle_name" class="w-full" placeholder="Enter your middle name" />
              </UFormField>
              <UFormField class="lg:col-span-4 col-span-6" label="Gender">
                <USelect v-model="information.gender" :items="GENDER_ITEM" class="w-full" placeholder="Select gender" />
              </UFormField>
              <UFormField class="lg:col-span-4 col-span-6" label="Date of Birth">
                <UITextInput v-model="information.date_of_birth" class="w-full" type="date"
                  placeholder="Enter your dob" />
              </UFormField>
              <UFormField class="lg:col-span-4 col-span-6" label="Email">
                <UITextInput v-model="information.email" class="w-full" type="email" trailing-icon="i-lucide-at-sign"
                  placeholder="Enter your email" />
              </UFormField>
              <UFormField class="lg:col-span-4 col-span-6" label="Contact No.">
                <UInput v-model="information.contact_number" class="w-full" :maxlength="maxLength"
                  aria-describedby="character-count" placeholder="Enter contact"
                  :ui="{ trailing: 'pointer-events-none' }">
                  <template #trailing>
                    <div id="character-count" class="text-xs text-(--ui-text-muted) tabular-nums" aria-live="polite"
                      role="status">
                      {{ value?.length }}/{{ maxLength }}
                    </div>
                  </template>
                </UInput>
              </UFormField>
              <UFormField class="lg:col-span-4 col-span-6" label="Telephone No.">
                <UInput v-model="information.telephone_number" class="w-full" :maxlength="maxLength"
                  aria-describedby="character-count" placeholder="Enter telephone"
                  :ui="{ trailing: 'pointer-events-none' }">
                  <template #trailing>
                    <div id="character-count" class="text-xs text-(--ui-text-muted) tabular-nums" aria-live="polite"
                      role="status">
                      {{ value?.length }}/{{ maxLength }}
                    </div>
                  </template>
                </UInput>
              </UFormField>
              <UFormField class="lg:col-span-4 col-span-6" label="Permanent Address">
                <UITextInput v-model="information.permanent_address" class="w-full"
                  placeholder="Enter your permanent address" />
              </UFormField>
              <UFormField class="lg:col-span-4 col-span-6" label="Current Address">
                <UITextInput v-model="information.current_address" class="w-full"
                  placeholder="Enter your current address" />
              </UFormField>
              <UFormField class="lg:col-span-4 col-span-6" label="Religion">
                <USelectMenu v-model="information.religion" :items="RELIGIONS_ITEM" class="w-full"
                  placeholder="Select your religion" />
              </UFormField>
              <UFormField class="lg:col-span-4 col-span-6" label="Citizenship">
                <UITextInput v-model="information.citizenship" class="w-full" placeholder="Enter your citizenship" />
              </UFormField>

              <UFormField class="lg:col-span-4 col-span-6" label="Language Spoken">
                <UITextInput v-model="information.language_spoken" class="w-full" placeholder="Enter your language" />
              </UFormField>
              <UFormField class="lg:col-span-4 col-span-6" label="Civil Status">
                <USelectMenu v-model="information.civil_status" :items="CIVIL_STATUS_ITEM" class="w-full"
                  placeholder="Select your civil status" />
              </UFormField>
              <UFormField class="lg:col-span-4 col-span-6" label="Nickname">
                <UITextInput v-model="information.nickname" class="w-full" placeholder="Enter your nickname" />
              </UFormField>
            </div>
          </UCard>
          <UCard class="w-full my-5" :ui="{
            header: 'p-3 sm:p-3',
            body: 'p-3 sm:p-3',
            footer: 'p-2 sm:p-2'
          }">
            <template #header>
              <h3 class="font-semibold">Family Background</h3>
              <span class="text-gray-500">Enter your family background</span>
            </template>
            <div class="grid grid-cols-12 gap-5">
              <UFormField class="col-span-6" label="Father's Name">
                <UITextInput v-model="information.fathers_name" class="w-full" placeholder="Enter your father's name" />
              </UFormField>
              <UFormField class="col-span-6" label="Mother's Name">
                <UITextInput v-model="information.mothers_name" class="w-full" placeholder="Enter your mother's name" />
              </UFormField>
              <UFormField class="col-span-6" label="Father Occupation">
                <UITextInput v-model="information.fathers_occupation" class="w-full"
                  placeholder="Enter your father occupation" />
              </UFormField>
              <UFormField class="col-span-6" label="Mother Occupation">
                <UITextInput v-model="information.mothers_occupation" class="w-full"
                  placeholder="Enter your mother occupation" />
              </UFormField>
              <UFormField class="col-span-6" label="Current Address">
                <UITextInput v-model="information.parents_address" class="w-full"
                  placeholder="Enter your current address" />
              </UFormField>
              <UFormField class="col-span-6" label="Person To Be Contact">
                <UITextInput v-model="information.person_to_be_contact" class="w-full"
                  placeholder="Enter your person to be contact" />
              </UFormField>
            </div>
          </UCard>
        </template>
        <template #education="{ item }">
          <UCard class="w-full my-5" :ui="{
            header: 'p-3 sm:p-3',
            body: 'p-3 sm:p-3',
            footer: 'p-2 sm:p-2'
          }">
            <template #header>
              <div class="flex justify-between items-center">
                <div>
                  <h3 class="font-semibold">Education Attainment</h3>
                  <span class="text-gray-500">Include all college or university degrees</span>
                </div>
              </div>
            </template>
            <div class="flex flex-col">
              <div class="grid grid-cols-12 gap-5 flex-1 p-3 border border-(--border) rounded-sm my-2"
                v-for="(data, index) in educData" :key="index">
                <UFormField class="col-span-6 lg:col-span-5" label="Name of the School">
                  <UITextInput class="w-full" placeholder="School Name" v-model="data.school_name" />
                </UFormField>
                <UFormField class="col-span-6 lg:col-span-3" label="Degree">
                  <UITextInput class="w-full" placeholder="Enter your degree" v-model="data.degree" />
                </UFormField>
                <UFormField class="col-span-3 lg:col-span-1" label="Year Started">
                  <USelectMenu v-model="data.year_started" :items="year" class="w-full" placeholder="Started" />
                </UFormField>
                <UFormField class="col-span-3 lg:col-span-1" label="Year End">
                  <USelectMenu v-model="data.year_ended" :items="year" class="w-full" placeholder="End" />
                </UFormField>
                <UFormField class="col-span-6 lg:col-span-2" label="Description">
                  <USelectMenu v-model="data.description" :items="DESCRIPTION_ITEM" class="w-full"
                    placeholder="Description" />
                </UFormField>
              </div>

            </div>
            <template #footer>
              <div class="flex justify-end">
                <UButton icon="i-lucide-plus" size="md" variant="solid" @click="addEduc"></UButton>
              </div>
            </template>
          </UCard>
        </template>
        <template #work="{ item }">
          <UCard class="w-full my-5" :ui="{
            header: 'p-3 sm:p-3',
            body: 'p-3 sm:p-3',
            footer: 'p-2 sm:p-2'
          }">
            <template #header>
              <div class="flex justify-between items-center">
                <div>
                  <h3 class="font-semibold">Work Experiences</h3>
                  <span class="text-gray-500">Include all your work experience</span>
                </div>
              </div>

            </template>
            <div class="flex flex-col">
              <div class="grid grid-cols-12 gap-5 flex-1 p-3 border-1 border-(--border) rounded-sm  my-2"
                v-for="(data, index) in workData" :key="index">
                <UFormField class="col-span-6 lg:col-span-5" label="Name of the company ">
                  <UITextInput class="w-full" v-model="data.company_name" placeholder="Company Name" />
                </UFormField>
                <UFormField class="col-span-6 lg:col-span-5" label="Job Title">
                  <UITextInput class="w-full" v-model="data.job_title" placeholder="Job Title" />
                </UFormField>
                <UFormField class="col-span-6 lg:col-span-1" label="Year Started">
                  <USelectMenu v-model="data.work_year_started" :items="year" class="w-full" placeholder="Started" />
                </UFormField>
                <UFormField class="col-span-6 lg:col-span-1" label="Year End">
                  <USelectMenu v-model="data.work_year_ended" :items="year" class="w-full" placeholder="End" />
                </UFormField>
              </div>

            </div>
            <template #footer>
              <div class="flex justify-end">
                <UButton icon="i-lucide-plus" size="md" variant="solid" @click="addWork"></UButton>
              </div>
            </template>
          </UCard>
        </template>
        <template #skill="{ item }">
          <UCard class="w-full my-5" :ui="{
            header: 'p-3 sm:p-3',
            body: 'p-3 sm:p-3',
            footer: 'p-2 sm:p-2'
          }">
            <template #header>
              <div class="flex justify-between items-center">
                <div>
                  <h3 class="font-semibold">Skills & Expertise</h3>
                  <span class="text-gray-500">Include all your skills</span>
                </div>
              </div>
            </template>
            <div class="flex flex-col">

              <div class="grid grid-cols-12 gap-5 flex-1 p-3 border-1 border-(--border) rounded-sm  my-2"
                v-for="(data, index) in skillsData" :key="index">
                <UFormField class="col-span-12" label="Skills & Expertise">
                  <UITextInput class="w-full" v-model="data.skills_name" placeholder="Company Name" />
                </UFormField>
              </div>
            </div>
            <template #footer>
              <div class="flex justify-end">
                <UButton icon="i-lucide-plus" size="md" variant="solid" @click="addSkills"></UButton>
              </div>
            </template>
          </UCard>
        </template>
        <template #reference="{ item }">
          <UCard class="w-full my-5" :ui="{
            header: 'p-3 sm:p-3',
            body: 'p-3 sm:p-3',
            footer: 'p-2 sm:p-2'
          }">
            <template #header>
              <div class="flex justify-between items-center">
                <div>
                  <h3 class="font-semibold">References</h3>
                  <span class="text-gray-500">Include all your references</span>
                </div>
              </div>
            </template>
            <div class="flex flex-col">
              <div class="grid grid-cols-12 gap-5 flex-1 p-3 border-1 border-(--border) rounded-sm  my-2"
                v-for="(data, index) in referencesData" :key="index">
                <UFormField class="col-span-12 lg:col-span-4" label="Name of person">
                  <UITextInput class="w-full" v-model="data.name_of_person" placeholder="Enter name" />
                </UFormField>
                <UFormField class="col-span-6 lg:col-span-4" label="Position">
                  <UITextInput class="w-full" v-model="data.position" placeholder="Position" />
                </UFormField>
                <UFormField class="col-span-6 lg:col-span-4" label="Contact Number">
                  <UITextInput class="w-full" v-model="data.ref_contact_number" placeholder="Contact Number" />
                </UFormField>
              </div>

            </div>
            <template #footer>
              <div class="flex justify-end">
                <UButton icon="i-lucide-plus" size="md" variant="solid" @click="addReferences"></UButton>
              </div>
            </template>
          </UCard>
        </template>
      </UTabs>
    </div>

  </div>






</template>