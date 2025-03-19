<script lang="ts" setup>
const open = defineModel("open", { default: false, required: true });
const emits = defineEmits<{
  (e: "assign", payload: AssignPeerEvaluations): void;
}>();
const props = defineProps({
  title: {
    type: String,
    required: true,
    default: "",
  },
  description: {
    type: String,
    required: true,
    default: "",
  },
  departmentId:{
    type:Number,
    required:true,
    default:0
  },
  academicYearId:{
    type:Number,
    required:true,
    default:0
  }

})

const peersToEvaluate = ref(1);
const onSubmit = () => {
  const data = {
    academicYearId:props.academicYearId,
    departmentId:props.departmentId,
    peersToEvaluate:peersToEvaluate.value
  }
  emits("assign",data );
};

</script>

<style>

</style>
<template>
  <UModal v-model:open="open" :description="description" :title="title" :ui="{ content: 'max-w-sm' }">
          
          <template #body>
            <div class="flex flex-col items-center gap-2">
              <h4 class="font-semibold">PEERS:  <span class="font-normal">123</span></h4>
              <USeparator class="py-2"></USeparator>
              <div class="flex flex-col items-center gap-2">
                <h4 class="font-semibold">PEERS TO EVALUATE: </h4>
                <UInputNumber v-model="peersToEvaluate"  :default-value="1" :min="1" />
              </div>
            </div>
          </template>
          <template #footer>
            <UButton label="Cancel" color="neutral" variant="outline" @click="open = false" />
            <UButton label="Submit" type="submit" color="neutral" @click="onSubmit" />
          </template>
          <!-- <template #content>
              <div class="flex flex-col gap-2">
                <h3>Label</h3>
              </div>
          </template> -->
        </UModal>
</template>

