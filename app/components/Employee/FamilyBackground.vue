<script setup lang="ts">
defineProps({
  information: {
    type: Object,
    required: true,
  },
  isDisabled: {
    type:Boolean,
    default:false
  }
});
</script>

<template>
  <UCard
    class="w-full my-5"
    :ui="{
      root: 'rounded-lg',
      header: 'border-l-3 rounded-t-lg border-l-(--ui-primary) p-3 sm:p-3',
      body: 'p-3 sm:p-3',
      footer: 'p-2 sm:p-2',
    }"
  >
    <template #header>
      <div class="flex justify-between items-center gap-2">
        <div>
          <h3 class="font-semibold">Family Background</h3>
          <span class="text-gray-500 italic">Enter your family background</span>
        </div>
        <svg-icon name="iconx/family" width="32" height="32"></svg-icon>
      </div>
      <span class="text-gray-500"></span>
    </template>
    <div class="grid grid-cols-12 gap-5">
      <UFormField class="col-span-6" label="Father's Name">
        <UITextInput
          v-model="information.fathers_name"
          class="w-full"
          :disabled="isDisabled"
          :has-remove-button="isDisabled"
          placeholder="Enter your father's name"
        />
      </UFormField>
      <UFormField class="col-span-6" label="Mother's Name">
        <UITextInput
          v-model="information.mothers_name"
          class="w-full"
          :disabled="isDisabled"
          :has-remove-button="isDisabled"
          placeholder="Enter your mother's name"
        />
      </UFormField>
      <UFormField class="col-span-6" label="Father Occupation">
        <UITextInput
          v-model="information.fathers_occupation"
          class="w-full"
          :disabled="isDisabled"
          :has-remove-button="isDisabled"
          placeholder="Enter your father occupation"
        />
      </UFormField>
      <UFormField class="col-span-6" label="Mother Occupation">
        <UITextInput
          v-model="information.mothers_occupation"
          class="w-full"
          :disabled="isDisabled"
          :has-remove-button="isDisabled"
          placeholder="Enter your mother occupation"
        />
      </UFormField>
      <UFormField class="col-span-6" label="Current Address">
        <UITextInput
          v-model="information.parents_address"
          class="w-full"
          :disabled="isDisabled"
          :has-remove-button="isDisabled"
          :ui="{ base: 'normal-case' }"
          placeholder="Enter your current address"
        />
      </UFormField>
      <UFormField class="col-span-6" label="Person To Be Contact">
        <UITextInput
          v-model="information.person_to_be_contact"
          class="w-full"
          :disabled="isDisabled"
          :has-remove-button="isDisabled"
          placeholder="Enter your person to be contact"
        />
      </UFormField>
    </div>
  </UCard>
</template>
