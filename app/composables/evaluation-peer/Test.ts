export const useTest = () => {
  const { openModal, description, resetModal, isOpen, isUpdate, title } = useCustomModal();

  


  return {
    questionisOpen:isOpen,
    questionOpenModal: openModal,
    questionDesc:description,
    questionTitle:title
  }
}
