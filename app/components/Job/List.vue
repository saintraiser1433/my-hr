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

const handleView = (item:JobModel) => {
  emits("view", item);
}

const columns: TableColumn<any>[] = [
  createColumn("increment", "#", true, (row) => `${row.index + 1}`),
  createColumn("title", "Job Title", true, (row) => row.getValue("title")),
  createColumn("departmentTitle", "Department", true, (row) => row.getValue("departmentTitle")),
  createColumn("totalAvailable", "Available", false),
  createColumn("status", "Status", false),
  createColumn("action", "Action", false),
];

function getDropdownActions(user: User): DropdownMenuItem[][] {
  return [

    [
      {
        label: 'View',
        icon: 'i-lucide-eye',
        onSelect: () => {
          handleView({ ...user, id: Number(user.id) });
        }
      },
      {
        type: 'separator'
      },
      {
        label: 'Edit',
        icon: 'i-lucide-edit',
        onSelect: () => {
          handleUpdate({ ...user, id: Number(user.id) });
        }
      },
      {
        type: 'separator'
      },
      {
        label: 'Delete',
        icon: 'i-lucide-trash',
        color: 'error',
        onSelect: () => {
          handleDelete(Number(user.id));

        }
      }
    ]
  ]
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
      <template #status-cell="{ row }">
        <UBadge v-if="row.original.status" color="neutral" variant="solid">Active</UBadge>
        <UBadge v-else color="neutral" variant="outline">Inactive</UBadge>
      </template>


      <template #action-cell="{ row }">
        <UDropdownMenu :items="getDropdownActions(row.original)">
          <UButton icon="i-lucide-ellipsis-vertical" color="neutral" variant="ghost" />
        </UDropdownMenu>
        <!-- <div class="flex items-center gap-2">
          <UButton color="secondary" variant="solid" size="sm" @click="handleDelete(row.original.id || 0)">
            <Icon name="lucide:eye"></Icon>
          </UButton>
          <UButton size="sm" @click="handleUpdate(row.original)">
            <Icon name="lucide:edit"></Icon>
          </UButton>
          <UButton color="primary" variant="outline" size="sm" @click="handleDelete(row.original.id || 0)">
            <Icon name="lucide:x"></Icon>
          </UButton>

        </div> -->
      </template>
    </UTable>
    <UITablePagination v-if="table" :table="table" v-model:page="pagination.pageSize">
    </UITablePagination>
  </UCard>
</template>
