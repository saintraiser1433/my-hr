<script lang="ts" setup>
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
  questionData: {
    type: Array as PropType<QuestionModel[]>,
    default: () => []
  },
  legendData: {
    type: Array as PropType<TemplateDetail[]>,
    default: () => []
  },
  isUpdating: {
    type: Boolean,
    default: false
  }
});

const emits = defineEmits<{
  (e: "edit", payload: QuestionModel): void;
  (e: "delete", id: number): void;
  (e: "submit", payload: QuestionModel): void;
  (e: "reset"): void;
}>();


const edit = (item: QuestionModel) => {
  emits("edit", item)
}
const remove = (id: number) => {
  emits("delete", id);

};
const submit = (item: QuestionModel) => {
  emits("submit", item);
};
const reset = () => {
  emits("reset");
};
const model = defineModel<QuestionModel>("state",{ required: true })
const open = defineModel("open", { default: false, required: true });
</script>

<style></style>

<template>
  <UModal fullscreen v-model:open="open" :description="description" :title="title" :overlay="false" :dismissible="false">
    <template #body>
      <div class="grid grid-cols-12 gap-2">
        <div class="col-span-12 md:col-span-12 lg:col-span-3">
          <QuestionForm @data-question="submit" @cancel="reset" :isUpdate="isUpdating" v-model:state="model" />
        </div>
        <div class="col-span-12 md:col-span-12 lg:col-span-9">
          <QuestionList :data="questionData" :legend="legendData" @update="edit" @delete="remove">
          </QuestionList>
          <slot></slot>
        </div>
      </div>
    </template>
  </UModal>

</template>
