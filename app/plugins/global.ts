import Joi from 'joi'
import { format, parse, parseISO, getDay } from 'date-fns'

// optional styles
import Vue3Toastify, { toast, type ToastContainerOptions, type ToastOptions } from 'vue3-toastify';
export default defineNuxtPlugin((nuxtApp) => {


    nuxtApp.vueApp.use(Vue3Toastify, {
        autoClose: 3000,
        position: toast.POSITION.TOP_RIGHT,
    } as ToastContainerOptions);
    nuxtApp.provide('datefns', {
        format,
        parse,
        parseISO,
        getDay,
    });
    nuxtApp.provide('toast', toast)
    nuxtApp.provide('joi', Joi);
})
