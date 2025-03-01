<script lang="ts" setup>
defineProps({
  table: {
    type: Object as PropType<Record<string, any> | null>,
    required: true,
    default: () => null,
  },
});

const page = ref(10)
const rowPerPage = ref([5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
</script>

<template>
  <div
    class="flex justify-center lg:justify-between items-center border-t border-(--ui-border) px-2 py-1 gap-3 flex-wrap">
    <span class="text-(--foreground) text-sm">Showing
      {{
        (table?.tableApi.getState().pagination.pageIndex ?? 0) *
        (table?.tableApi.getState().pagination.pageSize ?? 0) +
        1
      }}
      to
      {{
        Math.min(
          ((table?.tableApi.getState().pagination.pageIndex ?? 0) + 1) *
          (table?.tableApi.getState().pagination.pageSize ?? 0),
          table?.tableApi.getRowCount() ?? 0
        )
      }}
      of {{ table?.tableApi.getRowCount() ?? 0 }} results</span>

    <div class="flex justify-center flex-wrap items-center text-white gap-2">
      <span class="text-(--foreground) text-sm">Rows per page</span>
      <USelectMenu v-model="page" @change="table?.tableApi.setPageSize(page)" :items="rowPerPage" :search-input="false"
        size="sm" />
      <UPagination active-color="neutral" active-variant="solid"
        :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
        :items-per-page="table?.tableApi?.getState().pagination.pageSize"
        :total="table?.tableApi?.getFilteredRowModel().rows.length"
        @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)" />
    </div>
  </div>
</template>
