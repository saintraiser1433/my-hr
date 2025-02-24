<script setup lang="ts">
const model = defineModel<string | number | undefined>();
</script>

<template>
  <UInput v-model="model" class="w-full" size="sm" :ui="{ trailing: 'pe-1' }">
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
