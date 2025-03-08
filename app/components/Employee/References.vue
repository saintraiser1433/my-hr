<script setup lang="ts">
defineProps({
  referencesData: {
    type: Array as PropType<References[]>,
    required: true,
  },
});
const maxLength = 11;

const emit = defineEmits(["add-references"]);
</script>

<template>
  <UCard
    class="w-full my-5"
    :ui="{
      header: 'p-3 sm:p-3',
      body: 'p-3 sm:p-3',
      footer: 'p-2 sm:p-2',
    }"
  >
    <template #header>
      <div class="flex justify-between items-center">
        <div>
          <h3 class="font-semibold">References</h3>
          <span class="text-gray-500">Include all your references</span>
        </div>
      </div>
    </template>
    <div class="flex flex-col">
      <div v-if="referencesData.length === 0" class="text-center font-semibold text-xl">
        No data available kindly click + button
      </div>
      <div
        class="grid grid-cols-12 gap-5 flex-1 p-3 border-1 border-(--border) rounded-sm my-2"
        v-for="(data, index) in referencesData"
        :key="index"
      >
        <UFormField class="col-span-12 lg:col-span-4" label="Name of person">
          <UITextInput
            class="w-full"
            v-model="data.name_of_person"
            placeholder="Enter name"
          />
        </UFormField>
        <UFormField class="col-span-6 lg:col-span-4" label="Position">
          <UITextInput class="w-full" v-model="data.position" placeholder="Position" />
        </UFormField>
        <UFormField class="col-span-6 lg:col-span-4" label="Contact Number">
          <UInput
            type="number"
            v-model="data.ref_contact_number"
            class="w-full"
            :maxlength="maxLength"
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
                <!-- {{ data.ref_contact_number?.length ?? 0 }}/{{ maxLength }} -->
              </div>
            </template>
          </UInput>
        </UFormField>
      </div>
    </div>
    <template #footer>
      <div class="flex justify-end">
        <UButton
          icon="i-lucide-plus"
          size="md"
          variant="solid"
          @click="emit('add-references')"
        ></UButton>
      </div>
    </template>
  </UCard>
</template>
