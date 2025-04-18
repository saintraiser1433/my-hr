<script setup lang="ts">
import type {
    TableColumn
} from "@nuxt/ui";
import {
    getPaginationRowModel
} from "@tanstack/vue-table";
const UButton = resolveComponent("UButton") as Component;

const props = defineProps({
    data: {
        type: Array as PropType < ScreeningProgressList[] > ,
        default: () => [],
    },
    items: {
        type: Array as PropType < ScreeningModel[] > ,
        required: true,
        default: () => [],
    },
});

const emits = defineEmits<{
    (e: "assign", payload: ScreeningModel[]): void;
    (e: "deleteScreening", payload: number): void;
    (e: "dataDate", payload: InterviewDate): void;
    (e: "dataStatus", payload: InterviewStatus): void;
}>();


const {
    data
} = toRefs(props);

const {
    $toast
} = useNuxtApp();


const table = useTemplateRef("table");
const {
    createColumn
} = useTableColumns(UButton);
const {
    $datefns
} = useNuxtApp();
const {
    pagination,
    globalFilter,
    refreshTable
} = usePagination();
const value = ref([]);
const rowSelection = ref({});
// const rowSelection = ref<{ [key: number]: boolean }>({});
const columns: TableColumn <any>[] = [
    createColumn("sequence", "Sequence", true, (row) => `${row.original.sequence_number}`),
    createColumn("screening", "Screening Title", true),
    createColumn("dateInterview", "Date & Time Interview", true),
    createColumn("status", "Status", true),
    createColumn("action", "Action", false),
];

const model = ref <InterviewDate> ({
    date: "",
    id: 0,
    screening: "",
});

const updateDate = async (data: InterviewDate) => {
    model.value = data;
};

const onSubmit = async (data: InterviewDate) => {
    emits("dataDate", data);
};

const updateStatus = async (data: InterviewStatus) => {
    emits("dataStatus", data);
};

const assignScreening = () => {
    if (!value.value.length) {
        return $toast.error("No selected type found");
    }
    emits("assign", value.value);
    value.value = [];
    rowSelection.value = {};
}

const deleteScreening = (id:number) => {
  emits('deleteScreening',id);
}

watch(
    () => props.data,
    (newVal, oldVal) => {
        if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
            refreshTable();
        }
        if (!newVal.length) return;
        const firstFailedIndex = newVal.findIndex((row) => row.status === "FAILED");

        const newSelection: {
            [key: number]: boolean
        } = {};

        newVal.forEach((row, index) => {
            if (index > firstFailedIndex && firstFailedIndex !== -1) {
                newSelection[index] = true;
            }
        });

        rowSelection.value = {
            ...newSelection
        };
    }, {
        deep: true,
        immediate: true
    }
);
</script>

<template>

    <div
        class="flex items-center p-2 gap-2">
        <USelectMenu
            v-model="value"
            :items="items"
            label-key="title"
            size="md"
            placeholder="Select Screening Type"
            class="w-100"
            :ui="{
          value: 'text-wrap',
          item: 'capitalize',
        }"
            multiple />

        <UButton
            icon="i-typcn-plus"
            @click="assignScreening"
            color="primary"
            variant="solid"
            size="md">
        </UButton>
    </div>

    <USeparator></USeparator>
    <UTable
        sticky
        class="overflow-y-auto custom-scrollbar h-auto cursor-auto"
        ref="table"
        v-model:row-selection="rowSelection"
        v-model:global-filter="globalFilter"
        v-model:pagination="pagination"
        :pagination-options="{
        getPaginationRowModel: getPaginationRowModel(),
      }"
        :data="data"
        :columns="columns"
        :ui="{
        tr: 'data-[selected=true]:pointer-events-none',
      }">
        <template #empty>
            <div
                class="flex gap-2 flex-col items-center text-center">
                <svg-icon
                    name="iconx/nofound"
                    width="64"
                    height="64"></svg-icon>
                <h3
                    class="text-lg font-semibold text-gray-600">No data available</h3>
                <p
                    class="text-sm text-gray-500">Try adjusting your filters or check back later.</p>
            </div>
        </template>
        <template #screening-cell="{ row }">
            <span class="capitalize">{{ row.original.screening.title }}</span>
        </template>
        <template #dateInterview-cell="{ row }">
            <UButton
                v-if="row.original.status !== 'PENDING'"
                label="Open"
                color="neutral"
                :variant="row.original.dateInterview ? 'solid' : 'subtle'">{{
            $datefns.format(new Date(row.original.dateInterview), "dd-MMM-yyyy / hh:mm a")
          }}</UButton>
            <UPopover
                v-else
                arrow
                :content="{
            align: 'center',
            side: 'left',
            sideOffset: 8,
          }">
                <UButton
                    label="Open"
                    color="neutral"
                    :variant="row.original.dateInterview ? 'solid' : 'subtle'"
                    @click="
              updateDate({
                id: row.original.id,
                date: row.original.dateInterview,
                screening: row.original.screening.title,
              })
            ">{{
              row.original.dateInterview
                ? $datefns.format(
                    new Date(row.original.dateInterview),
                    "dd-MMM-yyyy / hh:mm a"
                  )
                : "Set Date & Time"
            }}</UButton>

                <template #content>
                    <div
                        class="flex flex-col items-start gap-2 p-2">
                        <h5
                            class="font-semibold">Date Time</h5>
                        <UITextInput
                            type="datetime-local"
                            v-model="model.date"
                            required />
                        <UButton
                            @click="onSubmit(model)"
                            variant="subtle">Save</UButton>
                    </div>
                </template>
            </UPopover>
        </template>
        <template #status-cell="{ row }">
            <UBadge
                v-if="row.original.status == 'PENDING'"
                icon="i-lucide-timer"
                color="neutral"
                variant="outline">TO BE RATED</UBadge>
            <UBadge
                v-else-if="row.original.status == 'FAILED'"
                icon="i-lucide-x"
                color="error"
                variant="outline">FAILED TO PROCEED</UBadge>
            <UBadge
                v-else-if="row.original.status == 'PASSED'"
                icon="i-lucide-check">PASSED</UBadge>
            <UBadge
                v-else>UKNOWN RATE</UBadge>
        </template>

        <template #action-cell="{ row }">
            <div
                class="flex gap-1 items-center">
                <UPopover
                    v-if="row.original.dateInterview"
                    arrow
                    :content="{
              align: 'center',
              side: 'left',
              sideOffset: 8,
            }">
                    <UButton
                        icon="i-lucide-eye"
                        title="Review"
                        size="sm"> </UButton>

                    <template #content>
                        <div
                            class="flex items-start gap-2 p-2">
                            <UButton
                                color="primary"
                                icon="i-lucide-check"
                                @click="
                    updateStatus({
                      id: row.original.id,
                      status: ApplicationStatus.PASSED,
                    })
                  ">Passed</UButton>
                            <UButton
                                icon="i-lucide-x"
                                color="error"
                                @click="
                    updateStatus({
                      id: row.original.id,
                      status: ApplicationStatus.FAILED,
                    })
                  ">Failed</UButton>
                        </div>
                    </template>
                </UPopover>
                <UButton icon="i-lucide-x" color="error" @click="deleteScreening(row.original.id)" ></UButton>

            </div>
        </template>
    </UTable>
    <UITablePagination
        :table="table"
        v-if="table"> </UITablePagination>

</template>
