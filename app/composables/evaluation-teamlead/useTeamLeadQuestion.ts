export const useTeamLeadQuestion = (
  question: Ref<QuestionModel[] | undefined>,
  legend: Ref<TemplateDetail[] | undefined>,
  criteriaId: Ref<number>
) => {
  const { openModal, description, isOpen, title } = useCustomModal();
  const { $api, $toast } = useNuxtApp();
  const { handleApiError } = useErrorHandler();
  const isUpdating = ref(false);

  const legendData = computed(() => legend.value || []);
  const questionData = computed(() => question.value || [])
  const criteria = ref(criteriaId.value)
  const initialState = {
    id: undefined,
    question: undefined,
    teamLeadCriteriaId: criteria.value,
  };
  const questionForm = reactive<QuestionModel>({ ...initialState });
  const questionEvalRepo = repository<QuestionModel>($api, "/teamlead/q");

  const submit = async (response: any) => {
    try {
      if (!isUpdating.value) {
        const res = await questionEvalRepo.add(response);
        question.value = [...(question.value || []), res.data as QuestionModel];
        $toast.success(res.message);
      } else {
        const res = await questionEvalRepo.update(response);
        if (res.data) {
          const data = res.data as QuestionModel;
          question.value = question.value?.map((item) =>
            item.id === data.id ? data : item
          );
        }
        $toast.success(res.message);
      }
      resetForm();
      questionForm.teamLeadCriteriaId = criteria.value
    } catch (error) {
      return handleApiError(error);
    }
  };

  const edit = (response: QuestionModel) => {
    questionForm.id = response.id;
    questionForm.question = response.question;
    questionForm.teamLeadCriteriaId = response.teamLeadCriteriaId;
    isUpdating.value = true;
  };

  const remove = (id: number) => {
    setAlert("warning", "Are you sure you want to delete?", "", "Confirm delete").then(
      async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await questionEvalRepo.delete(id);
            question.value = question.value?.filter((item) => item.id !== id);
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
    isUpdating.value = false;
  };

  watch(criteriaId, (newVal) => {
    criteria.value = newVal;
    questionForm.teamLeadCriteriaId  = newVal;
  });

  return {
    questionisOpen: isOpen,
    questionOpenModal: openModal,
    questionDesc: description,
    questionTitle: title,
    questionForm,
    legendData,
    questionData,
    submitQuestion: submit,
    editQuestion: edit,
    removeQuestion: remove,
    isUpdating,
    resetForm,
  };
};