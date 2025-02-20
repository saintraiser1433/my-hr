<template>
  <aside :class="!isToggle ? 'lg:w-(--sidebar-compact)' : ''" class="fixed top-0 sidebar">
    <!-- avatar -->
    <div class="flex items-center gap-2 px-2 py-3">
      <div class="relative flex items-center justify-center p-2 rounded-lg bg-black/80">
        <Icon name="fa6-brands:github-alt" class="text-white h-8 w-8" />
      </div>
      <div class="flex flex-col" :class="!isToggle ? 'hidden' : ''">
        <h4 class="font-bold">SUPERHURE</h4>
      </div>
    </div>

    <!-- MenuBar -->
    <UNavigationMenu
      :items="items"
      orientation="vertical"
      :class="!isToggle ? 'lg:w-(--sidebar-compact)' : 'lg:w-(--sidebar)'"
      class="px-2 justify-center"
      :trailing-icon="!isToggle ? 'none' : ''"
      :ui="{
        link: 'font-medium cursor-pointer px-3 py-2 text-sm text-gray-800',
        linkLabel: !isToggle ? 'hidden' : '',
        childItem: !isToggle ? 'hidden' : '',
        linkLeadingIcon: 'text-black',
      }"
    >
    </UNavigationMenu>

    <footer
      :class="!isToggle ? 'lg:w-(--sidebar-compact)' : 'lg:w-(--sidebar)'"
      class="fixed bottom-0 flex items-center bg-white rounded-sm shadow-lg py-2 px-2"
    >
      <div class="rounded-md bg-gray-200 p-1">CN</div>
      <div class="flex flex-col px-2 flex-1">
        <h5>John Doe</h5>
        <span class="text-xs">Administrator</span>
      </div>
      <div class="flex-none">
        <Icon name="lucide:chevrons-up-down" class="h-7 w-7" />
      </div>
    </footer>
  </aside>
</template>

<script setup>
const isToggle = useState("toggle");

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
