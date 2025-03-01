<script setup lang="ts">
definePageMeta({
    requiredRole: "admin",
});

useSeoMeta({
    title: "SUPERHURE Applicants Module",
    description: "CRUD for Applicants",
    ogTitle: "SUPERHURE Applicants Module",
    ogDescription: "CRUD for Applicants",
});

const { $api, $toast } = useNuxtApp();
const { handleApiError } = useErrorHandler();
const { openModal, updateModal, resetModal, isOpen, isUpdate, title } = useCustomModal();

const applicantsData = ref<ApplicantModel[]>([]);
const applicantsRepo = repository<ApplicantModel>($api, "/applicant");

const { data, status, error } = await useAPI<ApplicantModel[]>("/applicant");
if (data.value) {
    applicantsData.value = data.value;
}
if (error.value) {
    $toast.error(error.value.message || "Failed to fetch items");
}

const submit = async (response: ApplicantModel) => {

    try {
        if (!isUpdate.value) {
            const res = await applicantsRepo.add(response); //error on this code
            applicantsData.value = [...applicantsData.value, res.data as ApplicantModel];
            $toast.success(res.message);
        } else {
            const res = await applicantsRepo.update(response); //error on this code
            if (res.data) {
                const data = res.data as ApplicantModel;
                applicantsData.value = applicantsData.value.map((item) =>
                    item.id === data.id ? data : item
                );
            }

            $toast.success(res.message);
        }
        resetModal();
    } catch (error) {
        return handleApiError(error);
    }
};



const remove = (id: number) => {
    setAlert("warning", "Are you sure you want to delete?", "", "Confirm delete").then(
        async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await applicantsRepo.delete(id);
                    applicantsData.value = applicantsData.value.filter(
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

const items = [
    {
        label: 'List of Applicants',
        icon: 'i-lucide-user',
        slot: 'applicants'
    },
    {
        label: 'Rejected Applicants',
        icon: 'i-lucide-lock',
        slot: 'rejected'
    }
]


</script>

<template>
    <UTabs :items="items" class="w-full">
        <template #applicants="{ item }">
            <ApplicantsList :data="applicantsData">
            </ApplicantsList>
        </template>
        <template #rejected="{ item }">
            <ApplicantsList :data="applicantsData">
            </ApplicantsList>
        </template>
    </UTabs>




</template>
