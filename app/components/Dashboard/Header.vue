<template>
  <div class="fixed right-0 top-0 flex gap-2 items-center w-full text-gray-500 p-3 lg:w-[calc(100%-16rem)]">
    <Button>
      <Icon name="lucide:panel-left" class="p-2 " /> | 
    </Button>
    <UBreadcrumb :items="items" variant="link"/>
  </div>
</template>

<script lang="ts" setup>
const items = ref([
  {
    label: 'Home',
    icon: 'i-lucide-house'
  },
  {
    label: 'Components',
    icon: 'i-lucide-box',
    to: '/components'
  },
  {
    label: 'Breadcrumb',
    icon: 'i-lucide-link',
    to: '/components/breadcrumb'
  }
])
</script>

<style>

</style>