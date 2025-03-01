<template>
  <aside
    :class="
      isToggle
        ? '-translate-x-full lg:translate-x-0 lg:w-(--sidebar-compact)'
        : 'translate-x-0 w-(--msidebar) lg:w-(--sidebar)'
    "
    class="flex transition-all ease-in-out h-full z-50 fixed top-0 left-0 bg-(--sidebar-background) border-r-[1px] rounded-r-sm flex-col"
  >
    <div class="flex items-center gap-2 px-3 h-14 flex-none">
      <div
        class="relative flex items-center justify-center p-1 rounded-lg bg-gray-700 dark:bg-gray-800"
      >
        <NuxtImg src="/logo/seait.png" quality="20" width="24" height="24"></NuxtImg>
      </div>
      <div v-if="!isToggle" class="flex flex-col">
        <h4 class="font-bold">SUPERHURE</h4>
        <span class="text-[10px]">E-HR SYSTEM</span>
      </div>
    </div>
    <USeparator></USeparator>
    <UNavigationMenu
      :items="MENU_ITEMS"
      orientation="vertical"
      :class="isToggle ? 'lg:w-(--sidebar-compact)' : 'lg:w-(--sidebar)'"
      class="overflow-y-auto custom-scrollbar px-2 flex-2"
      :ui="{
        linkLabel: isToggle ? 'lg:hidden' : '',
        childItem: isToggle ? 'lg:hidden' : '',
        label: 'text-xs text-gray-600 font-medium dark:text-gray-400',

      }"
    >
      <template v-if="isToggle" #components-trailing>
        <span></span>
      </template>
      <template v-if="isToggle" #components-trailing>
        <span></span>
      </template>
    </UNavigationMenu>

    <!-- custom-scrollbar -->

    <footer class="flex relative items-center justify-center rounded-sm shadow-lg">
      <UDropdownMenu
        arrow
        class="w-full"
        :items="itemss"
        :content="{
          align: 'center',
          side: 'top',
        }"
        :ui="{
          content: 'w-64 lg:w-52  overflow-hidden relative',
          item: 'cursor-pointer text-xs font-medium',
        }"
      >
        <UButton class="flex justify-center" label="Open" color="neutral" variant="ghost">
          <div class="rounded-md bg-gray-400 text-white dark:bg-gray-800 px-2 py-1">
            JD
          </div>
          <div
            v-if="!isToggle"
            class="flex flex-col items-center justify-start px-2 flex-1"
          >
            <span class="text-xs">Johnrey Decosta</span>
            <span class="text-xs">Administrator</span>
          </div>
          <div v-if="!isToggle" class="flex-none">
            <Icon name="lucide:chevrons-up-down" class="h-7 w-7" />
          </div>
        </UButton>
      </UDropdownMenu>
    </footer>
  </aside>
</template>

<script setup>
const isToggle = useState("toggle");
const itemss = ref([
  { type: "separator" },
  {
    label: "Log out",
    icon: "i-lucide-cog",
  },
]);
</script>

<style lang="scss" scoped></style>
