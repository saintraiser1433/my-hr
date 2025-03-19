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
const selectedEmployee = ref<ListEmployee>({});

const criteriaId = ref<number>(0);
const employeeId = ref<number>(0);
// const teamleadData = ref<CriteriaColleague[]>([]);
const question = ref<QuestionModel[]>([]);
const legend = ref<TemplateDetail[]>([]);
const colleagueItems = computed(() => employee.value || []);
const empId = computed(() => selectedEmployee.value.id || 0);
const groups = ref([
  {
    id: "Colleagues",
    label: "Colleagues",
    items: colleagueItems,
  },
]);
const { data: employee, status: statEmp, error: errEmp } = await useAPI<ListEmployee[]>(
  `/teamlead/main/emp/${store.departmentId}`,
  {
    transform: (data) => {
      return data.map((item) => ({
        id: item.id,
        label: item.label,
        suffix: item.suffix,
        avatar: {
          src: `${config.public.STORAGE_URL_AVATAR}/${item.photo}`,
        },
      }));
    },
  }
);

const { data: result, error:errorEvaluation  } = await useAPI<CriteriaColleague[]>(
  `/teamlead/main/criteria`,{
    watch:[selectedEmployee],
    immediate:false,
    params:{
      acadId: route.params.acadId,
      empId: empId
    },
    server:false
  },
);


const {
  toggleModal,
  remove,
  edit,
  submit,
  teamleadForm,
  dataTeamlead,
  description,
  title,
  isOpen,
} = useTeamLeadCategories(
  result,
  Number(route.params.acadId),
  "/teamlead/main/criteria",
  employeeId
);

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
} = useQuestions(question, legend, criteriaId, "Custom");

const fetchPeerQuestion = async (item: TeamLeadCriteria) => {
  try {
    const response = await $api<CombinedPeerQuestionWithLegend>(
      `/question/custom/${item.id}`
    );
    question.value = response.questions || [];
    legend.value = response.legends || [];
    criteriaId.value = item.id || 0;
    questionOpenModal(`${item.name}`);
  } catch (err) {
    handleApiError(err);
  }
};

watch(
  () => selectedEmployee.value?.id ?? null,
  async (newId) => {
    if (!newId) {
      return;
    }
    employeeId.value = newId;
   
  },
);
</script>

<template>
  <EvaluationTeamleadCriteriaForm
    @data-criteria="submit"
    :description="description"
    v-model:state="teamleadForm"
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

  <div class="flex flex-col items-center lg:items-start mb-3">
    <h2 class="font-extrabold text-2xl">Criteria Module</h2>
    <span class="text-sm">Here's a list of Criteria module!</span>
  </div>
  <div class="grid grid-cols-12 gap-2">
    <div class="col-span-4">
      <UCard
        :ui="{
          body: 'p-0 sm:p-0',
          footer: 'p-0 sm:px-0',
        }"
      >
        <UCommandPalette v-model="selectedEmployee" :groups="groups" class="flex-1" />
      </UCard>
    </div>
    <div class="col-span-8">
      <UCard
        :ui="{
          body: 'p-2 sm:p-2',
          footer: 'p-0 sm:px-0',
        }"
      >
        <EvaluationTeamleadCriteriaList
          :data="result"
          @modal-quest="fetchPeerQuestion"
          @update="edit"
          @delete="remove"
        >
          <template #actions>
            <UButton
              v-if="selectedEmployee"
              icon="i-lucide-plus"
              size="sm"
              variant="solid"
              @click="toggleModal"
              >Add Criteria
            </UButton>
          </template>
        </EvaluationTeamleadCriteriaList>
      </UCard>
    </div>
  </div>
</template>
