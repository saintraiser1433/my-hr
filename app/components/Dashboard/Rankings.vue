<script lang="ts" setup>
const props = defineProps({
  title: String,
  subtitle: String,
  data: {
    type:Array as PropType<RankingModel[]>,
    default: () => [],
  }
});
const { data } = toRefs(props);
const config = useRuntimeConfig();
const transformData = computed(() => data.value.slice(0,10));

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
        <slot name="right"></slot>
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
      <div v-for="(i,index) in transformData" :key="index" class="grid grid-cols-12 gap-3 p-2 text-sm text-center">
        <div class="col-span-1 flex justify-center items-center gap-2">
          <svg-icon v-if="index + 1 === 1" name="iconx/firstmedal" width="24" height="24" />
          <svg-icon v-else-if="index + 1 === 2" name="iconx/secondmedal" width="24" height="24" />
          <svg-icon v-else-if="index + 1 === 3" name="iconx/thirdmedal" width="24" height="24" />
        </div>
        <div class="col-span-1 capitalize flex gap-2 items-center justify-center">{{ index+1 }}</div>
        <div class="col-span-5 capitalize flex gap-2 items-center justify-center font-semibold"><UAvatar size="lg" :src="`${config.public.STORAGE_URL_AVATAR}/${i.photo_path}`"/>{{ i.name }}</div>
        <div class="col-span-3 capitalize flex gap-2 items-center justify-center line-clamp-3">
          {{ i.departmentName }}
        </div>
        <div class="col-span-2 flex gap-2 items-center justify-center font-semibold">{{ i.averageRating }}</div>
      </div>
      
    </div>
  </UCard>
</template>
