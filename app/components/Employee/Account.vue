<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
const {$joi,$api,$toast} = useNuxtApp();
const {handleApiError} = useErrorHandler()
const route = useRoute();
const schema = $joi.object({
  id: $joi.number().required(),
  newPassword: $joi.string().min(6).required().messages({
    "any.required": `New Password is Required`,
    "string.empty": `New Password is Required`,
    "string.min": 'New Password must be 6 characters up'
  }),
  oldPassword: $joi.string().required().messages({
    "any.required": `Old Password is Required`,
    "string.empty": `Old Password is Required`,
  }),
  confirmPassword: $joi
    .string()
    .valid($joi.ref("newPassword"))
    .required()
    .label("Confirm Password")
    .messages({ "any.only": "Confirm Password must match New Password" }),
}); 
const accountData = ref<Omit<AccountSettings,"username">>({
  id: Number(route.params.empId),
  newPassword: "",
  oldPassword: "",
  confirmPassword: "",
});

const credentialsRepo = repository<Omit<AccountSettings,"username">>($api, "/employees/credentials");
const onSubmit = async (event: FormSubmitEvent<Omit<AccountSettings,"username">>) => {
  try{
    const response = await credentialsRepo.update(event.data);
    $toast.success(response.message);
  }catch(err){
    handleApiError(err);
  }
};
const username = inject<string>('username');


</script>

<template>
  <UCard
    class="w-full"
    :ui="{
      root: 'rounded-md',
      header: 'border-l-3 rounded-t-lg border-l-(--ui-primary) p-3 sm:p-3',
      body: 'p-3 sm:p-3',
      footer: 'p-2 sm:p-2',
    }"
  >
    <template #header>
      <div class="flex justify-between items-center gap-2">
        <div>
          <h3 class="font-semibold">Account Settings</h3>
          <span class="text-gray-500 italic">Update your account settings</span>
        </div>
        <svg-icon name="iconx/settings" width="32" height="32"></svg-icon>
      </div>
    </template>

      <UForm
        ref="formRef"
        :schema="schema"
        :state="accountData"
        class="grid grid-cols-12 gap-5"
        @submit="onSubmit"
      >
      <UFormField class="lg:col-span-6 col-span-12" label="Username">
        <UInput
          :ui="{'base':'normal-case'}"
          v-model="username"
          class="w-full"
          readonly
        />
      </UFormField>
      <UFormField class="lg:col-span-6 col-span-12" name="newPassword" label="New Password">
        <UInput
          :is-capitalize="false"
          v-model="accountData.newPassword"
          type="password"
          class="w-full"
          placeholder="*********"
        />
      </UFormField>
      <UFormField class="lg:col-span-6 col-span-12" name="oldPassword" label="Old Password">
        <UInput
          :is-capitalize="false"
          v-model="accountData.oldPassword"
          type="password"
          class="w-full"
          placeholder="*********"
        />
      </UFormField>
      <UFormField class="lg:col-span-6 col-span-6" name="confirmPassword" label="Confirm Password">
        <UInput
          :is-capitalize="false"
          v-model="accountData.confirmPassword"
          class="w-full"
          type="password"
          placeholder="*********"
        />
      </UFormField>
      <USeparator class="col-span-12"/>
      <UButton type="submit" icon="lucide-check" class="col-span-2 text-center">Save Credentials</UButton>
      </UForm>
   
  </UCard>
</template>
