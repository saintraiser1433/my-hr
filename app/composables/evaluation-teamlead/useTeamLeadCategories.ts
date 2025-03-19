export const useTeamLeadCategories = (
  teamleadData: Ref<CriteriaColleague[] | undefined>,
  categoryId: number,
  apiPath: string,
  employeesId?: Ref<number>
) => {
  const { $api, $toast } = useNuxtApp();
  const { handleApiError } = useErrorHandler();
  const employeeId = employeesId ?? ref<number | undefined>(undefined);

  const {
    openModal,
    description,
    updateModal,
    resetModal,
    isOpen,
    isUpdate,
    title,
  } = useCustomModal();

  let initialState: CriteriaColleague = {
    id: undefined,
    name: "",
    teamLeadEvaluationId: categoryId,
  };
  if (!employeesId) {
    initialState = {
      id: undefined,
      name: "",
      teamLeadEvaluationId: categoryId,
      employeesId: employeeId.value
    };
  }



  const teamleadForm = reactive<CriteriaColleague>({ ...initialState });
  const dataTeamlead = computed(() => teamleadData.value || [])

  const teamleadRepo = repository<CriteriaColleague>($api, apiPath);
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


  if (employeesId) {
    console.log(employeesId)
    watch(employeesId, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        employeeId.value = newVal;
        Object.assign(teamleadForm, { employeesId: newVal });
      }
    });
  }




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
