
<script setup lang="ts">
import type { ECBasicOption } from "echarts/types/dist/shared";
defineProps({
    data: {
        type: Object as PropType<ECBasicOption>,
        required:true,
    },
    title: {
        type:String,
        default: ''
    },
    description: {
        type:String,
        default: '' 
    }
})

</script>

<template>
    <UCard
        :ui="{
          header: 'p-0 px-2 py-2 sm:p-0 sm:px-2 sm:py-2',
          root: 'border-b-3 border-(--ui-primary) rounded-md',
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-semibold">{{title}}</h3>
              <span class="italic text-xs"
                >{{description}}</span
              >
            </div>
            <slot name="icon"></slot>
            
          </div>
        </template>
        <div class="w-full h-[400px] relative">
          <VChart
            ref="chart"
            :option="data"
            class="w-full h-full"
            :auto-resize="true"
          />
        </div>
    </UCard>
    
</template>