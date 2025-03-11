<script setup lang="ts">
import type { DropdownMenuItem, TableColumn } from "@nuxt/ui";
import { getPaginationRowModel } from "@tanstack/vue-table";
const UButton = resolveComponent("UButton") as Component;

const props = defineProps({
  data: {
    type: Array as PropType<TeamLeadModel[]>,
    required: true,
    default: () => [],
  },
  itemTemplate: {
    type: Array as PropType<any[]>,
    default: () => [],
  }
});

const emits = defineEmits<{
  (e: "update", payload: TeamLeadModel): void;
  (e: "delete", id: number): void;
  (e: "singleApply", payload: TeamLeadModel): void;
}>();

const { pagination, globalFilter, refreshTable } = usePagination();
const table = useTemplateRef("table");
const { createColumn } = useTableColumns(UButton);
const { $toast } = useNuxtApp();
const { itemTemplate } = toRefs(props);
const expanded = ref({ 0: false });
const value = ref(0);

const handleDelete = (id: number) => {
  emits("delete", id);
};

const handleUpdate = (item: TeamLeadModel) => {
  emits("update", item);
};

const onSubmit = (teamLeadId: number,headerId:number) => {
  const data = itemTemplate.value.find((item) => Number(item.id) == Number(headerId));
  if (value.value === 0) {
    $toast.error("Please select template before submit");
  }

  emits("singleApply", { id: teamLeadId, template:data.label,templateHeaderId:data.id });
}




const columns: TableColumn<any>[] = [
  createColumn("increment", "#", true,(row) => `${row.index+1}`),
  createColumn("name", "Category", true, (row) =>
    h("span", { class: "capitalize" }, row.getValue("name"))
  ),
  createColumn("template", "Template", true),
  createColumn("percentage", "Percentage", true),
  createColumn("action", "Action", false),
];


const getDropdownActions = (datas: TeamLeadModel): DropdownMenuItem[][] => {
  return [
    [
      {
        label: "Manage Criteria",
        icon: "i-lucide-view",
        onSelect: async () => {
          // titleName.value = user.title || "";
          // localStorage.setItem("title", titleName.value);
          await navigateTo({
            name: "Evaluation-teamlead-criteria-id",
            params: { id: Number(datas.id) },
          });
        },
      },
      {
        type: "separator",
      },
      {
        label: "Edit",
        icon: "i-lucide-eye",
        onSelect: () => {
          handleUpdate(datas);
        },
      },
      {
        type: "separator",
      },
      {
        label: "Remove",
        icon: "i-lucide-trash",
        color: "error",
        onSelect: () => {
          handleDelete(Number(datas.id));
        },
      },
    ],
  ];
};

watch(
  () => props.data,
  (newVal, oldVal) => {
    if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
      refreshTable();
    }
  }
);
</script>

<template>
  <UITableSearch v-model:search="globalFilter" v-if="table" :table="table">
    <template #actions>
      <slot name="actions"></slot>
    </template>
  </UITableSearch>
  <UCard :ui="{
    root: 'overflow-hidden ',
    body: 'p-0 sm:p-0',
    footer: 'p-0 sm:px-0',
  }">
    <UTable sticky class="overflow-y-auto custom-scrollbar h-120 lg:h-150 cursor-auto" ref="table"
      v-model:expanded="expanded" :ui="{
        tr: 'data-[expanded=true]:bg-(--ui-bg-elevated)/50',
      }" v-model:global-filter="globalFilter" v-model:pagination="pagination" :pagination-options="{
        getPaginationRowModel: getPaginationRowModel(),
      }" :data="data" :columns="columns">
      <template #percentage-cell="{row}">
        <span>{{ row.original.percentage * 100 }}%</span>
      </template>
      <template #template-cell="{ row }">
        <div class="flex items-center uppercase gap-1 " v-if="row.original.template">
          <UBadge variant="soft">{{ row.original.template }}</UBadge>
          <UPopover arrow :content="{
            align: 'center',
            side: 'right',
            sideOffset: 8,
          }">
            <UButton variant="ghost" size="sm" color="success" icon="material-symbols:change-circle-outline"></UButton>
            <template #content>
              <div class="flex flex-col items-start gap-2 p-2">
                <h5 class="font-semibold">Template</h5>
                <USelectMenu v-model="value" size="sm" value-key="id" :items="itemTemplate" class="w-48" :ui="{
                  item: 'capitalize'
                }" placeholder="Select Template" />
                <UButton @click="onSubmit(row.original.id,value)" variant="solid">Save</UButton>
              </div>
            </template>
          </UPopover>
        </div>
        <div class="flex items-center uppercase gap-1 " v-else>
          <UBadge color="error" variant="soft">Template Not Set</UBadge>
          <UPopover arrow :content="{
            align: 'center',
            side: 'right',
            sideOffset: 8,
          }">
             <UButton variant="ghost" color="success" icon="material-symbols:change-circle-outline"></UButton>
            <template #content>
              <div class="flex flex-col items-start gap-2 p-2">
                <h5 class="font-semibold">Template</h5>
                <USelectMenu v-model="value" size="sm" value-key="id" :items="itemTemplate" class="w-48" :ui="{
                  item: 'capitalize'
                }" placeholder="Select Template" />
                <UButton @click="onSubmit(row.original.id,value)" variant="solid">Save</UButton>
              </div>
            </template>
          </UPopover>
        </div>

      </template>
      <template #action-cell="{ row }">
        <div class="flex items-center gap-2">
          <UDropdownMenu :items="getDropdownActions(row.original)">
            <UButton icon="i-lucide-ellipsis-vertical" color="neutral" variant="ghost" />
          </UDropdownMenu>
        </div>
      </template>
    </UTable>
    <UITablePagination :table="table" v-if="table"> </UITablePagination>
  </UCard>
</template>
