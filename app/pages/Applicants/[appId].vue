<script setup lang="ts">
definePageMeta({
    requiredRole: "Admin",
});
useSeoMeta({
    title: "SUPERHURE Applicants Progress",
    description: "CRUD for Applicants Progress",
    ogTitle: "SUPERHURE Applicants Progress",
    ogDescription: "CRUD for Applicants Progress",
});

const ongoingData = ref < OngoingApplicantDetails[] > ([]);
const route = useRoute();
const {
    handleApiError
} = useErrorHandler();
const {
    $api,
    $toast,
    $datefns
} = useNuxtApp();
const {
    send
} = useSms();
const {
    updateStatus
} = useUpdateStatus(ongoingData);
const {
    templates
} = useInterviewResults();
const screenData = ref <ScreeningModel[]> ([]);
const {
    data: ongoing,
    status: ongoingStatus,
    error: ongoingError,
    refresh
} = await useAPI <
    OngoingApplicantDetails[] >
    (`/applicant/ongoing/${route.params.appId}`, {

    });
if (ongoing.value) {
    ongoingData.value = ongoing.value;
}

const {
    data: screeningData,
    error: errorScreening,
    refresh: refreshScreening
} = await useAPI < ScreeningModel[] > (
    `/screening/app/${route.params.appId}`
);
if (screeningData.value) {
    screenData.value = screeningData.value;
}
if (errorScreening.value) {
    $toast.error(errorScreening.value.message || "Failed to fetch items");
}

const IDRepo = repository<InterviewDate>($api, "/interview/date");
const updateTime = async (data: InterviewDate) => {
    try {

        const interviewDate = new Date(data.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (interviewDate < today) {
            $toast.error('Interview date must be today or in the future');
            return;
        }
        const response = await IDRepo.update(data);
        if (!ongoingData.value?.[0]?.progressList) return;
        ongoingData.value = [{
            ...ongoingData.value[0],
            progressList: ongoingData.value[0].progressList.map((item) =>
                item.id === data.id ? {
                    ...item,
                    dateInterview: response.data?.date
                } : item
            ),
        }, ];
        $toast.success(response.message);

        if (ongoing.value && ongoing.value[0]) {
            await send(
                `Dear ${ongoing.value[0].applicantName},\n\n` +
                `Your ${data.screening} interview for SEAIT School has been scheduled for ` +
                `${$datefns.format(new Date(data.date), "dd MMMM yyyy 'at' hh:mm a")}.\n\n` +
                `Please arrive 10 minutes prior to your scheduled time.\n` +
                `Should you require any assistance, kindly contact our office.\n\n` +
                `Best regards,\n` +
                `SEAIT School Hiring Committee`,
                ongoing.value[0].contactNumber
            );
        }
    } catch (err) {
        return handleApiError(err);
    }
};

const finalizedRepo = repository < InterviewStatus > ($api, "/applicant/finalize");
const finalizeApplicant = () => {
    setAlert(
        "warning",
        "Are you sure to finalize this application?",
        "",
        "Confirm finalize"
    ).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const ongoing = ongoingData.value?.[0];
                if (!ongoing) return;
                const data = {
                    id: ongoing.id,
                    jobId: ongoing.jobId,
                    status: ongoing.remarks === ApplicationStatus.PASSED ?
                        ApplicationStatus.PASSED : ApplicationStatus.FAILED,
                };

                const response = await finalizedRepo.update(data);
                $toast.success(response.message);

                await navigateTo({
                    path: "/applicants"
                });
                if (ongoing.remarks === ApplicationStatus.PASSED) {
                    await send(
                        templates.passed({
                            name: ongoing.applicantName,
                            position: ongoing.jobTitle,
                            startDate: $datefns.format(new Date(), "MMMM d, yyyy"),
                            hrContact: "hr-team@seait.edu",
                        }),
                        ongoing.contactNumber
                    );
                } else {
                    await send(
                        templates.failed({
                            name: ongoing.applicantName,
                            position: ongoing.jobTitle,
                            feedback: "We suggest strengthening your technical demonstration skills",
                        }),
                        ongoing.contactNumber
                    );
                }
             
            } catch (error) {
                return handleApiError(error);
            }
        }
    });
};

const screeningRepo = repository < Omit < ScreeningProgressList,
    'screening' > [] > ($api, "/screening/applicantAssign");
const assignScreening = async (data: ScreeningModel[]) => {
    try {
        const payload = data.map((item) => ({
            applicantId: Number(route.params.appId),
            screeningId: Number(item.id),
        }));

        const response = await screeningRepo.add(payload);
        await Promise.all([refresh(), refreshScreening()]);
        ongoingData.value = ongoing.value || [];
        screenData.value = screenData.value?.filter((item) => !data.some((items) => items.id === item.id)) || [];
        $toast.success(response.message);
    } catch (err) {
        return handleApiError(err);
    }
};

const removeScreeningRepo = repository < ScreeningModel > ($api, "/screening/app");
const unAssignScreening = async (id: number) => {
    setAlert("warning", "Are you sure you want to remove this data this can't be undone?", "", "Confirm delete").then(
        async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await removeScreeningRepo.delete(id);
                    await Promise.all([refresh(), refreshScreening()]);
                    ongoingData.value = ongoing.value || [];
                    screenData.value = [
                        ...screenData.value,
                        response.data as ScreeningModel,
                    ];

                    $toast.success(response.message);
                } catch (err) {
                    return handleApiError(err);
                }
            }
        })
};
</script>

<template>
    <ApplicantsProgressHeader
        :ongoingData="ongoingData" />
    <UCard
        :ui="{
      root: 'border-b-3 border-(--ui-primary) rounded-md',
    }">
        <ApplicantsProgress
            :items="screeningData"
            @delete-screening="unAssignScreening"
            @assign="assignScreening"
            @data-status="updateStatus"
            @data-date="updateTime"
            :data="ongoingData[0]?.progressList" />
    </UCard>

    <div
        class="flex justify-end items-center mt-2 gap-2">
        <UButton
            v-if="ongoingData[0]?.remarks === 'FAILED' || ongoingData[0]?.remarks === 'PASSED' && ongoingData[0].countJobScreening !== 0"
            size="md"
            variant="solid"
            color="success"
            @click="finalizeApplicant">
            FINALIZE APPLICANT</UButton>
    </div>
</template>
