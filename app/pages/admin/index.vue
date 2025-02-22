<script setup lang="ts">
import type { ApiResponse } from '~/types';

definePageMeta({
  requiredRole: "admin",
});

useSeoMeta({
  title: "SUPERHURE Employees Module",
  description: "CRUD for Employees",
  ogTitle: "SUPERHURE Employees Module",
  ogDescription: "CRUD for Employees",
});

const { $api, payload, static: stat, $toast } = useNuxtApp();
const { handleApiError } = useErrorHandler();
const isOpen = ref(false);
const isUpdate = ref(false);
const initialState = {
  course_id: undefined,
  description: "",
  score: 0
};
const courseForm = reactive<CourseModel>({ ...initialState });
const courseData = ref<CourseModel[]>([]);
const courseRepo = repository<ApiResponse<CourseModel>>($api);

const { data, status, error } = await useAPI<CourseModel[]>("/course", {
  server: false,
  getCachedData(key) {
    const data = payload.data[key] || stat.data[key];
    if (!data) {
      return;
    }
    return data;
  },
});

if (data.value) {
  courseData.value = data.value;
}

if (error.value) {
  $toast.error(error.value.message || "Failed to fetch items");
}



const submitCourse = async (response: CourseModel) => {
  try {
    if (!isUpdate.value) {
      const res = await courseRepo.addCourse(response);
      courseData.value.unshift(res.data as CourseModel);
      $toast.success(res.message);
    } else {
      const res = await courseRepo.updateCourse(response);
      const index = courseData.value.findIndex(
        (item) => item.course_id === res.data?.course_id
      );
      courseData.value[index] = { ...courseData.value[index], ...res.data };
      $toast.success(res.message);
    }
    isOpen.value = false;
    isUpdate.value = false;
  } catch (error) {
    return handleApiError(error);
  }
};


const resetForm = () => {
  Object.assign(courseForm, initialState);
};

const toggleModal = () => {
  resetForm();
  isOpen.value = true;
  isUpdate.value = false;
};





</script>

<template>

  <CourseForm v-model:state="courseForm" @data-course="submitCourse" v-model:open-modal="isOpen"></CourseForm>

  <div class="flex flex-col items-center lg:items-start mb-3">
    <h2 class="font-extrabold text-2xl">Employee list!</h2>
    <span class="text-sm">Here's a list of employees applied!</span>
  </div>

  <!-- tanstack vue table -->
  <CourseList :data="courseData">
    <template #actions>
      <UButton icon="i-lucide-plus" size="sm" variant="solid" @click="toggleModal">Add Employees</UButton>
    </template>
  </CourseList>

</template>
