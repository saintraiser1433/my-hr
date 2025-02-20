<script setup lang="ts"></script>

<template>
  <div class="grid grid-cols-[14rem_1fr] grid-rows-[auto_1fr] h-screen">
    <div class="row-span-2"><DashboardSidebar /></div>
    <div class="col-span-1"><DashboardHeader /></div>

    <div class="col-span-1 relative mt-16 p-5">
      <main>
        <slot></slot>
      </main>
    </div>
  </div>
</template>
