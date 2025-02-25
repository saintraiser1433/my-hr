export const useFileDialog = (prefix: string) => {
  const file = ref<File | null>(null);
  const uniqueName = ref("");
  const previewUrl = ref("");
  const onFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      file.value = input.files[0];
      const fileExtension = file.value.name.split(".").pop();
      const timestamp = Date.now();
      uniqueName.value = `${prefix}_${timestamp}.${fileExtension}`;



      //needed when file
      const reader = new FileReader();
      reader.onload = () => {
        previewUrl.value = reader.result as string;
      };
      reader.readAsDataURL(file.value);
    }
  };

  return { file, onFileChange, uniqueName, previewUrl }
}
