<script lang="ts" setup>
defineProps({
  title: String,
  subtitle: String,
});
</script>

<template>
  <UCard
    :ui="{
      root: 'border-b-3 border-(--ui-primary) rounded-md',
      header: 'p-0 px-2 py-2 sm:p-0 sm:px-2 sm:py-2',
    }"
  >
    <template #header>
      <div class="flex items-center justify-between">
        <div>
          <h3 class="font-semibold *:">{{ title }}</h3>
          <span class="italic text-xs">{{ subtitle }}</span>
        </div>
        <svg-icon name="iconx/peertop" width="32" height="32"></svg-icon>
      </div>
    </template>
    <div class="grid grid-cols-12 gap-3 p-2 text-center font-bold">
      <div class="col-span-1"></div>
      <div class="col-span-1">Rank</div>
      <div class="col-span-5">Name</div>
      <div class="col-span-3">Department</div>
      <div class="col-span-2">Rating</div>
    </div>

    <div class="divide-y divide-gray-200 dark:divide-gray-700">
      <!-- v-for="(data, index) in data" -->
      <div class="grid grid-cols-12 gap-3 p-2 text-sm text-center">
        <div class="col-span-1 flex justify-center items-center gap-2">
          <svg-icon name="iconx/firstmedal" width="24" height="24" />
        </div>
        <div class="col-span-1">1</div>
        <div class="col-span-5 capitalize">John Rey Decosta</div>
        <div class="col-span-3 line-clamp-3">
          Department of College Of Information Technology
        </div>
        <div class="col-span-2">5.3</div>
      </div>
      <div class="grid grid-cols-12 gap-3 p-2 text-sm text-center">
        <div class="col-span-1 flex justify-center items-center gap-2">
          <svg-icon name="iconx/secondmedal" width="24" height="24" />
        </div>
        <div class="col-span-1">2</div>
        <div class="col-span-5 capitalize">John Rey Decosta</div>
        <div class="col-span-3 line-clamp-3">
          Department of College Of Information Technology
        </div>
        <div class="col-span-2">5.3</div>
      </div>
      <div class="grid grid-cols-12 gap-3 p-2 text-sm text-center">
        <div class="col-span-1 flex justify-center items-center gap-2">
          <svg-icon name="iconx/thirdmedal" width="24" height="24" />
        </div>
        <div class="col-span-1">3</div>
        <div class="col-span-5 capitalize">John Rey Decosta</div>
        <div class="col-span-3 line-clamp-3">
          Department of College Of Information Technology
        </div>
        <div class="col-span-2">5.3</div>
      </div>
    </div>
  </UCard>
</template>
