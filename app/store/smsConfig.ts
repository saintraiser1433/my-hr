export const useStoreSms = defineStore('sms', {
  state: () => ({
    config: {
      serverAddress: '',
      username: '',
      password: ''
    } as SMSSSetings,
    isInitialized: false
  }),

  actions: {
    async fetchConfig() {
      const config = useRuntimeConfig()

      const response = await $fetch<SMSSSetings>(`${config.public.baseURL}/sms`)
      if (response) {
        this.config = response;
      }
      this.isInitialized = true
    },

    async updateConfig(newConfig: SMSSSetings) {
      const config = useRuntimeConfig()
      this.config = await $fetch(`${config.public.baseURL}/sms`, {
        method: 'POST',
        body: newConfig
      })
    }
  }
})