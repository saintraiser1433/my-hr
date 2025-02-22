import Joi from 'joi'
import 'vue3-toastify/dist/index.css';
import Vue3Toastify, { toast, type ToastContainerOptions, type ToastOptions } from 'vue3-toastify';
export default defineNuxtPlugin((nuxtApp) => {
    

    nuxtApp.vueApp.use(Vue3Toastify, {
        autoClose: 3000,
        position: toast.POSITION.TOP_RIGHT,
    } as ToastContainerOptions);

    nuxtApp.provide('toast', toast)
    nuxtApp.provide('joi', Joi);
})
