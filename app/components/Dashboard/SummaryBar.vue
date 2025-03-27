<script setup lang="ts">
defineProps({
    total:{
        type:Number,
        default:0,
    },
    title:{
        type:String,
        default:'',
    }
})
</script>
<template>
       <UCard
        :ui="{
          body: 'p-2 sm:p-2',
          root: 'border-l-5 border-(--ui-primary) rounded-lg',
        }"
      >
      <div class="flex justify-between items-center gap-2">
        <div>
            <h2 class="font-semibold">{{total}}</h2>
          <h4>{{title}}</h4>
          
        </div>
       <slot name="icon"></slot>
        
      </div>
      </UCard>
</template>