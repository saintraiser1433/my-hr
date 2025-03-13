import Joi from 'joi'
import { format, parse, parseISO, getDay } from 'date-fns'
import { CircleProgressBar } from 'circle-progress.vue';
// optional styles
import Vue3Toastify, { toast, type ToastContainerOptions, type ToastOptions } from 'vue3-toastify';
import { useAcademicYearStore } from '~/store/academicYear';
export default defineNuxtPlugin(async (nuxtApp) => {
    const academicYearStore = useAcademicYearStore();
    await academicYearStore.fetchActiveYear();

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
    nuxtApp.vueApp.component('CircleProgressBar', CircleProgressBar)
})
