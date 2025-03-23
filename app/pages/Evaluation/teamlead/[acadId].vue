<script setup lang="ts">
definePageMeta({
  requiredRole: "Admin",
});

useSeoMeta({
  title: "SUPERHURE Teamlead Module",
  description: "CRUD for Teamlead",
  ogTitle: "SUPERHURE Teamlead Module",
  ogDescription: "CRUD for Teamlead",
});

const { $api, $toast } = useNuxtApp();
const route = useRoute();
const { handleApiError } = useErrorHandler();
const {
  openModal,
  description,
  updateModal,
  resetModal,
  isOpen,
  isUpdate,
  title,
} = useCustomModal();

const initialState = {
  id: undefined,
  name: "",
  academicYearId: Number(route.params.acadId),
  percentage: undefined,
  forTeamLead: false,
};
const teamleadForm = reactive<TeamLeadModel>({ ...initialState });
const teamleadData = ref<TeamLeadModel[]>([]);
const itemTemplate = computed(() =>
  template.value?.map((item) => ({
    id: item.id,
    label: item.template_name,
  }))
);
const { data: template, status: statusTemp, error: errorTemp } = await useAPI<
  TemplateModel[]
>("/template");
const { data, status, error } = await useAPI<TeamLeadModel[]>(
  `/teamlead/${route.params.acadId}`
);
if (data.value) {
  teamleadData.value = data.value;
}
if (error.value) {
  $toast.error(error.value.message || "Failed to fetch items");
}

const teamleadRepo = repository<TeamLeadModel>($api, "/teamlead");
const submit = async (response: TeamLeadModel) => {
  try {
    if (!isUpdate.value) {
      const res = await teamleadRepo.add(response); //error on this code
      teamleadData.value = [...teamleadData.value, res.data as TeamLeadModel];
      $toast.success(res.message);
    } else {
      const res = await teamleadRepo.update(response); //error on this code
      if (res.data) {
        const data = res.data as TeamLeadModel;
        teamleadData.value = teamleadData.value.map((item) =>
          item.id === data.id ? { ...item, ...data } : item
        );
      }

      $toast.success(res.message);
    }
    resetModal();
  } catch (error) {
    return handleApiError(error);
  }
};

const edit = (response: TeamLeadModel) => {
  teamleadForm.id = response.id;
  teamleadForm.name = response.name;
  teamleadForm.percentage = Number(response.percentage);
  teamleadForm.forTeamLead = response.forTeamLead;
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
        const response = await teamleadRepo.delete(id);
        teamleadData.value = teamleadData.value.filter((item) => item.id !== id);
        $toast.success(response.message);
      } catch (error) {
        return handleApiError(error);
      }
    }
  });
};

const resetForm = () => {
  Object.assign(teamleadForm, initialState);
};

const toggleModal = () => {
  resetForm();
  openModal(`Add Category`);
};
</script>

<template>
  <div>
    <EvaluationTeamleadForm
      @data-teamlead="submit"
      :description="description"
      v-model:state="teamleadForm"
      :title="title"
      v-model:open="isOpen"
    />
    <div class="flex flex-col items-center lg:items-start mb-3">
      <h2 class="font-extrabold text-2xl">Employee Performance Appraisal Module</h2>
      <span class="text-sm">Here's a list of employee performance appraisal module!</span>
    </div>
    <UCard
      :ui="{
        root: 'border-b-3 border-(--ui-primary) rounded-md',
      }"
    >
      <EvaluationTeamleadList
        :data="teamleadData"
        :item-template="itemTemplate"
        @update="edit"
        @delete="remove"
      >
        <template #actions>
          <UButton icon="i-lucide-plus" size="sm" variant="solid" @click="toggleModal"
            >Add Category</UButton
          >
        </template>
      </EvaluationTeamleadList>
    </UCard>
  </div>
</template>
