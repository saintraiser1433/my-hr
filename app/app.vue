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
