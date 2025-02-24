export const useCustomModal = () => {
  const isOpen = ref(false);
  const isUpdate = ref(false);
  const title = ref("");
  const openModal = (content: string) => {
    isOpen.value = true;
    isUpdate.value = false;
    title.value = content;
  }

  const updateModal = (content: string) => {
    isOpen.value = true;
    isUpdate.value = true;
    title.value = content;
  }

  const resetModal = () => {
    isOpen.value = false;
    isUpdate.value = false;
    title.value = "";
  }



  return { isOpen, isUpdate, openModal, updateModal, resetModal, title }

}
