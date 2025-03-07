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


const items = ref([
  {
    label: 'Personal Information',
    icon:'si:user-line',
    slot:'information'
  },
  {
    label: 'Educational Attainment',
    icon:'qlementine-icons:education-16',
    slot:'education'
  },
  {
    label: 'Work Experience',
    icon:'material-symbols:work-outline',
    slot:'work'
  },
  {
    label: 'Skill & Experience',
    icon:'uil:setting',
    slot:'skill'
  },
  {
    label: 'References',
    icon:'material-symbols-light:quick-reference-all-outline',
    slot:'reference'
  }
])

</script>

<template>
  <div class="flex flex-col p-2">
    <div class="flex gap-5 py-3 px-2 rounded-md bg-(--sidebar-background) w-full shadow-lg">
   <div
     class="flex items-center justify-center p-1 ml-5 border-1 bg-(--primary) rounded-full"
   >
     <NuxtImg
       class="rounded-full"
       src="/profile.jpg"
       quality="100"
       height="120"
       width="120"
     ></NuxtImg>
   </div>
   <div class="flex flex-1 flex-col items-start justify-center mb-5">
        <h2 class="font-semibold mb-2">JOHN REY DECOSTA</h2>
        <UBadge size="xl" variant="outline">Software Developer</UBadge>
        <div class="flex mt-6 gap-3">
            <h5 class="font-semibold ml-2">Head:</h5>
            <h5>Cyrus P. Teo</h5>
            <h5 class="font-semibold ml-2">Department:</h5>
            <h5>College of Information Technology</h5>
            <h5 class="font-semibold">Hired date: </h5>
            <h5>01-Jan-2024</h5>
        </div>
   </div>
   <div class="items-start">
    <div class="flex items-center gap-5">
        <USwitch label="Inactive" />
        <UButton icon="i-lucide-edit" variant="subtle" color="success">Edit </UButton>
    </div>

   </div>
    </div>
    <div class="flex flex-start">
        <UTabs size="lg" variant="link" :items="items" class="mt-2 w-full">
          <template #information="{ item }">
            <UCard class="w-full">
              <template #header>
                <h4 class="font-semibold">Personal Information</h4>
              </template>
              
              <div class="grid grid-cols-12 gap-5">
                <UFormField class="col-span-4" label="First Name">
                  <UInput class="w-full" placeholder="Enter your first name" />
                </UFormField>
                <UFormField class="col-span-4" label="Last Name">
                  <UInput class="w-full" placeholder="Enter your last name" />
                </UFormField>
                <UFormField class="col-span-4" label="Middle Name">
                  <UInput class="w-full" placeholder="Enter your middle name" />
                </UFormField>
                <UFormField class="col-span-4" label="Gender">
                  <UInput class="w-full" placeholder="Enter your gender" />
                </UFormField>
                <UFormField class="col-span-4" label="Date of Birth">
                  <UInput class="w-full" placeholder="Enter your dob" />
                </UFormField>
                <UFormField class="col-span-4" label="Email">
                  <UInput class="w-full" placeholder="Enter your email" />
                </UFormField>
                <UFormField class="col-span-4" label="Contact No.">
                  <UInput class="w-full" placeholder="Enter your contact" />
                </UFormField>
                <UFormField class="col-span-4" label="Telephone No.">
                  <UInput class="w-full" placeholder="Enter your telephone" />
                </UFormField>
                <UFormField class="col-span-4" label="Permanent Address">
                  <UInput class="w-full" placeholder="Enter your permanent address" />
                </UFormField>
                <UFormField class="col-span-4" label="Current Address">
                  <UInput class="w-full" placeholder="Enter your current address" />
                </UFormField>
                <UFormField class="col-span-4" label="Religion">
                  <UInput class="w-full" placeholder="Enter your religion" />
                </UFormField>
                <UFormField class="col-span-4" label="Citizenship">
                  <UInput class="w-full" placeholder="Enter your citizenship" />
                </UFormField>

                <UFormField class="col-span-4" label="Language Spoken">
                  <UInput class="w-full" placeholder="Enter your language" />
                </UFormField>
                <UFormField class="col-span-4" label="Civil Status">
                  <UInput class="w-full" placeholder="Enter your civil status" />
                </UFormField>
                <UFormField class="col-span-4" label="Spouse">
                  <UInput class="w-full" placeholder="Enter your spouse" />
                </UFormField>
              </div>
            </UCard>
            <UCard class="w-full my-5">
              <template #header>
                <h5 class="font-semibold">Family Background</h5>
              </template>
              <div class="grid grid-cols-12 gap-5">
                <UFormField class="col-span-6" label="Father's Name">
                  <UInput class="w-full" placeholder="Enter your father's name" />
                </UFormField>
                <UFormField class="col-span-6" label="Mother's Name">
                  <UInput class="w-full" placeholder="Enter your mother's name" />
                </UFormField>
                <UFormField class="col-span-6" label="Father Occupation">
                  <UInput class="w-full" placeholder="Enter your father occupation" />
                </UFormField>
                <UFormField class="col-span-6" label="Mother Occupation">
                  <UInput class="w-full" placeholder="Enter your mother occupation" />
                </UFormField>
                <UFormField class="col-span-6" label="Current Address">
                  <UInput class="w-full" placeholder="Enter your current address" />
                </UFormField>
                <UFormField class="col-span-6" label="Person To Be Contact">
                  <UInput class="w-full" placeholder="Enter your person to be contact" />
                </UFormField>
               

              </div>
            </UCard>
          </template>
          <template #education="{ item }">
          </template>
          <template #work="{ item }">
          </template>
          <template #skill="{ item }">
          </template>
          <template #reference="{ item }">
          </template>
        </UTabs>
    </div>

  </div>
  

    



</template>