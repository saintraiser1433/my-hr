<script setup lang="ts">

definePageMeta({
    requiredRole: "Admin",
});

useSeoMeta({
    title: "SUPERHURE Applicants Module",
    description: "CRUD for Applicants",
    ogTitle: "SUPERHURE Applicants Module",
    ogDescription: "CRUD for Applicants",
});

const { $api, $toast, $datefns } = useNuxtApp();
const config = useRuntimeConfig();
const {send } = useSms();
const { handleApiError } = useErrorHandler();
const pendingData = ref<PendingApplicantModel[]>([]);
const rejectedData = ref<RejectApplicantModel[]>([]);
const ongoingData = ref<OngoingApplicant[]>([]);
const failedData = ref<FailedApplicant[]>([]);
const passedData = ref<PassedApplicant[]>([]);
const open = ref(false);

const pendingForm = ref<PendingApplicantModel>({
    id: 0,
    photo: "",
    jobId: 0,
    jobTitle: "",
    status: "",
    applicantName: "",
    appliedDate: new Date(),
    resume: "",
    email: "",
    contactNumber: ""
});


const { data: pending, status: pendingStatus, error: pendingError } = await useAPI<PendingApplicantModel[]>("/applicant/pending");
const { data: ongoing, status: ongoingStatus, error: ongoingError } = await useAPI<OngoingApplicant[]>("/applicant/ongoing");
const { data: rejected, status: rejectedStatus, error: rejectedError } = await useAPI<RejectApplicantModel[]>("/applicant/rejected");
const { data: failed, status: failedStatus, error: failedError } = await useAPI<FailedApplicant[]>("/applicant/failed");
const { data: passed, status: passedStatus, error: passedError } = await useAPI<PassedApplicant[]>("/applicant/passed");

if (pending.value) {
    pendingData.value = pending.value;
}
if (ongoing.value) {
    ongoingData.value = ongoing.value;
}
if (passed.value) {
    passedData.value = passed.value;
}
if (failed.value) {
    failedData.value = failed.value;
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

const proceedRepo = repository<OngoingApplicant>($api, "/applicant/proceed");
const proceed = async (applicantId: number) => {
    try {
        const response = await proceedRepo.updateById(applicantId);
        pendingData.value = pendingData.value.filter(
            (item) => item.id !== applicantId
        );
        ongoingData.value = [...ongoingData.value, response.data as OngoingApplicant];
        $toast.success(response.message);
        open.value = false;
    } catch (err) {
        return handleApiError(err);
    }

};

const rejectRepo = repository<RejectApplicantModel>($api, "/applicant/reject");

const reject = async (applicantId: number) => {
    try {
        const response = await rejectRepo.updateById(applicantId);
        pendingData.value = pendingData.value.filter(
            (item) => item.id !== applicantId
        );
        rejectedData.value = [...rejectedData.value, response.data as RejectApplicantModel];
        open.value = false;
        $toast.success(response.message);
        await send(
            `Dear ${response.data?.applicantName} ,\n\n` +
            `Thank you for your interest in the position at SEAIT School and for the time you invested in the application process.\n\n` +
            `After careful consideration, we regret to inform you that we have decided to move forward with other candidates whose qualifications more closely align with our current needs.\n\n` +
            `We appreciate your application and encourage you to apply for future opportunities that may be a better fit for your skills and experience.\n\n` +
            `Best regards,\n` +
            `SEAIT School Hiring Committee`,
            response.data?.contactNumber ?? ''
        );
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
                    <!-- proceed(pendingForm) -->
                    <div class="flex flex-row lg:flex-col items-center gap-2 mt-2">
                        <UButton icon="i-lucide-check" @click="proceed(pendingForm.id)">Proceed</UButton>
                        <UButton icon="i-lucide-x" color="error" @click="reject(pendingForm.id)">Reject</UButton>
                    </div>

                </div>
                <embed :src="`${config.public.STORAGE_URL_RESUME}/${pendingForm.resume}`" class="min-w-160 min-h-160  "
                    frameborder="0"></embed>
                <div class="flex justify-center items-center mt-2 font-bold">Applicant Resume</div>
            </div>
        </template>
    </UDrawer>
    <div class="flex flex-col items-center lg:items-start mb-3">
        <h2 class="font-extrabold text-2xl">Applicants Module</h2>
        <span class="text-sm">Here's a list of pending,ongoing and rejected applicants!</span>
    </div>
    <UTabs :items="TAB_ITEMS" class="w-full" :ui="{
        list: 'flex-wrap'
    }">
        <template #pending="{ item }">
            <UCard  :ui="{
                root: 'border-b-3 border-(--ui-primary) rounded-md',
            }">
                <ApplicantsPendingList @review="review" :data="pendingData"/>
            </UCard>

        </template>
        <template #ongoing="{ item }">
            <UCard  :ui="{
                root: 'border-b-3 border-(--ui-primary) rounded-md',
            }">
                <ApplicantsOngoingList :data="ongoingData"/>
            </UCard>
    
        </template>
        <template #failed="{ item }">
            <UCard  :ui="{
                root: 'border-b-3 border-(--ui-primary) rounded-md',
            }">
                <ApplicantsFailedList :data="failedData"/>
            </UCard>
   
        </template>
        <template #passed="{ item }">
            <UCard  :ui="{
                root: 'border-b-3 border-(--ui-primary) rounded-md',
            }">
                 <ApplicantsPassedList :data="passedData"/>
            </UCard>
 
        </template>
        <template #rejected="{ item }">
            <UCard  :ui="{
                root: 'border-b-3 border-(--ui-primary) rounded-md',
            }">
              <ApplicantsRejectedList :data="rejectedData"/>
            </UCard>
 
        </template>

    </UTabs>




</template>
