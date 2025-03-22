<script lang="ts" setup>
import type { ECBasicOption } from 'echarts/types/dist/shared';

defineProps({
  option: Object as PropType<ECBasicOption>,
  title:{
    type:String,
    default:''
  }
})


const chart = useTemplateRef("chart");

const hideToolbox = () => {
  chart.value?.setOption({ toolbox: { show: false } });
}
const showToolbox = () => {
  chart.value?.setOption({ toolbox: { show: true } });
}
</script>

<template>
  <UCard :ui="{
    root: 'overflow-hidden my-5',
    body: 'p-0 sm:p-0',
    footer: 'p-0 sm:px-0',
  }">
    <div class="flex items-center justify-center py-2">
      <h2 class="font-semibold">{{ title }}</h2>
    </div>
    <div class="py-2 w-full h-[400px] relative">
      <ClientOnly>
        <VChart ref="chart" :option="option" class="w-full h-full" :auto-resize="true" @native:mouseenter="showToolbox"
          @globalout="hideToolbox()" />
      </ClientOnly>
    </div>
  </UCard>
</template>
