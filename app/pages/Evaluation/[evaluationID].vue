<script setup lang="ts">
definePageMeta({
    requiredRole: "admin",
});

useSeoMeta({
    title: "SUPERHURE Evaluation Module",
    description: "CRUD for Evaluation",
    ogTitle: "SUPERHURE Evaluation Module",
    ogDescription: "CRUD for Evaluation",
});

const { $api, $toast } = useNuxtApp();
const { handleApiError } = useErrorHandler();
const route = useRoute();

const isUpdate = ref(false);
const initialState = {
    id: undefined,
    school_year: undefined,
    semester: undefined,
    status: undefined,
};

const evaluationForm = reactive<EvaluationModel>({ ...initialState });
const evaluationData = ref<EvaluationModel[]>([]);
const evaluationRepo = repository<EvaluationModel>($api, "/evaluation/quest");
const { data, status, error } = await useAPI<EvaluationModel[]>(`/evaluation/quest/${route.params.evaluationID}`);
if (data.value) {
    evaluationData.value = data.value;
}
if (error.value) {
    $toast.error(error.value.message || "Failed to fetch items");
}

const submit = async (response: any) => {
    console.log(response);
    // try {
    //     if (!isUpdate.value) {
    //         const res = await evaluationRepo.add(response); //error on this code
    //         evaluationData.value = [res.data as EvaluationModel, ...evaluationData.value]; // Add new item at the start
    //         $toast.success(res.message);
    //     } else {
    //         const res = await evaluationRepo.update(response); //error on this code
    //         if (res.data) {
    //             const data = res.data as EvaluationModel;
    //             evaluationData.value = evaluationData.value.map((item) =>
    //                 item.id === data.id ? data : item
    //             );
    //         }

    //         $toast.success(res.message);
    //     }
    //     resetForm()

    // } catch (error) {
    //     return handleApiError(error);
    // }
};

const edit = (response: EvaluationModel) => {
    evaluationForm.id = response.id;
    evaluationForm.status = response.status;
    evaluationForm.school_year = response.school_year;
    evaluationForm.semester = response.semester;

};

const remove = (id: number) => {
    setAlert("warning", "Are you sure you want to delete?", "", "Confirm delete").then(
        async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await evaluationRepo.delete(id);
                    evaluationData.value = evaluationData.value.filter(
                        (item) => item.id !== id
                    );
                    $toast.success(response.message);
                } catch (error) {
                    return handleApiError(error);
                }
            }
        }
    );
};

const resetForm = () => {
    Object.assign(evaluationForm, initialState);
};


</script>

<template>



    <div class="flex flex-col items-center lg:items-start mb-3">
        <h2 class="font-extrabold text-2xl">Evaluation Module</h2>
        <span class="text-sm">Here's a list of Evaluation available!</span>
    </div>

    <div class="grid grid-cols-12 gap-2">
        <div class="col-span-12 lg:col-span-3">
            <EvaluationQuestionForm @data-question="submit" :isUpdate="isUpdate" v-model:state="evaluationForm" />
        </div>
        <div class="col-span-12 lg:col-span-9">
            <EvaluationQuestionList :data="evaluationData" @update="edit" @delete="remove">
            </EvaluationQuestionList>
        </div>
    </div>






</template>
