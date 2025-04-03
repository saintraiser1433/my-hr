import { defineStore } from 'pinia'

export const useAcademicYearStore = defineStore("academicYearStore", {
  state: () => ({
    activeYear: null as string | null,
    semester: null as number | null,
    acadId: 0,
    vAcadId:0,
    vSemester:null as number | null,
    vActiveYear: null as string | null



  }),
  actions: {
    async fetchActiveYear() {
      try {
        const { data } = await useAPI<EvaluationModel>("/evaluation/ongoing");
        console.log(data);
        this.activeYear = data.value?.school_year || null;
        this.semester = data.value?.semester || null;
        this.acadId = data.value?.id || 0;
        this.vAcadId = data.value?.id || 0;
        this.vActiveYear = data.value?.school_year || null;
        this.vSemester = data.value?.semester || null;
      } catch (error) {
        console.error("Failed to fetch academic year:", error);
      }
    },
    setAcademicYear(data:EvaluationModel){
      this.activeYear = data.school_year || null,
      this.semester = data.semester || null;
      this.acadId = data.id || 0;
    },
    viewAcademicYear(id:number,semester:number,schoolYear:string){
      this.vActiveYear = schoolYear || null,
      this.vSemester = semester || null;
      this.vAcadId = id;
    }
  }
  

})
