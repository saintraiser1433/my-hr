export const validateMaxLength = (event: Event,length:number) => {
  const input = event.target as HTMLInputElement;
  input.value = input.value.replace(/\D/g, "").slice(0, length); // Allow only digits, max 11

};