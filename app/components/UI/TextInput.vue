<script setup lang="ts">
const model = defineModel<string | number | undefined>();
defineProps({
  isCapitalize: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <UInput
    v-model="model"
    class="w-full"
    :ui="{ trailing: 'pe-1', base: !isCapitalize ? 'normal-case' : '' }"
  >
    <template v-if="String(model).length" #trailing>
      <UButton
        color="neutral"
        variant="link"
        size="sm"
        icon="i-lucide-circle-x"
        aria-label="Clear input"
        @click="model = undefined"
      />
    </template>
  </UInput>
</template>
