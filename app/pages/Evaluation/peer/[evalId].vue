<script setup lang="ts">
import { dataTool } from 'echarts';

definePageMeta({
  requiredRole: "admin",
});

useSeoMeta({
  title: "SUPERHURE Evaluation Module",
  description: "CRUD for Evaluation",
  ogTitle: "SUPERHURE Evaluation Module",
  ogDescription: "CRUD for Evaluation",
});

const { $api, $toast } = useNuxtApp();
const route = useRoute();
const { handleApiError } = useErrorHandler();
const { openModal,description, updateModal, resetModal, isOpen, isUpdate, title } = useCustomModal();

const initialState = {
  id: undefined,
  title: "",
  evaluationId: Number(route.params.evalId),
};
const value = ref(0)
const peerForm = reactive<PeerModel>({ ...initialState });
const peerData = ref<PeerModel[]>([]);
const itemTemplate = computed(() => template.value?.map((item) => ({
  id: item.id,
  label: item.template_name,
})))
const { data: template, status: statusTemp, error: errorTemp } = await useAPI<TemplateModel[]>("/template");

const { data, status, error } = await useAPI<PeerModel[]>(
  `/evaluation/peer/${route.params.evalId}`
);
if (data.value) {
  peerData.value = data.value;
}
if (error.value) {
  $toast.error(error.value.message || "Failed to fetch items");
}



const peerRepo = repository<PeerModel>($api, "/evaluation/peer");
const submit = async (response: PeerModel) => {
  try {
    if (!isUpdate.value) {
      const res = await peerRepo.add(response); //error on this code
      peerData.value = [...peerData.value, res.data as PeerModel];
      $toast.success(res.message);
    } else {
      const res = await peerRepo.update(response); //error on this code
      if (res.data) {
        const data = res.data as PeerModel;
        peerData.value = peerData.value.map((item) =>
          item.id === data.id ? {...item,...data} : item
        );
      }

      $toast.success(res.message);
    }
    resetModal();
  } catch (error) {
    return handleApiError(error);
  }
};

const assignTemplateRepo = repository<PeerModel>($api, "/evaluation/peer/temp");
const applyAll = async () => {
  const template = itemTemplate.value?.find((item) => item.id === value.value);
  setAlert(
    "warning",
    `Are you sure you want to replace all category templates with ${template?.label} `,
    "",
    "Confirm to replace"
  ).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const data = {
          id: Number(route.params.evalId),
          templateHeaderId: value.value,
        }

        const response = await assignTemplateRepo.update(data);
        $toast.success(response.message);

        peerData.value = peerData.value.map((item) => ({
          ...item,
          template: template?.label,
        }))
        value.value = 0
      } catch (error) {
        return handleApiError(error);
      }
    }
  });
}
const assignTemplateSingleRepo = repository<PeerModel>($api, "/evaluation/peer/temp/s");
const applySingle = async (res: PeerModel) => {
  try {

    const data = {
      id: res.id,
      template: res.template,
      templateHeaderId: res.templateHeaderId,
    }
    const response = await assignTemplateSingleRepo.update(data);
    peerData.value = peerData.value.map((item) => item.id === data.id ? { ...item, ...data } : item);
    $toast.success(response.message);
  } catch (error) {
    return handleApiError(error);
  }
}

const edit = (response: PeerModel) => {
  peerForm.id = response.id;
  peerForm.title = response.title;
  updateModal(`Update Category`);
};

const remove = (id: number) => {
  setAlert(
    "warning",
    "Are you sure you want to delete once delete it will delete also all the question associate in this category",
    "",
    "Confirm delete"
  ).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await peerRepo.delete(id);
        peerData.value = peerData.value.filter((item) => item.id !== id);
        $toast.success(response.message);
      } catch (error) {
        return handleApiError(error);
      }
    }
  });
};




const resetForm = () => {
  Object.assign(peerForm, initialState);
};

const toggleModal = () => {
  resetForm();
  openModal(`Add Category`);
};
</script>

<template>
  <div>
    <EvaluationPeerForm @data-peer="submit" :description="description" v-model:state="peerForm" :title="title" v-model:open="isOpen" />
    <div class="flex flex-col items-center lg:items-start mb-3">
      <h2 class="font-extrabold text-2xl">Peer to Peer Categories Module</h2>
      <span class="text-sm">Here's a list of peer to peer categories available!</span>
    </div>

    <EvaluationPeerList :data="peerData" @single-apply="applySingle" :item-template="itemTemplate" @update="edit"
      @delete="remove">
      <template #actions>

        <USelectMenu v-model="value" value-key="id" :items="itemTemplate" class="w-48" :ui="{
          item: 'capitalize'
        }" placeholder="Select Template" />

        <UButton v-if="value" icon="i-lucide-check" size="sm" color="success" variant="solid" @click="applyAll">Apply
          to all</UButton>

        <UButton icon="i-lucide-plus" size="sm" variant="solid" @click="toggleModal">Add Peer Category</UButton>
      </template>
    </EvaluationPeerList>
  </div>
</template>
