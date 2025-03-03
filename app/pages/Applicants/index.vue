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
const config = useRuntimeConfig();
const { handleApiError } = useErrorHandler();
const pendingData = ref<PendingApplicantModel[]>([]);
const rejectedData = ref<RejectApplicantModel[]>([]);
const ongoingData = ref<ApplicantModel[]>([]);
const open = ref(false);

const pendingForm = ref<PendingApplicantModel>({
    id: 0,
    photo: "",
    jobId: 0,
    jobTitle:"",
    status: "",
    applicantName: "",
    appliedDate: new Date(),  // Default to current date
    resume: "",
    email: "",
    contactNumber: ""
});
const { data: pending, status: pendingStatus, error: pendingError } = await useAPI<PendingApplicantModel[]>("/applicant/pending");
const { data: ongoing, status: ongoingStatus, error: ongoingError } = await useAPI<ApplicantModel[]>("/applicant/ongoing");
const { data: rejected, status: rejectedStatus, error: rejectedError } = await useAPI<RejectApplicantModel[]>("/applicant/rejected");

if (pending.value) {
    pendingData.value = pending.value;
}
if (ongoing.value) {
    ongoingData.value = ongoing.value;
}

if (rejected.value) {
    rejectedData.value = rejected.value
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

const review = (res: PendingApplicantModel) => {
    open.value = true;
    pendingForm.value = res;
}

const formattedAppliedDate = computed(() => {
    return $datefns.format(new Date(pendingForm.value.appliedDate), "dd-MMM-yyyy")
});

const applicantsRepo = repository<ApplicantModel>($api, "/applicant");
const proceed = async (id: number) => {
    try {
        const response = await applicantsRepo.delete(id);
        pendingData.value = pendingData.value.filter(
            (item) => item.id !== id
        );
        rejectedData.value = [...rejectedData.value, res.data as ApplicantModel];
        $toast.success(response.message);
    } catch (err) {
        return handleApiError(err);
    }

};

const rejectRepo = repository<RejectApplicantModel>($api, "/applicant");
const reject = async (data: PendingApplicantModel) => {
    try {
        const date = new Date();
        const response = await rejectRepo.update({...data,rejectedDate:date});
        pendingData.value = pendingData.value.filter(
            (item) => item.id !== data.id
        );
        rejectedData.value = [...rejectedData.value, { ...data, status: 'REJECTED',rejectedDate:new Date() }];
        open.value = false;
        $toast.success(response.message);
    } catch (error) {
        return handleApiError(error);
    }
};



</script>

<template>
    <UDrawer :ui="{ header: 'flex items-center justify-between border-b-3 border-dashed border-success-900' }"
        v-model:open="open" direction="right">
        <template #header>
            <h1 class="uppercase font-semibold font-(family-name:--font-poppins) ">
                {{ pendingForm.jobTitle }}</h1>
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
                                    <h4>{{ pendingForm.applicantName }}</h4>
                                </div>
                                <div class="flex items-center gap-2 py-1">
                                    <h4 class="font-bold">Contact:</h4>
                                    <h4>{{ pendingForm.contactNumber }}</h4>
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
                <embed :src="`${config.public.STORAGE_URL_RESUME}/${pendingForm.resume}`" class="min-w-160 min-h-160  " frameborder="0"></embed>
                <div class="flex justify-center items-center mt-2 font-bold">Applicant Resume</div>
            </div>
        </template>
    </UDrawer>
    <div class="flex flex-col items-center lg:items-start mb-3">
        <h2 class="font-extrabold text-2xl">Applicants Module</h2>
        <span class="text-sm">Here's a list of pending,ongoing and rejected applicants!</span>
    </div>
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
