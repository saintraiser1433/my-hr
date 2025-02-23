<script setup lang="ts">
const isToggle = useState("toggle", () => false);

const toggle = () => {
  isToggle.value = !isToggle.value;
};
</script>

<template>
  <div class="flex items-center w-full">
    <!-- sidebar -->
    <DashboardSidebar />
    <!-- header -->
    <DashboardHeader />

    <!-- main -->
    <main
      :class="
        isToggle
          ? 'lg:w-[calc(100%-var(--sidebar-compact))]'
          : 'lg:w-[calc(100%-var(--sidebar))]'
      "
      class="absolute transition-all ease-in-out right-0 top-0 h-full max-w-full w-full mt-16 p-5"
    >
      <slot />
    </main>

    <div
      v-if="!isToggle"
      @click="toggle"
      class="fixed inset-0 bg-black opacity-80 z-30 lg:hidden"
    ></div>
  </div>

  <!-- //main -->
</template>
