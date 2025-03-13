import { defineStore } from 'pinia'
import type { User } from '~/types/auth';

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    id: null as number | null,
    first_name: null as string | null,
    last_name: null as string | null,
    middle_name: null as string | null,
    role: null as string | null,
    departmentId: null as number | null,
  }),
  getters: {
    getFullName: (state) => {
      return state.first_name + " " + state.last_name;
    },
    getId: (state) => state.id,
    getRole: (state) => state.role,
    getDeptId: (state) => state.departmentId
  },
  actions: {
    setUser(data: User) {
      this.id = data.id || null;
      this.first_name = data.first_name || null;
      this.last_name = data.last_name || null;
      this.middle_name = data.middle_name || null;
      this.role = data.role || null
      this.departmentId = data.departmentId || null;
    },


  }
})
