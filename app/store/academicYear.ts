import { defineStore } from 'pinia'

export const useAcademicYearStore = defineStore("academicYearStore", {
  state: () => ({
    activeYear: null as string | null,
    semester: null as number | null,
    acadId: null as number | null,

  }),
  actions: {
    async fetchActiveYear() {
      try {
        const { data } = await useAPI<EvaluationModel>("/evaluation/ongoing");
        console.log(data);
        this.activeYear = data.value?.school_year || null;
        this.semester = data.value?.semester || null;
        this.acadId = data.value?.id || null;
      } catch (error) {
        console.error("Failed to fetch academic year:", error);
      }
    },
  }
})
