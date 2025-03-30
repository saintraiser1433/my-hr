<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
const smsStore = useStoreSms();
const { $joi, $toast } = useNuxtApp();
const formRef = useTemplateRef("formRef");
const { handleApiError } = useErrorHandler();
const openSlideOver = useState<boolean>("slideover-toggle");
const schema = $joi.object({
  serverAddress: $joi.string().required(),
  username: $joi.string().required(),
  password: $joi.string().min(6).required(),
});

const state = reactive<SMSSSetings>({
  serverAddress: smsStore.config.serverAddress,
  username: smsStore.config.username,
  password: smsStore.config.password,
});

const onSubmit = async (event: FormSubmitEvent<SMSSSetings>) => {
  try {
    const updateConfig = await smsStore.updateConfig(state);
    $toast.success("Successfully update config");
  } catch (err) {
    handleApiError(err);
  }
};
const isShown = ref(false);
const showPassword = () => {
  isShown.value = !isShown.value;
};

const submitForm = () => {
  if (formRef.value) {
    formRef.value.submit();
  }
};
</script>

<template>
  <USlideover
    v-model:open="openSlideOver"
    title="SMS Settings"
    description="Please enter the ip device of mobile and its basic auth"
    :ui="{ footer: 'justify-end', content: 'max-w-xs' }"
  >
    <template #body>
      <UForm
        ref="formRef"
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField label="Server Address" name="serverAddress" required>
          <UITextInput :is-capitalize="false" v-model="state.serverAddress" type="text" />
        </UFormField>
        <UFormField label="Username" name="username">
          <UITextInput :is-capitalize="false" v-model="state.username" type="text" />
        </UFormField>
        <UFormField label="Password" name="password">
          <UButtonGroup size="sm" class="w-full" orientation="horizontal">
            <UInput
              placeholder="•••••••••"
              :ui="{ base: 'normal-case' }"
              class="w-full"
              :type="isShown ? 'text' : 'password'"
              v-model="state.password"
            />
            <UButton
              size="xs"
              @click="showPassword"
              variant="soft"
              color="primary"
              icon="i-mdi-eye"
            />
          </UButtonGroup>
        </UFormField>
      </UForm>
    </template>

    <template #footer>
      <UButton
        label="Cancel"
        color="neutral"
        variant="outline"
        @click="openSlideOver = false"
      />
      <UButton label="Submit" color="neutral" @click="submitForm" />
    </template>
  </USlideover>
</template>
