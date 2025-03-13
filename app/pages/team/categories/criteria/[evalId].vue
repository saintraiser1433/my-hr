<script setup lang="ts">
definePageMeta({
  requiredRole: "TeamLead",
});

useSeoMeta({
  title: "SUPERHURE Criteria Module",
  description: "CRUD for Criteria",
  ogTitle: "SUPERHURE Criteria Module",
  ogDescription: "CRUD for Criteria",
});

const { $api, $toast } = useNuxtApp();
const route = useRoute();
const store = useAuthStore();
const { handleApiError } = useErrorHandler();
const config = useRuntimeConfig();
const selectedEmployee = ref<ListEmployee>({})
const criteriaId = ref<number>(0);
const question = ref<QuestionModel[]>([]);
const legend = ref<TemplateDetail[]>([]);
const { data: employee, status: statEmp, error: errEmp } = await useAPI<ListEmployee[]>(
  `/teamlead/main/emp/${store.departmentId}`, {
  transform: (data) => {
    return data.map((item) => ({
      id: item.id,
      label: item.label,
      suffix: item.suffix,
      avatar: {
        src: `${config.public.STORAGE_URL_AVATAR}/${item.photo}`
      }
    }))
  }
});

const groups = ref([
  {
    id: 'Colleagues',
    label: 'Colleagues',
    items: employee
  }
])

const {
  openModal,
  description,
  updateModal,
  resetModal,
  isOpen,
  isUpdate,
  title,
} = useCustomModal();



const teamleadForm = reactive<CriteriaColleague>({
  id: undefined,
  name: "",
  teamLeadEvaluationId: Number(route.params.evalId),
  employeesId: undefined,
});
const teamleadData = ref<CriteriaColleague[]>([]);

const teamleadRepo = repository<CriteriaColleague>($api, "/teamlead/main/criteria");
const submit = async (response: CriteriaColleague) => {
  try {
    if (!isUpdate.value) {
      const res = await teamleadRepo.add(response);
      teamleadData.value = [...(teamleadData.value || []), res.data as CriteriaColleague];
      $toast.success(res.message);
    } else {
      const res = await teamleadRepo.update(response);
      if (res.data) {
        const data = res.data as CriteriaColleague;
        teamleadData.value = teamleadData.value?.map((item) =>
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

const edit = (response: CriteriaColleague) => {
  teamleadForm.id = response.id;
  teamleadForm.name = response.name;
  teamleadForm.teamLeadEvaluationId = response.teamLeadEvaluationId;
  teamleadForm.employeesId = response.employeesId;
  updateModal(`Update Criteria`);
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
          teamleadData.value = teamleadData.value?.filter((item) => item.id !== id);
          $toast.success(response.message);
        } catch (error) {
          return handleApiError(error);
        }
      }
    });
  };


// const {
//   toggleModal,
//   remove,
//   edit,
//   submit,
//   teamleadForm,
//   dataTeamlead,
//   description,
//   title,
//   isOpen
// } = useTeamLeadCategories(datas, Number(route.params.evalId));








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
} = useTeamLeadQuestion(question, legend, criteriaId)

const fetchPeerQuestion = async (item: TeamLeadCriteria) => {
  try {
    const response = await $api<CombinedPeerQuestionWithLegend>(`/teamlead/q/${item.id}`);
    question.value = response.questions || [];
    legend.value = response.legends || [];
    criteriaId.value = item.id || 0;
    questionOpenModal(`${item.name}`);
  } catch (err) {
    handleApiError(err);
  }
};

watch(
  () => selectedEmployee.value.id,
  async (newId) => {
    const id = newId ?? 0;
    try {
      const response = await $api<CriteriaColleague[]>(
        `/teamlead/main/criteria/${route.params.evalId}/${id}`
      );
      teamleadData.value = response || [];
      teamleadForm.employeesId = id;
    } catch (err) {
      handleApiError(err);
    }
  },
  { flush: 'post' }

);




</script>

<template>

  <EvaluationTeamleadCriteriaForm @data-criteria="submit" :description="description" v-model:state="teamleadForm"
    :title="title" v-model:open="isOpen" />
  <Question :title="questionTitle" :is-updating="isUpdating" :legend-data="legendData" :description="questionDesc"
    :question-data="questionData" @submit="submitQuestion" @edit="editQuestion" @delete="removeQuestion"
    @reset="resetForm" v-model:open="questionisOpen" v-model:state="questionForm">
  </Question>

  <div class="flex flex-col items-center lg:items-start mb-3">
    <h2 class="font-extrabold text-2xl">Criteria Module</h2>
    <span class="text-sm">Here's a list of Criteria module!</span>
  </div>
  <div class="grid grid-cols-12 gap-2">
    <div class="col-span-4">
      <UCard :ui="{
        body: 'p-0 sm:p-0',
        footer: 'p-0 sm:px-0',
      }">
        <UCommandPalette v-model="selectedEmployee" :groups="groups" class="flex-1" />
      </UCard>

    </div>
    <div class="col-span-8">
      <UCard :ui="{
        body: 'p-2 sm:p-2',
        footer: 'p-0 sm:px-0',
      }">
        <EvaluationTeamleadCriteriaList :data="teamleadData" @modal-quest="fetchPeerQuestion" @update="edit"
          @delete="remove">
          <template #actions>
            <UButton v-if="selectedEmployee" icon="i-lucide-plus" size="sm" variant="solid"
              @click="openModal('Add Criteria')">Add
              Criteria
            </UButton>
          </template>
        </EvaluationTeamleadCriteriaList>
      </UCard>

    </div>
  </div>


</template>
