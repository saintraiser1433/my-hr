<template>
  <header
    :class="
      isToggle
        ? 'lg:w-[calc(100%-var(--sidebar-compact))] '
        : 'lg:w-[calc(100%-var(--sidebar))] '
    "
    class="flex w-full max-w-full fixed z-30 right-0 top-0 flex-none h-14 justify-between items-center transition-all ease-in-out text-gray-500 pr-4 pl-2 border-b-[1px]"
  >
    <div class="flex items-center">
      <UButton color="neutral" variant="ghost" @click="toggle">
        <Icon name="lucide:panel-left" />
      </UButton>
      |
      <UBreadcrumb
        class="ml-2"
        :items="items"
        :ui="{
          link: 'text-[13px]',
        }"
      />
    </div>
    <div>
      <ClientOnly v-if="!colorMode?.forced">
        <UButton
          :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
          color="neutral"
          variant="ghost"
          @click="isDark = !isDark"
        />

        <template #fallback>
          <div class="size-8" />
        </template>
      </ClientOnly>
    </div>
  </header>
</template>

<script lang="ts" setup>
const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});
const isToggle = useState("toggle");

const toggle = () => {
  isToggle.value = !isToggle.value;
};
const items = ref([
  {
    label: "Home",
  },
  {
    label: "Dashboard",
    to: "/",
  },
]);
</script>

<style></style>
