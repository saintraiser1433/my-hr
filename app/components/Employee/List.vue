<script setup lang="ts">
import type { DropdownMenuItem, TableColumn } from "@nuxt/ui";
import { getPaginationRowModel } from "@tanstack/vue-table";
const UButton = resolveComponent("UButton") as Component;

const props = defineProps({
  data: {
    type: Array as PropType<EmployeeModel[]>,
    required: true,
    default: () => [],
  },
});

const emits = defineEmits<{
  (e: "assign", data: EmployeeModel): void;
  (e: "unassign", data: EmployeeModel): void;
}>();

const table = useTemplateRef("table");
const { createColumn } = useTableColumns(UButton);
const { pagination, globalFilter, refreshTable } = usePagination();
const config = useRuntimeConfig();

const columns: TableColumn<any>[] = [
  createColumn("increment", "#", true, (row) => `${row.index + 1}`),
  createColumn("employeeName", "Employee Name", true),
  createColumn("status", "Status", true),
  createColumn("username", "Username", true),
  createColumn("password", "Password", true),
  createColumn("role", "Role", true),
  createColumn("action", "Action", false),
];
const visiblePasswords = ref<Set<number>>(new Set());
const togglePassword = (index: number) => {
  if (visiblePasswords.value.has(index)) {
    visiblePasswords.value.delete(index);
  } else {
    visiblePasswords.value.add(index);
  }
};

const isPasswordVisible = (index: number): boolean => {
  return visiblePasswords.value.has(index);
};

const handleAssign = (data: EmployeeModel) => {
  emits("assign", data);
};
const handleunAssign = (data: EmployeeModel) => {
  emits("unassign", data);
};

const getDropdownActions = (user: EmployeeModel): DropdownMenuItem[][] => {
  const actions: DropdownMenuItem[] = [];

  // Check if the user is a TeamLead
  if (user.role === "TeamLead") {
    actions.push(
      {
        label: "Un-assigned as Teamlead",
        icon: "material-symbols:social-leaderboard",
        onSelect: async () => {
          handleunAssign(user);
        },
      },
      {
        type: "separator",
      }
    );
  } else {
    actions.push(
      {
        label: "Assign as Teamlead",
        icon: "material-symbols:social-leaderboard",
        onSelect: async () => {
          handleAssign(user);
        },
      },
      {
        type: "separator",
      }
    );
  }

  actions.push(
    {
      label: "Check Requirements",
      icon: "i-hugeicons-assignments",
      onSelect: async () => {
        await navigateTo({
          name: "Employees-require-empId",
          params: { empId: Number(user.id) },
        });
      },
    },
    {
      type: "separator",
    },
    {
      label: "View Details",
      icon: "i-lucide-eye",
      onSelect: async () => {
        await navigateTo({
          name: "Employees-information-empId",
          params: { empId: Number(user.id) },
        });
      },
    }
  );

  return [actions];
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
  <UCard
    :ui="{
      root: 'overflow-hidden ',
      body: 'p-0 sm:p-0',
      footer: 'p-0 sm:px-0',
    }"
  >
    <UTable
      sticky
      class="overflow-y-auto custom-scrollbar h-auto cursor-auto"
      ref="table"
      v-model:global-filter="globalFilter"
      v-model:pagination="pagination"
      :pagination-options="{
        getPaginationRowModel: getPaginationRowModel(),
      }"
      :data="data"
      :columns="columns"
    >
    <template #empty>
      <div class="flex gap-2 flex-col items-center text-center">
          <svg-icon name="iconx/nofound" width="64" height="64"></svg-icon>
          <h3 class="text-lg font-semibold text-gray-600">No data available</h3>
          <p class="text-sm text-gray-500">Try adjusting your filters or check back later.</p>
      </div>

    </template>
      <template #employeeName-cell="{ row }">
        <div class="flex items-center gap-3">
          <UAvatar
            :src="`${config.public.STORAGE_URL_AVATAR}/${row.original.information.photo_path}`"
            size="lg"
          />
          <div>
            <p class="font-medium capitalize text-(--ui-text-highlighted)">
              {{ row.original.employeeName }}
            </p>
            <p class="text-gray-800">
              {{ row.original.job.title }}
            </p>
          </div>
        </div>
      </template>
      <template #status-cell="{ row }">
        <UBadge  v-if="row.original.status" color="neutral" variant="solid">Active</UBadge>
        <UBadge v-else color="neutral" variant="outline">Inactive</UBadge>
      </template>
      <template #role-cell="{ row }">
        <UBadge v-if="row.original.role === 'Employee'" variant="outline">MEMBER</UBadge>
        <UBadge v-if="row.original.role === 'TeamLead'" color="error" variant="subtle"
          >TEAM LEAD</UBadge
        >
      </template>
      <template #username-cell="{ row }">
        <span>{{ row.original.username }}</span>
      </template>
      <template #password-cell="{ row }">
        <div class="flex items-center gap-3">
          <span v-if="!isPasswordVisible(row.index)">•••••••••</span>
          <span v-else>{{ row.original.password }}</span>
          <UButton
            :icon="isPasswordVisible(row.index) ? 'i-mdi-hide' : 'i-mdi-show'"
            variant="soft"
            color="primary"
            size="xs"
            @click="togglePassword(row.index)"
          />
        </div>
      </template>
      <template #action-cell="{ row }">
        <UDropdownMenu :items="getDropdownActions(row.original)">
          <UButton icon="i-lucide-ellipsis-vertical" color="neutral" variant="ghost" />
        </UDropdownMenu>
      </template>
    </UTable>
    <UITablePagination :table="table" v-if="table"> </UITablePagination>
  </UCard>
</template>
