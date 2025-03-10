export const useCustomModal = () => {
  const isOpen = ref(false);
  const isUpdate = ref(false);
  const title = ref("");
  const description = ref("");
  const openModal = (content: string, desc: string = "Enter and save the required details") => {
    isOpen.value = true;
    isUpdate.value = false;
    title.value = content;
    description.value = desc;
  }

  const updateModal = (content: string, desc: string = "Modify and save the required details.") => {
    isOpen.value = true;
    isUpdate.value = true;
    title.value = content;
    description.value = desc;
  }

  const resetModal = () => {
    isOpen.value = false;
    isUpdate.value = false;
    title.value = "";
    description.value = "";
  }



  return { isOpen, isUpdate, openModal, updateModal, resetModal, title, description }

}
