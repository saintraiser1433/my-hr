<script setup lang="ts">
import type { DropdownMenuItem, TableColumn } from "@nuxt/ui";
import { getPaginationRowModel } from "@tanstack/vue-table";
const UButton = resolveComponent("UButton") as Component;

const props = defineProps({
  data: {
    type: Array as PropType<JobModel[]>,
    required: true,
    default: () => [],
  },
});

const emits = defineEmits<{
  (e: "update", payload: JobModel): void;
  (e: "view", payload: JobModel): void;
  (e: "delete", id: number): void;
}>();

const { pagination, globalFilter, refreshTable } = usePagination();
const table = useTemplateRef("table");

const { createColumn } = useTableColumns(UButton);

const handleDelete = (id: number) => {
  emits("delete", id);
};

const handleUpdate = (item: JobModel) => {
  emits("update", item);
};

const handleView = (item: JobModel) => {
  emits("view", item);
};

const titleName = useState("title", () => "");

const columns: TableColumn<any>[] = [
  createColumn("increment", "#", true, (row) => `${row.index + 1}`),
  createColumn("title", "Job Title", true, (row) => row.getValue("title")),
  createColumn("department", "Department", true),
  createColumn("totalAvailable", "Available", false),
  createColumn("status", "Status", false),
  createColumn("action", "Action", false),
];

const getDropdownActions = (user: JobModel): DropdownMenuItem[][] => {
  return [
    [
      {
        label: "Assign",
        icon: "i-hugeicons-assignments",
        onSelect: async () => {
          titleName.value = user.title || "";
          localStorage.setItem("title", titleName.value);
          await navigateTo({ name: "Job-jobId", params: { jobId: Number(user.id) } });
        },
      },
      {
        type: "separator",
      },
      {
        label: "View",
        icon: "i-lucide-eye",
        onSelect: () => {
          handleView({ ...user, id: Number(user.id) });
        },
      },
      {
        type: "separator",
      },
      {
        label: "Edit",
        icon: "i-lucide-edit",
        onSelect: () => {
          handleUpdate({ ...user, id: Number(user.id) });
        },
      },
      {
        type: "separator",
      },
      {
        label: "Delete",
        icon: "i-lucide-trash",
        color: "error",
        onSelect: () => {
          handleDelete(Number(user.id));
        },
      },
    ],
  ];
}

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
    <UTable sticky class="overflow-y-auto custom-scrollbar h-100 lg:h-170 cursor-auto" ref="table"
      v-model:global-filter="globalFilter" v-model:pagination="pagination" :pagination-options="{
        getPaginationRowModel: getPaginationRowModel(),
      }" :data="data" :columns="columns">
      <template #department-cell="{ row }">
        <span class="capitalize">{{ row.original.department.title }}</span>
      </template>
      <template #status-cell="{ row }">
        <UBadge v-if="row.original.status" color="neutral" variant="solid">Active</UBadge>
        <UBadge v-else color="neutral" variant="outline">Inactive</UBadge>
      </template>

      <template #action-cell="{ row }">
        <UDropdownMenu :items="getDropdownActions(row.original)">
          <UButton icon="i-lucide-ellipsis-vertical" color="neutral" variant="ghost" />
        </UDropdownMenu>
      </template>
    </UTable>
    <UITablePagination v-if="table" :table="table" v-model:page="pagination.pageSize">
    </UITablePagination>
  </UCard>
</template>
