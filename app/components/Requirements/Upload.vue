<script setup lang="ts">
defineProps({
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
});
const emits = defineEmits(['submit'])
const isSubmitted = ref(false);
const {
    file,
    onFileChange,
} = useFileDialog("require");

const submitUpload = () => {
  isSubmitted.value = true;
  if(file.value){
    emits('submit',file.value)
  }
}

const open = defineModel("open", { default: false, required: true });
</script>

<template>
    <UModal
        v-model:open="open"
        :description="description"
        :title="title"
        :ui="{ content: 'max-w-sm' }">
        <template #body>
            <UInput
                type="file"
                @change="onFileChange"
                accept="images/*"
                class="w-full"
                size="sm" />
                <p class="italic text-xs py-2">Note: Only pdf and image can upload up to (5mb)</p>
                <p v-if="!file && isSubmitted" class="text-red-500 py-2 font-semibold">No file found</p>
        </template>
    <template #footer>
      <UButton label="Cancel" color="neutral" variant="outline" @click="open = false" />
      <UButton label="Submit" type="submit" color="neutral" @click="submitUpload" />
    </template>
    </UModal>
</template>
