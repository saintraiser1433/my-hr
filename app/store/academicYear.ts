import { defineStore } from 'pinia'

export const useAcademicYearStore = defineStore("academicYearStore", {
  state: () => ({
    activeYear: null as string | null,
    semester: null as number | null,
    acadId: null as number | null,

  }),
  actions: {
    async fetchActiveYear() {
      const nuxtApp = useNuxtApp();

      try {
        const { data } = await useAPI<EvaluationModel>("/evaluation/ongoing", {
          getCachedData(key) {
            return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
          }
        });
        this.activeYear = data.value?.school_year || null;
        this.semester = data.value?.semester || null;
        this.acadId = data.value?.id || null;
      } catch (error) {
        console.error("Failed to fetch academic year:", error);
      }
    },
  }
})
