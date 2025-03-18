export const usePeerCategories = (
  peer: Ref<PeerModel[] | undefined>,
  template: Ref<TemplateModel[] | undefined>,
  academicYearId: number,
) => {
  const { $api, $toast } = useNuxtApp();
  const { handleApiError } = useErrorHandler();
  const { openModal, description, updateModal, resetModal, isOpen, isUpdate, title } = useCustomModal();
  const selectValue = ref(0);
  const peerData = computed(() => peer.value || []);




  const itemTemplate = computed(() => template.value?.map((item) => ({
    id: item.id,
    label: item.template_name,
  })))


  const initialState = {
    id: undefined,
    name: "",
    academicYearId: academicYearId,
    percentage: undefined,
  };
  const peerForm = reactive<PeerModel>({ ...initialState });
  const { resetForm } = useResetForm(peerForm, initialState)

  const peerRepo = repository<PeerModel>($api, "/peer");
  const submit = async (response: PeerModel) => {
    try {
      if (!isUpdate.value) {
        const res = await peerRepo.add(response); //error on this code
        peer.value = [...(peer.value || []), res.data as PeerModel];
        $toast.success(res.message);
      } else {
        const res = await peerRepo.update(response); //error on this code
        if (res.data) {
          const data = res.data as PeerModel;
          peer.value = peer.value?.map((item) =>
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



  const edit = (response: PeerModel) => {
    peerForm.id = response.id;
    peerForm.name = response.name;
    peerForm.percentage = Number(response.percentage);
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
          const response = await peerRepo.delete(id);
          peer.value = peer.value?.filter((item) => item.id !== id);
          $toast.success(response.message);
        } catch (error) {
          return handleApiError(error);
        }
      }
    });
  }

  const toggleModal = () => {
    resetForm();
    openModal(`Add Category`);
  };


  return {
    selectValue,
    peerData,
    peerForm,
    itemTemplate,
    submit,
    edit,
    remove,
    description,
    title,
    isOpen,
    toggleModal
  }






}
