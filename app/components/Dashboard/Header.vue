<script lang="ts" setup>

const colorMode = useColorMode();
const isToggle = useState("toggle");
const { breadcrumbs } = useBreadcrumbs();
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});


const toggle = () => {
  isToggle.value = !isToggle.value;
};


</script>

<style></style>


<template>
  <header :class="isToggle
      ? 'lg:w-[calc(100%-var(--sidebar-compact))] '
      : 'lg:w-[calc(100%-var(--sidebar))] '
    "
    class="flex w-full max-w-full fixed z-30 bg-(--sidebar-background) dark:bg-(--sidebar-background) right-0 top-0 flex-none h-14 justify-between items-center transition-all ease-in-out text-gray-500 pr-4 pl-2 border-b-[1px]">
    <div class="flex items-center gap-1">
      <UButton color="neutral" variant="ghost" @click="toggle">
        <Icon name="lucide:panel-left" />
      </UButton>
      |
      <UBreadcrumb class="ml-2" :items="breadcrumbs" :ui="{
        link: 'text-[13px]',
      }" />
    </div>
    <div>
      <ClientOnly v-if="!colorMode?.forced">
        <UButton :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'" color="neutral" variant="soft"
          @click="isDark = !isDark" />

        <template #fallback>
          <div class="size-8" />
        </template>
      </ClientOnly>
    </div>
  </header>
</template>

