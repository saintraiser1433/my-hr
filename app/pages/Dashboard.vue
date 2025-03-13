<script setup lang="ts">
const store = useAcademicYearStore();
const s = useAuthStore();
definePageMeta({
  requiredRole: "Admin",
});

</script>
<template>
  <div>
    {{store.acadId}}
    {{ s.getDeptId }}
  </div>
</template>
