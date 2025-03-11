export const useResetForm = <T extends object>(form: T, initialState: T) => {
  const resetForm = () => {
    Object.assign(form, { ...initialState });
  };

  return { resetForm };
}