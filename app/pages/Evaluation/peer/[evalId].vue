<script setup lang="ts">
definePageMeta({
    requiredRole: "Admin",
});

useSeoMeta({
  title: "SUPERHURE Evaluation Module",
  description: "CRUD for Evaluation",
  ogTitle: "SUPERHURE Evaluation Module",
  ogDescription: "CRUD for Evaluation",
});

const { $api, $toast } = useNuxtApp();
const { handleApiError } = useErrorHandler();
const route = useRoute();
const peerId = ref<number>(0);
const question = ref<QuestionModel[]>([]);
const legend = ref<TemplateDetail[]>([]);
const { data: template, status: statusTemp, error: errorTemp } = await useAPI<
  TemplateModel[]
>("/template");
const { data, status, error } = await useAPI<PeerModel[]>(`/peer/${route.params.evalId}`);

if (error.value) {
  $toast.error(error.value.message || "Failed to fetch items");
}

const {
  selectValue,
  peerData,
  peerForm,
  itemTemplate,
  description,
  title,
  isOpen,
  applyAll,
  applySingle,
  submit,
  edit,
  remove,
  toggleModal,
} = usePeerCategories(data, template, Number(route.params.evalId));

const {
  isUpdating,
  questionisOpen,
  questionDesc,
  questionTitle,
  questionForm,
  legendData,
  questionData,
  questionOpenModal,
  submitQuestion,
  editQuestion,
  removeQuestion,
  resetForm,
} = usePeerQuestion(question, legend, peerId);

const fetchPeerQuestion = async (item: PeerModel) => {
  try {
    const response = await $api<CombinedPeerQuestionWithLegend>(`/peer/q/${item.id}`);
    question.value = response.questions || [];
    legend.value = response.legends || [];
    peerId.value = item.id || 0;
    questionOpenModal(`${item.name}`);
  } catch (err) {
    handleApiError(err);
  }
};
</script>

<template>

  <EvaluationPeerForm
    @data-peer="submit"
    :description="description"
    v-model:state="peerForm"
    :title="title"
    v-model:open="isOpen"
  />
  <Question
    :title="questionTitle"
    :is-updating="isUpdating"
    :legend-data="legendData"
    :description="questionDesc"
    :question-data="questionData"
    @submit="submitQuestion"
    @edit="editQuestion"
    @delete="removeQuestion"
    @reset="resetForm"
    v-model:open="questionisOpen"
    v-model:state="questionForm"
  >
  </Question>
  <div>
    <div class="flex flex-col items-center lg:items-start mb-3">
      <h2 class="font-extrabold text-2xl">Peer to Peer Categories Module</h2>
      <span class="text-sm">Here's a list of peer to peer categories available!</span>
    </div>

    <EvaluationPeerList
      @modal-quest="fetchPeerQuestion"
      :data="peerData"
      :item-template="itemTemplate"
      @single-apply="applySingle"
      @update="edit"
      @delete="remove"
    >
      <template #actions>
        <USelectMenu
          v-model="selectValue"
          value-key="id"
          :items="itemTemplate"
          class="w-48"
          :ui="{
            item: 'capitalize',
          }"
          placeholder="Select Template"
        />

        <UButton
          v-if="selectValue"
          icon="i-lucide-check"
          size="sm"
          color="success"
          variant="solid"
          @click="applyAll"
        >
          Apply to all</UButton
        >

        <UButton icon="i-lucide-plus" size="sm" variant="solid" @click="toggleModal"
          >Add Peer Category</UButton
        >
      </template>
    </EvaluationPeerList>
  </div>
</template>
