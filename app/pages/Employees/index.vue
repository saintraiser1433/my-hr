<script setup lang="ts">

definePageMeta({
    requiredRole: "Admin",
});

useSeoMeta({
    title: "SUPERHURE Employee Module",
    description: "CRUD for Employee",
    ogTitle: "SUPERHURE Employee Module",
    ogDescription: "CRUD for Employee",
});

const { $toast } = useNuxtApp();


const departmentData = ref<DepartmentModel[]>([]);

const { data, status, error } = await useAPI<DepartmentModel[]>("/department");
if (data.value) {
    departmentData.value = data.value;
}
if (error.value) {
    $toast.error(error.value.message || "Failed to fetch items");
}


</script>

<template>
    <div class="flex flex-col items-center lg:items-start mb-3">
        <h2 class="font-extrabold text-2xl">Employee Module</h2>
        <span class="text-sm">Please select departments to show employees in that department!</span>
    </div>
    <EmployeeGroupList :data="departmentData"></EmployeeGroupList>



</template>
