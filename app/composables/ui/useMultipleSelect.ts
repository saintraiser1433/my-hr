export const useMultipleSelect = <T extends any[]>(data: Ref<T>) => {
  const { $toast } = useNuxtApp();
  const value = ref([]);
  const rowSelection = ref({});
  const checkEmpty = computed(() => Object.keys(rowSelection.value).length > 0);
  const selectedItems = ref<number[]>([]);

  const unAssigned = () => {
    selectedItems.value = Object.keys(rowSelection.value)
      .map((key) => data.value[Number(key)]?.id)
      .filter(Boolean) as number[];
  };

  const handleAssign = () => {
    if (!value.value.length) {
      return $toast.error("No selected type found");
    }
  };

  const resetAssign = () => {
    value.value = [];
    rowSelection.value = {};
  }

  return {
    value,
    selectedItems,
    rowSelection,
    unAssigned,
    handleAssign,
    resetAssign,
    checkEmpty
  };
}



