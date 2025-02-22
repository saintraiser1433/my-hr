<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import { resolveComponent, h } from 'vue';
const UButton = resolveComponent("UButton") as Component;
const props = defineProps({
    data: {
        type: Array as PropType<CourseModel[]>,
        required: true,
        default: () => []
    },
})
const { data } = toRefs(props);


const { createColumn } = useTableColumns(UButton);
const columns: TableColumn<CourseModel>[] = [
    createColumn("course_id", "#", (row) => `${row.index + 1}`),
    createColumn("description", "Course Name", (row) =>
        h("span", { class: "capitalize" }, row.getValue("description"))
    ),
    createColumn("score", "Score"),
];





</script>

<template>
    <div>
        <UITable :data="data" :columns="columns">
            <template #actions>
                <slot name="actions"></slot>
            </template>
        </UITable>
    </div>
</template>
