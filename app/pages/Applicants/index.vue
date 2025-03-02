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

const { $api, $toast, $datefns } = useNuxtApp();
const { handleApiError } = useErrorHandler();
const pendingData = ref<ApplicantModel[]>([]);
const approvedData = ref<ApplicantModel[]>([]);
const rejectedData = ref<ApplicantTransformModel[]>([]);
const ongoingData = ref<ApplicantModel[]>([]);
const isUpdate = ref(false);
const open = ref(false);
const pendingForm = ref<ApplicantTransformModel>({
    id: 0
});
const { data: pending, status: pendingStatus, error: pendingError } = await useAPI<ApplicantModel[]>("/applicant/pending");
const { data: ongoing, status: ongoingStatus, error: ongoingError } = await useAPI<ApplicantModel[]>("/applicant/pending");
const { data: rejected, status: rejectedStatus, error: rejectedError } = await useAPI<ApplicantModel[]>("/applicant/rejected");

if (pending.value) {
    pendingData.value = pending.value;
}
if (ongoing.value) {
    ongoingData.value = ongoing.value;
}

if (rejected.value) {
    rejectedData.value = rejected.value.map((item) => {
        const applicantInfo = item.information?.[0];
        return {
            id: item.id,
            avatar:'/profile.jpg',
            job: item.jobApply?.title,
            status: item.status,
            applicant: applicantInfo
                ? `${applicantInfo.last_name}, ${applicantInfo.first_name} ${applicantInfo.middle_name?.[0] || ''}`
                : "Unknown",
            applied_date: item.createdAt
        };
    });
}

if (pendingError.value) {
    $toast.error(pendingError.value.message || "Failed to fetch items");
}
if (ongoingError.value) {
    $toast.error(ongoingError.value.message || "Failed to fetch items");
}

if (rejectedError.value) {
    $toast.error(rejectedError.value.message || "Failed to fetch items");
}

const review = (res: ApplicantModel) => {
    open.value = true;
    pendingForm.value = res;
}

const formattedAppliedDate = computed((item) => {
    return pendingForm.value.applied_date
        ? $datefns.format(new Date(pendingForm.value.applied_date), "dd-MMM-yyyy")
        : "N/A";
});
const applicantsRepo = repository<ApplicantModel>($api, "/applicant");

const proceed = (id: number) => {
    setAlert("warning", "Are you sure you want to proceed this applicant?", "", "Confirm to proceed").then(
        async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await applicantsRepo.delete(id);
                    pendingData.value = pendingData.value.filter(
                        (item) => item.id !== id
                    );
                    rejectedData.value = [...rejectedData.value, res.data as ApplicantModel];
                    $toast.success(response.message);
                } catch (error) {
                    return handleApiError(error);
                }
            }
        }
    );
};


const reject = (data: ApplicantTransformModel) => {
    setAlert("warning", "Are you sure you want to reject this applicant?", "", "Confirm to reject").then(
        async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await applicantsRepo.delete(data.id);
                    pendingData.value = pendingData.value.filter(
                        (item) => item.id !== data.id
                    );
                    rejectedData.value = [...rejectedData.value, { ...data, status: 'REJECTED' }];
                    open.value = false;
                    $toast.success(response.message);
                } catch (error) {
                    return handleApiError(error);
                }
            }
        }
    );
};



</script>

<template>
    <UDrawer :ui="{ header: 'flex items-center justify-between border-b-3 border-dashed border-success-900' }"
        :overlay="false" :dismissible="false" dragg v-model:open="open" direction="right">
        <template #header>
            <h1 class="uppercase font-semibold font-(family-name:--font-poppins) ">
                {{ pendingForm.job }}</h1>
            <UButton color="neutral" variant="subtle" icon="i-lucide-x" @click="open = false" />
        </template>
        <template #body>
            <div class="min-w-160 min-h-96 size-full">
                <div class="flex flex-col lg:flex-row lg:justify-between pb-3">
                    <div class="flex flex-col gap-1">

                        <div
                            class="flex flex-col  lg:flex-row lg:justify-between lg:gap-8 font-(family-name:--font-poppins) ">
                            <div>
                                <div class="flex items-center gap-2 pt-1">
                                    <h4 class="font-bold">Applicant:</h4>
                                    <h4>{{ pendingForm.applicant }}</h4>
                                </div>
                                <div class="flex items-center gap-2 py-1">
                                    <h4 class="font-bold">Contact:</h4>
                                    <h4>{{ pendingForm.contact_number }}</h4>
                                </div>
                                <div class="flex items-center gap-2">
                                    <h4 class="font-bold">Email:</h4>
                                    <h4>{{ pendingForm.email }}</h4>
                                </div>
                            </div>
                            <div>
                                <div class="flex items-center gap-2 py-1">
                                    <h4 class="font-bold">Date Applied:</h4>
                                    <h4>{{ formattedAppliedDate }}</h4>
                                </div>
                                <div class="flex items-center gap-2">
                                    <h4 class="font-bold">Status:</h4>
                                    <UBadge color="neutral" variant="subtle">{{ pendingForm.status }}</UBadge>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-row lg:flex-col items-center gap-2 mt-2">
                        <UButton icon="i-lucide-check" @click="proceed(pendingForm)">Proceed</UButton>
                        <UButton icon="i-lucide-x" color="error" @click="reject(pendingForm)">Reject</UButton>
                    </div>

                </div>
                <embed src="/test.pdf" class="min-w-160 min-h-160  " frameborder="0"></embed>
                <div class="flex justify-center items-center mt-2 font-bold">Applicant Resume</div>
            </div>
        </template>
    </UDrawer>
    <UTabs :items="TAB_ITEMS" class="w-full">
        <template #pending="{ item }">
            <ApplicantsPendingList @review="review" :data="pendingData">
            </ApplicantsPendingList>
        </template>
        <template #ongoing="{ item }">
            <ApplicantsOngoingList :data="ongoingData">
            </ApplicantsOngoingList>
        </template>

        <template #rejected="{ item }">
            <ApplicantsRejectedList :data="rejectedData">
            </ApplicantsRejectedList>
        </template>
    </UTabs>




</template>
