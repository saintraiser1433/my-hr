export const useQuestions = (
  question: Ref<QuestionModel[] | undefined>,
  legend: Ref<TemplateDetail[] | undefined>,
  criteriaId: Ref<number>,
  type: "TeamLead" | "Peer" | "Custom"
) => {
  const { openModal, description, isOpen, title } = useCustomModal();
  const { $api, $toast } = useNuxtApp();
  const { handleApiError } = useErrorHandler();
  const isUpdating = ref(false);

  const legendData = computed(() => legend.value || []);
  const questionData = computed(() => question.value || [])
  const criteria = ref(criteriaId.value)

  const idKey = computed(() => {
    if (type === "TeamLead") return "teamLeadCriteriaId";
    if (type === "Peer") return "peerId";
    return "assignTaskCriteriaId";
  });

  const initialState = {
    id: undefined,
    question: undefined,
    type: type,
    [idKey.value]: criteria.value,
  };




  const questionForm = reactive<{ [key: string]: any }>({ ...initialState });
  const questionEvalRepo = repository<QuestionModel>($api, "/question");

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
      questionForm[idKey.value] = criteria.value;
      questionForm.teamLeadCriteriaId = criteria.value
    } catch (error) {
      return handleApiError(error);
    }
  };

  const edit = (response: QuestionModel) => {
    questionForm.id = response.id;
    questionForm.question = response.question;
    questionForm[idKey.value] = criteria.value;
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
    questionForm[idKey.value] = criteria.value;
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