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
    icon:'si:user-line'
  },
  {
    label: 'Educational Attainment',
    icon:'qlementine-icons:education-16'
  },
  {
    label: 'Work Experience',
    icon:'material-symbols:work-outline'
  },
  {
    label: 'Skill & Experience',
    icon:'uil:setting'
  },
  {
    label: 'References',
    icon:'material-symbols-light:quick-reference-all-outline'
  }
])

</script>

<template>
  <div class="flex flex-col p-2">
    <div class="flex gap-5 p-5 rounded-md bg-(--sidebar-background) w-full shadow-lg">
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
        <UBadge size="lg" variant="outline">Software Developer</UBadge>
   </div>
   <div class="items-start">
    <div class="flex items-center gap-5">
        <USwitch label="Inactive" />
        <UButton icon="i-lucide-edit" variant="subtle" color="success">Edit </UButton>
    </div>

   </div>


  


    </div>
    <div class="flex flex-start">
        <UTabs size="lg" variant="link" :items="items" class="mt-2 w-1/2" />
    </div>

  </div>
  

    



</template>