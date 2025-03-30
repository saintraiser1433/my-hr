import Joi from 'joi'
import { format, parse, parseISO, getDay } from 'date-fns'
import { CircleProgressBar } from 'circle-progress.vue';
// optional styles
import Vue3Toastify, { toast, type ToastContainerOptions, type ToastOptions } from 'vue3-toastify';
import { useAcademicYearStore } from '~/store/academicYear';
import * as echarts from 'echarts';
export default defineNuxtPlugin(async (nuxtApp) => {
    if (import.meta.client) {
        const academicYearStore = useAcademicYearStore()


        try {
            await academicYearStore.fetchActiveYear()


        } catch (error) {
            console.error('Initialization error:', error)
        }
    }

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
    nuxtApp.provide('echarts', echarts);
    nuxtApp.provide('joi', Joi);
    nuxtApp.vueApp.component('CircleProgressBar', CircleProgressBar)
})
