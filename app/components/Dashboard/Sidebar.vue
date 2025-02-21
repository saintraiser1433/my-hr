<template>
  <aside
    :class="isToggle ? '-translate-x-full lg:translate-x-0 lg:w-(--sidebar-compact)' : 'translate-x-0 w-(--msidebar) lg:w-(--sidebar)'"
    class="flex transition-all ease-in-out h-full z-50 fixed top-0 left-0 bg-(--sidebar-background) border-r-[1px] rounded-r-sm flex-col">
    <div class="flex items-center gap-2 px-3 h-14 flex-none">
      <div class="relative flex items-center justify-center p-1 rounded-lg bg-gray-700 dark:bg-gray-800">
        <NuxtImg src="/logo/seait.png" quality="20" width="24" height="24"></NuxtImg>
      </div>
      <div v-if="!isToggle" class="flex flex-col">
        <h4 class="font-bold">SUPERHURE</h4>
        <span class="text-[10px]">E-HR SYSTEM</span>

      </div>
    </div>
    <USeparator></USeparator>
    <UNavigationMenu :items="items" orientation="vertical"
      :class="isToggle ? 'lg:w-(--sidebar-compact)' : 'lg:w-(--sidebar)'"
      class="overflow-y-auto custom-scrollbar px-2 flex-2" :ui="{
        linkLabel: isToggle ? 'lg:hidden' : '',
        childItem: isToggle ? 'lg:hidden' : '',
        label: 'text-xs text-gray-600 font-medium dark:text-gray-400',
        link: 'text-(--foreground)  dark:text-(--foreground)',
        linkLeadingIcon: 'text-(--foreground) dark:text-(--foreground)'
      }">
      <template v-if="isToggle" #components-trailing>
        <span></span>
      </template>
      <template v-if="isToggle" #composables-trailing>
        <span></span>
      </template>
    </UNavigationMenu>

    <!-- custom-scrollbar -->

    <footer class="flex  relative items-center rounded-sm shadow-lg py-2 px-2">
      <UDropdownMenu arrow class="w-full" :items="itemss" :content="{

        align: 'center',
        side: 'top',

      }" :ui="{
        content: 'w-64  overflow-hidden relative lg:left-55 lg:-bottom-15 ',
        item: 'cursor-pointer text-xs font-medium'

      }">

        <UButton class="cursor-pointer flex" label="Open" color="neutral" variant="ghost">
          <div class="rounded-md  bg-gray-400 text-white dark:bg-gray-800 px-2 py-1">JD</div>
          <div v-if="!isToggle" class="flex flex-col items-center justify-start px-2 flex-1">
            <h5>Johnrey Decosta</h5>
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
  {
    label: 'Profile',
    icon: 'i-lucide-user',

  },
  { type: 'separator' },
  {
    label: 'Billing',
    icon: 'i-lucide-credit-card',

  },
  { type: 'separator' },
  {
    label: 'Log out',
    icon: 'i-lucide-cog',

  }
  
])
const items = ref([
  [
    {
      label: "Navigation",
      type: "label",
    },
    {
      label: "Home",
      icon: "i-lucide-book-open",
      to: "/composable/",
      slot: "home",
    },

    {
      label: "Composables",
      icon: "i-lucide-database",
      slot: "composables",
      children: [
        {
          label: "defineShortcuts",
          icon: "i-lucide-file-text",
          description: "Define shortcuts for your application.",
          to: "/composables/define-shortcuts",
        },
        {
          label: "useModal",
          icon: "i-lucide-file-text",
          description: "Display a modal within your application.",
          to: "/composables/use-modal",
        },
        {
          label: "useSlideover",
          icon: "i-lucide-file-text",
          description: "Display a slideover within your application.",
          to: "/composables/use-slideover",
        },
        {
          label: "useToast",
          icon: "i-lucide-file-text",
          description: "Display a toast within your application.",
          to: "/composables/use-toast",
        },
      ],
    },
    {
      label: "Components",
      icon: "i-lucide-box",
      to: "/components",
      slot: "components",
      children: [
        {
          label: "Link",
          icon: "i-lucide-file-text",
          description: "Use NuxtLink with superpowers.",
          to: "/components/link",
        },
        {
          label: "Modal",
          icon: "i-lucide-file-text",
          description: "Display a modal within your application.",
          to: "/components/modal",
        },
        {
          label: "NavigationMenu",
          icon: "i-lucide-file-text",
          description: "Display a list of links.",
          to: "/components/navigation-menu",
        },
        {
          label: "Pagination",
          icon: "i-lucide-file-text",
          description: "Display a list of pages.",
          to: "/components/pagination",
        },
        {
          label: "Popover",
          icon: "i-lucide-file-text",
          description: "Display a non-modal dialog that floats around a trigger element.",
          to: "/components/popover",
        },
        {
          label: "Progress",
          icon: "i-lucide-file-text",
          description: "Show a horizontal bar to indicate task progression.",
          to: "/components/progress",
        },
      ],
    },
    {
      label: "Employees",
      icon: "i-lucide-app-window",
      to: "/composable/",
    },
    {
      label: "Employee Performance",
      icon: "i-lucide-atom",
      to: "/composable/",
    },
    {
      label: "Hired Employees",
      icon: "i-lucide-badge-dollar-sign",
      to: "/composable/",
    },
    {
      label: "Applicants",
      icon: "i-lucide-cat",
      to: "/composable/",
    },
  ],
]);
</script>

<style lang="scss" scoped></style>
