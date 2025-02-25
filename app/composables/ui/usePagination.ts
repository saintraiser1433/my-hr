export const usePagination = () => {
  const pagination = ref({
    pageIndex: 0,
    pageSize: 10,
  });
  const globalFilter = ref("");


  const refreshTable = () => {
    pagination.value = { ...pagination.value };
  };

  return { pagination, globalFilter, refreshTable }

}
