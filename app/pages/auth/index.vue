<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
definePageMeta({
  layout: "empty",
  requiredRole: "guest",
});

useHead({
  title: "SUPERHURE Authentication",
});

const { $joi, $toast } = useNuxtApp();

// const { signIn, info } = useAuthentication();
const { handleApiError } = useErrorHandler();
const state = ref<User>({
  username: "",
  password: "",
});

const schema = $joi.object({
  username: $joi.string().min(5).required().messages({
    "string.empty": "Username is Required",
    "string.min": "Minimum of 5 letters is required",
    "any.required": "Username is Required",
  }),
  password: $joi.string().required().messages({
    "string.empty": "Password is Required",
    "any.required": "Password is Required",
  }),
});

const isShown = ref(false);


const onSubmit = async (event: FormSubmitEvent<User>) => {
  try {
    // await signIn({
    //   username: event.data.username,
    //   password: event.data.password,
    // });
    // const parse = JSON.parse(info.value);
    // if (parse.role) {
    //   const userRole = parse.role;
    //   if (userRole === "admin") {
    //     return navigateTo({ name: "admin-home" });
    //   } else if (userRole === "examinee") {
    //     return navigateTo({ name: "user" });
    //   } else if (userRole === "deans") {
    //     return navigateTo({ name: "deans-home" });
    //   }
    // }
    $toast.error("No role Assigned")
  } catch (err: any) {
    return handleApiError(err)
  }
};

const showPassword = () => {
  isShown.value = !isShown.value;
}
</script>

<style scoped></style>

<template>
  <div class="flex justify-center items-center max-w-sm lg:max-w-3xl mx-auto min-h-screen">
    <div class="w-full rounded-lg shadow-lg bg-primary dark:bg-(--sidebar-background)">
      <!-- <form @submit.prevent="handleSignIn"> -->
      <div class="grid grid-cols-2">
        <div class="col-span-2 lg:col-span-1 py-12 px-8">
          <div class="py-5">
            <h1 class="text-2xl font-semibold uppercase text-gray-600 dark:text-gray-300">
              Welcome Back
            </h1>
            <span class="text-xs">Please enter login details below</span>
          </div>

          <UForm :schema="schema" :state="state" class="space-y-5" @submit="onSubmit">
            <div class="flex flex-col gap-2">
                <UFormField label="Username" name="username">
                <UInput placeholder="juan_delacruz222" class="w-full" v-model="state.username"/>
            </UFormField>
            <UFormField label="Password" name="password">
              <UButtonGroup size="sm" class="w-full" orientation="horizontal">
                <UInput placeholder="•••••••••" class="w-full" :type="isShown ? 'text' : 'password'" v-model="state.password"  />
                <UButton size="xs" @click="showPassword" variant="soft" color="primary" icon="i-mdi-eye" />
              </UButtonGroup>

            </UFormField>
            </div>
            
            <UButton type="submit" block  size="md">Submit</UButton>
          </UForm>
        </div>
        <div
          class="lg:col-span-1 bg-[url('bg/image.png')] w-full h-auto bg-repeat bg-[center_bottom_-6rem]">
        </div>
      </div>
      <!-- </form> -->
      <!-- <button type="button" @click="handleGitHub">Sign In as github</button> -->
    </div>
  </div>
</template>
