<template>
  <div
    :class="!isToggle ? 'lg:w-[calc(100%-var(--sidebar-compact))]' : ''"
    class="header"
  >
    <div class="flex items-center">
      <UButton color="neutral" variant="ghost" class="cursor-pointer" @click="toggle">
        <Icon name="lucide:panel-left" />
      </UButton>
      |
      <UBreadcrumb class="ml-2" :items="items" variant="link" />
    </div>
    <div>
      <UButton color="neutral" variant="ghost" class="cursor-pointer">
        <Icon name="lucide:moon-star" />
      </UButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
const isToggle = useState("toggle", () => true);

const toggle = () => {
  isToggle.value = !isToggle.value;
};
const items = ref([
  {
    label: "Home",
    icon: "i-lucide-home",
  },
  {
    label: "Dashboard",
    to: "/components",
  },
]);
</script>

<style></style>
