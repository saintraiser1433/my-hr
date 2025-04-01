<script setup lang="ts">
defineProps({
  credentials: {
    type: Object as PropType<AccountCredentials>,
    required: true,
  },
});
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
          <span class="text-gray-500">Update your account settings</span>
        </div>
        <!-- <svg-icon name="vector/empty" title="Empty Evaluation" /> -->
      </div>
    </template>
    <div class="grid grid-cols-12 gap-5">
      <UFormField class="lg:col-span-6 col-span-12" label="Username">
        <UITextInput
          :is-capitalize="false"
          v-model="credentials.username"
          class="w-full"
          readonly
        />
      </UFormField>
      <UFormField class="lg:col-span-6 col-span-12" label="New Password">
        <UITextInput
          :is-capitalize="false"
          v-model="credentials.password"
          type="password"
          class="w-full"
          placeholder="*********"
        />
      </UFormField>
      <UFormField class="lg:col-span-6 col-span-12" label="Old Password">
        <UITextInput
          :is-capitalize="false"
          v-model="credentials.password"
          type="password"
          class="w-full"
          placeholder="*********"
        />
      </UFormField>
      <UFormField class="lg:col-span-6 col-span-6" label="Old Confirm Password">
        <UITextInput
          :is-capitalize="false"
          v-model="credentials.confirmPassword"
          class="w-full"
          type="password"
          placeholder="*********"
        />
      </UFormField>
    </div>
  </UCard>
</template>
