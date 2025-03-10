<script setup lang="ts">
definePageMeta({
  requiredRole: "admin",
});

useSeoMeta({
  title: "SUPERHURE Peer Question Module",
  description: "CRUD for Peer Question",
  ogTitle: "SUPERHURE Peer Question Module",
  ogDescription: "CRUD for Peer Question",
});

const { $api, $toast } = useNuxtApp();
const { handleApiError } = useErrorHandler();
const route = useRoute();

const isUpdate = ref(false);
const initialState = {
  id: undefined,
  question: undefined,
  peerId: Number(route.params.peerId),
};

const questionForm = reactive<PeerQuestionModel>({ ...initialState });
const questionData = ref<PeerQuestionModel[]>([]);
const legendData = ref<TemplateDetail[]>([])
const { data, status, error } = await useAPI<CombinedPeerQuestionWithLegend>(
  `/evaluation/peer/q/${route.params.peerId}`
);
if (data.value) {
  questionData.value = data.value.questions;
  legendData.value = data.value.legends
}
if (error.value) {
  $toast.error(error.value.message || "Failed to fetch items");
}

const questionEvalRepo = repository<PeerQuestionModel>($api, "/evaluation/peer/q");
const submit = async (response: any) => {
  try {
    if (!isUpdate.value) {
      const res = await questionEvalRepo.add(response); //error on this code
      questionData.value = [...questionData.value, res.data as PeerQuestionModel]; // Add new item at the start
      $toast.success(res.message);
    } else {
      const res = await questionEvalRepo.update(response); //error on this code
      console.log(response);
      if (res.data) {
        const data = res.data as PeerQuestionModel;
        questionData.value = questionData.value.map((item) =>
          item.id === data.id ? data : item
        );
      }

      $toast.success(res.message);
    }
    resetForm();
  } catch (error) {
    return handleApiError(error);
  }
};

const edit = (response: PeerQuestionModel) => {
  questionForm.id = response.id;
  questionForm.question = response.question;
  questionForm.peerId = response.peerId;
  isUpdate.value = true;
};

const remove = (id: number) => {
  setAlert("warning", "Are you sure you want to delete?", "", "Confirm delete").then(
    async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await questionEvalRepo.delete(id);
          questionData.value = questionData.value.filter((item) => item.id !== id);
          $toast.success(response.message);
        } catch (error) {
          return handleApiError(error);
        }
      }
    }
  );
};

const resetForm = () => {
  Object.assign(questionForm, initialState);
  isUpdate.value = false;
};
</script>

<template>

  <div class="flex flex-col items-center lg:items-start mb-3">
    <h2 class="font-extrabold text-2xl">Question Module</h2>
    <span class="text-sm">Here's a list of Question available!</span>
  </div>

  <div class="grid grid-cols-12 gap-2">
    <div class="col-span-12 md:col-span-12 lg:col-span-3">
      <EvaluationPeerQuestionForm
        @data-question="submit"
        @cancel="resetForm"
        :isUpdate="isUpdate"
        v-model:state="questionForm"
      />
    </div>
    <div class="col-span-12 md:col-span-12 lg:col-span-9">
      <EvaluationPeerQuestionList :data="questionData" :legend="legendData" @update="edit" @delete="remove">
      </EvaluationPeerQuestionList>
    </div>
  </div>
</template>
