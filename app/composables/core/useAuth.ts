
import { useStorage } from '@vueuse/core';
export const useAuthentication = () => {
  const config = useRuntimeConfig()
  const { $api } = useNuxtApp();
  const token = useStorage<string>('token', null);
  const rToken = useStorage<string>('refreshToken', null);
  const info = useStorage<any>('info', null);
  const id = ref<number | null>(null);
  const signIn = async (data: Login) => {
    const result = await $api<Token>(`${config.public.baseURL}/auth/signin`, {
      method: "POST",
      body: {
        username: data.username,
        password: data.password,
      },
    });

    info.value = JSON.stringify(result.users);
    id.value = result.users.id;

    token.value = result.token.accessToken
    rToken.value = result.token.refreshToken
    return;
  }



  const signOut = async (id: number) => {
    await $fetch(`${config.public.baseURL}/auth/signout/${id}`, {
      method: 'PUT',
    })
    clearAuthTokens()

  }

  const refreshToken = async () => {
    const result = await $fetch<{ accessToken: string }>(`${config.public.baseURL}/auth/refresh`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${rToken.value}`
      }
    })

    token.value = result.accessToken
    return;
  }



  const clearAuthTokens = () => {
    token.value = null;
    info.value = null;
    rToken.value = null;
  };







  return { info, token, id, refreshToken, signIn, signOut, clearAuthTokens }
}