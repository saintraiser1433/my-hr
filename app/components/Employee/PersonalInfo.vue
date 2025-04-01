<script setup lang="ts">
defineProps({
  information: {
    type: Object,
    required: true,
  },
});

const maxLength = 11;
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
          <h3 class="font-semibold">Personal Information</h3>
          <span class="text-gray-500">Enter your information</span>
        </div>
      </div>
    </template>
    <div class="grid grid-cols-12 gap-5">
      <UFormField class="lg:col-span-4 col-span-6" label="First Name">
        <UITextInput
          v-model="information.first_name"
          class="w-full"
          placeholder="Enter your first name"
        />
      </UFormField>
      <UFormField class="lg:col-span-4 col-span-6" label="Last Name">
        <UITextInput
          v-model="information.last_name"
          class="w-full"
          placeholder="Enter your last name"
        />
      </UFormField>
      <UFormField class="lg:col-span-4 col-span-6" label="Middle Name">
        <UITextInput
          v-model="information.middle_name"
          class="w-full"
          placeholder="Enter your middle name"
        />
      </UFormField>
      <UFormField class="lg:col-span-4 col-span-6" label="Gender">
        <USelect
          v-model="information.gender"
          :items="GENDER_ITEM"
          class="w-full"
          placeholder="Select gender"
        />
      </UFormField>
      <UFormField class="lg:col-span-4 col-span-6" label="Date of Birth">
        <UITextInput
          v-model="information.date_of_birth"
          class="w-full"
          :ui="{ base: 'normal-case' }"
          type="date"
          placeholder="Enter your dob"
        />
      </UFormField>
      <UFormField class="lg:col-span-4 col-span-6" label="Email">
        <UITextInput
          v-model="information.email"
          class="w-full"
          type="email"
          :ui="{ base: 'normal-case' }"
          trailing-icon="i-lucide-at-sign"
          placeholder="Enter your email"
        />
      </UFormField>
      <UFormField class="lg:col-span-4 col-span-6" label="Contact No.">
        <UITextInput
          type="text"
          v-model="information.contact_number"
          class="w-full"
          @input="(event:any) => validateMaxLength(event, maxLength)"
          aria-describedby="character-count"
          placeholder="Enter contact"
          :ui="{ trailing: 'pointer-events-none' }"
        >
          <template #trailing>
            <div
              id="character-count"
              class="text-xs text-(--ui-text-muted) tabular-nums"
              aria-live="polite"
              role="status"
            ></div>
          </template>
        </UITextInput>
      </UFormField>
      <UFormField class="lg:col-span-4 col-span-6" label="Telephone No.">
        <UInput
          type="text"
          v-model="information.telephone_number"
          class="w-full"
          @input="(event:any) => validateMaxLength(event, maxLength)"
          aria-describedby="character-count"
          placeholder="Enter telephone"
          :ui="{ trailing: 'pointer-events-none' }"
        >
          <template #trailing>
            <div
              id="character-count"
              class="text-xs text-(--ui-text-muted) tabular-nums"
              aria-live="polite"
              role="status"
            >
              <!-- {{ information.telephone_number.length }}/{{ maxLength }} -->
            </div>
          </template>
        </UInput>
      </UFormField>
      <UFormField class="lg:col-span-4 col-span-6" label="Permanent Address">
        <UITextInput
          v-model="information.permanent_address"
          class="w-full"
          :ui="{ base: 'normal-case' }"
          placeholder="Enter your permanent address"
        />
      </UFormField>
      <UFormField class="lg:col-span-4 col-span-6" label="Current Address">
        <UITextInput
          v-model="information.current_address"
          class="w-full"
          :ui="{ base: 'normal-case' }"
          placeholder="Enter your current address"
        />
      </UFormField>
      <UFormField class="lg:col-span-4 col-span-6" label="Religion">
        <USelectMenu
          v-model="information.religion"
          :items="RELIGIONS_ITEM"
          class="w-full"
          placeholder="Select your religion"
        />
      </UFormField>
      <UFormField class="lg:col-span-4 col-span-6" label="Citizenship">
        <UITextInput
          v-model="information.citizenship"
          class="w-full"
          placeholder="Enter your citizenship"
        />
      </UFormField>
      <UFormField class="lg:col-span-4 col-span-6" label="Language Spoken">
        <UITextInput
          v-model="information.language_spoken"
          class="w-full"
          placeholder="Enter your language"
        />
      </UFormField>
      <UFormField class="lg:col-span-4 col-span-6" label="Civil Status">
        <USelectMenu
          v-model="information.civil_status"
          :items="CIVIL_STATUS_ITEM"
          class="w-full"
          placeholder="Select your civil status"
        />
      </UFormField>
      <UFormField class="lg:col-span-4 col-span-6" label="Nickname">
        <UITextInput
          v-model="information.nickname"
          class="w-full"
          placeholder="Enter your nickname"
        />
      </UFormField>
    </div>
  </UCard>
</template>
