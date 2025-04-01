import { defineStore } from 'pinia'

export const useAcademicYearStore = defineStore("academicYearStore", {
  state: () => ({
    activeYear: null as string | null,
    semester: null as number | null,
    acadId: 0,
    


  }),
  actions: {
    async fetchActiveYear() {
      try {
        const { data } = await useAPI<EvaluationModel>("/evaluation/ongoing");
        console.log(data);
        this.activeYear = data.value?.school_year || null;
        this.semester = data.value?.semester || null;
        this.acadId = data.value?.id || 0;
      } catch (error) {
        console.error("Failed to fetch academic year:", error);
      }
    },
    setAcademicYear(data:EvaluationModel){
      this.activeYear = data.school_year || null,
      this.semester = data.semester || null;
      this.acadId = data.id || 0;
    }
  }
  

})
