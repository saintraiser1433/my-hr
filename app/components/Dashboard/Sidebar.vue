<script setup lang="ts">
const isToggle = useState<boolean>("toggle");
const { signOut } = useAuthentication();
const store = useAuthStore();
const config = useRuntimeConfig();

// Computed
const fullname = computed(() => {
  return store.getRole === "Admin" ? "Administrator" : store.getFullName;
});

const sideBar = computed(() => {
  if (store.getRole === "Admin") return [ADMIN_MENU_ITEMS];
  if (store.getRole === "Employee") return [EMPLOYEE_MENU_ITEMS];
  if (store.getRole === "TeamLead") return [TEAM_LEAD_MENU_ITEMS];
  return [];
});

const userInitials = computed(() => {
  const name = fullname.value || "";
  return (
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "JD"
  );
});

// Methods
const goProfile = async () => {
  await navigateTo({
    name: "Employees-information-empId",
    params: { empId: store.getId },
  });
};

const handleSignOut = async () => {
  try {
    await signOut(store.getId as number);
    await navigateTo({ name: "auth" });
  } catch (error) {}
};


const items = [

  ...(store.getRole !== 'Admin' ? [{
    label: "Profile",
    icon: "gg:profile",
    onSelect: goProfile,
  }] : []),
  
  {
    label: "Log out",
    icon: "i-material-symbols-logout-rounded",
    onSelect: handleSignOut,
  },
];
</script>
<template>
  <aside
    :class="[
      'flex transition-all ease-in-out h-full z-50 fixed top-0 left-0',
      'bg-(--sidebar-background) border-r-[1px] rounded-r-sm flex-col',
      isToggle
        ? '-translate-x-full lg:translate-x-0 lg:w-(--sidebar-compact)'
        : 'translate-x-0 w-(--msidebar) lg:w-(--sidebar)',
    ]"
    aria-label="Main navigation"
  >
    <!-- Header -->
    <div class="flex items-center gap-2 px-3  h-14 flex-none">
      <div
        class="relative flex items-center justify-center p-1 rounded-lg bg-gray-700 dark:bg-gray-800"
      >
        <NuxtImg
          src="/logo/seait.png"
          quality="20"
          width="24"
          height="24"
          alt="Company Logo"
          loading="lazy"
        />
      </div>
      <Transition name="fade">
        <div v-if="!isToggle" class="flex flex-col">
          <h4 class="font-bold">SUPERHURE</h4>
          <span class="text-[10px]">E-HR SYSTEM</span>
        </div>
      </Transition>
    </div>

    <USeparator />

    <!-- Navigation Menu -->
    <UNavigationMenu
      :items="sideBar"
      orientation="vertical"
      :class="isToggle ? 'lg:w-(--sidebar-compact) ' : 'lg:w-(--sidebar)'"
      class="overflow-y-auto custom-scrollbar  px-2  flex-2"
      :ui="{
        linkLeadingIcon: '-ml-1',
        linkLabel: isToggle ? 'lg:hidden' : '',
        linkTrailingIcon: isToggle ? 'lg:hidden' : '',
        label: 'text-xs text-gray-600 font-medium dark:text-gray-400',
      }"
    >
      <template v-if="isToggle" #components-trailing>
        <span></span>
      </template>
    </UNavigationMenu>

    <!-- Footer -->
    <footer
      class="flex relative items-center justify-center rounded-sm shadow-lg mt-auto"
    >
      <UDropdownMenu
        arrow
        class="w-full"
        :items="items"
        :content="{ align: 'center', side: 'top' }"
        :ui="{
          content: 'w-64 lg:w-52 overflow-hidden relative',
          item: 'cursor-pointer text-xs font-normal',
        }"
      >
        <UButton
          label="User menu"
          color="neutral"
          variant="ghost"
          aria-label="User menu"
        >
          <NuxtImg  v-if="store.photo_path" height="36" width="36"  class="rounded-md" :src="`${config.public.STORAGE_URL_AVATAR}/${store.photo_path}`"></NuxtImg>
          <div v-else class="rounded-md bg-gray-400 text-white dark:bg-gray-800 px-3 py-2 text-md">
            {{ userInitials }}
          </div>
          <Transition name="fade">
            <div
              v-if="!isToggle"
              class="flex flex-col px-2"
            >
              <span class="text-xs capitalize  font-semibold">{{ fullname }}</span>
              <span class="text-xs capitalize font-normal text-left">{{ store.getRole }}</span>
            </div>
          </Transition>
          <div class="flex-1"></div>
          <div v-if="!isToggle" class="flex-none">
            <Icon name="lucide:chevrons-up-down" class="h-4 w-4" />
          </div>
        </UButton>
      </UDropdownMenu>
    </footer>
  </aside>
</template>


