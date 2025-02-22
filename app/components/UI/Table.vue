<script setup lang="ts">
import { getPaginationRowModel } from "@tanstack/vue-table";
import { upperFirst } from "scule";
import type { TableColumn } from "@nuxt/ui";
const props = defineProps({
    data: {
        type: Array,
        required: true,
        default: () => []
    },
    columns: {
        type: Array as PropType<TableColumn<any>[]>,
        required: true,
        default: () => []
    }
})
const { data:datas } = toRefs(props);
const table = useTemplateRef("table");

const page = ref(10);
const rowPerPage = ref([5, 10, 30]);
const pagination = ref({
    pageIndex: 0,
    pageSize: 10,
});

const globalFilter = ref("");






</script>

<style lang="scss" scoped></style>

<template>
    <div class="flex justify-center lg:justify-between flex-wrap items-center py-2 gap-2 w-full">
        <div class="flex items-center gap-2">
            <UInput color="neutral" class="w-full" v-model="globalFilter" variant="outline" size="sm"
                placeholder="Search..." />

            <UDropdownMenu :items="table?.tableApi
                ?.getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => ({
                    label: upperFirst(column.id),
                    type: 'checkbox' as const,
                    checked: column.getIsVisible(),
                    onUpdateChecked(checked: boolean) {
                        table?.tableApi?.getColumn(column.id)?.toggleVisibility(!!checked)
                    },
                    onSelect(e?: Event) {
                        e?.preventDefault()
                    }
                }))
                " :content="{ align: 'end' }">
                <UButton label="Columns" size="sm" variant="solid" trailing-icon="i-lucide-chevron-down" />
            </UDropdownMenu>
        </div>
        <div class="flex flex-wrap justify-center items-center gap-2">
            <slot name="actions"></slot>

        </div>

    </div>
    <UCard :ui="{
        body: 'p-0 sm:p-0',
        footer: 'p-0 sm:px-0',
    }">
        <UTable :key="data.length" ref="table" v-model:global-filter="globalFilter"
            v-model:pagination="pagination" :pagination-options="{
                getPaginationRowModel: getPaginationRowModel(),
            }" :data="datas" :columns="columns" class="flex-1" :ui="{
                th: ' p-0 px-5 py-0 text-xs text-(--foreground)',
                td: 'p-0 px-5 py-2 text-xs text-(--foreground)',
            }" />
        <div
            class="flex justify-center lg:justify-between items-center border-t border-(--ui-border) px-2 py-1 gap-3 flex-wrap">
            <span class="text-(--foreground) text-xs">Showing
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
                <span class="text-(--foreground) text-xs">Rows per page</span>
                <USelectMenu v-model="page" @change="table?.tableApi.setPageSize(page)" :items="rowPerPage"
                    :search-input="false" size="sm" />
                <UPagination active-color="neutral" active-variant="solid"
                    :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
                    :items-per-page="table?.tableApi?.getState().pagination.pageSize"
                    :total="table?.tableApi?.getFilteredRowModel().rows.length"
                    @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)" />
            </div>
        </div>
        <!-- <template #footer>
      
    </template> -->
    </UCard>
</template>
