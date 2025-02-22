<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';


const open = defineModel('openModal', { required: true, default: false });



const emits = defineEmits<{
    (e: 'dataCourse', payload: CourseModel): void;
}>();

const { $joi } = useNuxtApp()
const model = defineModel<CourseModel>('state', { required: true })
const schema = $joi.object({
    description: $joi.string().required().messages({
        "any.required": `Course is Required`,
        "string.empty": `Course is Required`,
    }),
    score: $joi.number().required().messages({
        "any.required": `Score is Required`,
        "number.empty": `Score is Required`
    }),
    course_id: $joi.number().optional()
})


const onSubmit = async (event: FormSubmitEvent<CourseModel>) => {
    emits('dataCourse', event.data)
}




const formRef = useTemplateRef("formRef");
const submitForm = () => {
    if (formRef.value) {
        formRef.value.submit();
    }
}



</script>

<template>
    <!-- {{ model }} -->
    <UModal v-model:open="open" title="Course List" description="This is useful when you want a form in a Modal."
        :ui="{ content: 'max-w-sm' }">
        <template #body>
            <UForm ref="formRef" :schema="schema" :state="model" class="space-y-4" @submit="onSubmit">
                <UFormField label="Course" name="description" required>
                    <UITextInput v-model.trim="model.description" placeholder="Enter course" />
                </UFormField>
                <UFormField label="Score" name="score" required>
                    <UITextInput v-model.number="model.score" type="number" placeholder="Enter score" />
                </UFormField>
            </UForm>
        </template>

        <template #footer>
            <UButton label="Cancel" color="neutral" variant="outline" @click="open = false" />
            <UButton label="Submit" type="submit" color="neutral" @click="submitForm" />
        </template>
    </UModal>
</template>
