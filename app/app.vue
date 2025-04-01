<template>
  <div>
    <UApp :toaster="{ position: 'top-right' }">
      <div class="bg-(--ui-bg)" data-vaul-drawer-wrapper>
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </div>
    </UApp>
  </div>
</template>

<script setup lang="ts">
const candidateExpiry = ref<CandidateExpiryData[]>([]);
const { send } = useSms();
const { $api } = useNuxtApp();
const { data: expiryData, refresh } = useAPI<CandidateExpiryData[]>(
  "/requirements/expiry"
);
const checkInterval = 5000;
let intervalId: NodeJS.Timeout;

const generateMessage = (candidate: CandidateExpiryData) => {
  const expiryDate = candidate.expiryDate ? new Date(candidate.expiryDate) : null;
  const formattedDate = expiryDate?.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    `Dear ${candidate.fullname},\n\n` +
    `School of SEAIT HR Notification:\n` +
    `Your ${candidate.requirements} will expire on ${formattedDate}.\n` +
    `Please submit the updated document at your earliest convenience.\n\n` +
    `Thank you,\nSEAIT HR Department`
  );
};

const checkAndSendNotifications = async () => {
  try {
    await refresh();
    await updateExpiredReq();
    if (expiryData.value?.length) {
      candidateExpiry.value = expiryData.value;

      for (const candidate of candidateExpiry.value) {
        try {
          const message = generateMessage(candidate);
          await send(message, candidate.contact_number);
          await $api(`/requirements/mark-sent/${candidate.id}`, {
            method: "PUT",
          });
        } catch (error) {
          console.error(`SMS failed for ${candidate.fullname}:`, error);
        }
      }
    }
  } catch (error) {
    console.error("Failed to check requirements:", error);
  }
};

const updateExpiredReq = async () => {
  const result = await $api<any>("/requirements/updateExpiry");
  if (result.success) {
    for (const msg of result.messages) {
      await send(msg.message, msg.contactNumber);
    }
  }
};

onMounted(async () => {
  await checkAndSendNotifications();
  // intervalId = setInterval(checkAndSendNotifications, checkInterval);
});

onBeforeUnmount(() => {
  // clearInterval(intervalId);
});
</script>
