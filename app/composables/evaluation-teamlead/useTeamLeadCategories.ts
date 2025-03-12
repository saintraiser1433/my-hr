export const useTeamLeadCategories = (
  teamleadData: Ref<TeamLeadCriteria[] | undefined>,
  categoryId: number,
) => {
  const { $api, $toast } = useNuxtApp();
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
    teamLeadEvaluationId: categoryId,
  };

  const teamleadForm = reactive<TeamLeadCriteria>({ ...initialState });
  // const teamleadData = ref<TeamLeadCriteria[]>([]);
  const dataTeamlead = computed(() => teamleadData.value || [])

  const teamleadRepo = repository<TeamLeadCriteria>($api, "/teamlead/criteria");
  const submit = async (response: TeamLeadCriteria) => {
    try {
      if (!isUpdate.value) {
        const res = await teamleadRepo.add(response);
        teamleadData.value = [...(teamleadData.value || []), res.data as TeamLeadCriteria];
        $toast.success(res.message);
      } else {
        const res = await teamleadRepo.update(response);
        if (res.data) {
          const data = res.data as TeamLeadCriteria;
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


  const edit = (response: TeamLeadCriteria) => {
    teamleadForm.id = response.id;
    teamleadForm.name = response.name;
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

  const resetForm = () => {
    Object.assign(teamleadForm, initialState);
  };

  const toggleModal = () => {
    resetForm();
    openModal(`Add Criteria`);
  };



  return {
    toggleModal,
    remove,
    edit,
    submit,
    teamleadForm,
    dataTeamlead,
    description,
    title,
    isOpen
    
  }




}
