<script setup lang="ts">
definePageMeta({
  layout: "empty",
  requiredRole: "guest",
});

useHead({
  title: "SUPERHURE Authentication",
});

const { $toast } = useNuxtApp();

const { signIn, info } = useAuthentication();
const { handleApiError } = useErrorHandler();


const onSubmit = async (data: Login) => {
  try {
    await signIn(data);
    const role = JSON.parse(info.value).role as Role;
    if (role) {
      if (role === "Admin") {
        return navigateTo({ path: '/Dashboard' });
      } else if (role === "Employee") {
        return navigateTo({ name: "emp" });
      } else if (role === "TeamLead") {
        return navigateTo({ name: "team" });
      }
    }

    $toast.error("No role Assigned")
  } catch (err) {
    handleApiError(err)
  }
};

</script>


<template>

  <Auth @submit="onSubmit"></Auth>
</template>
