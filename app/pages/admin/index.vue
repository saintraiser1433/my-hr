<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import { getPaginationRowModel, createColumnHelper } from "@tanstack/vue-table";
import { upperFirst } from "scule";

const UButton = resolveComponent("UButton");
const table = useTemplateRef("table");
type Payment = {
  id: string;
  date: string;
  status: "paid" | "failed" | "refunded";
  email: string;
  amount: number;
};

const data = ref<Payment[]>([
  {
    id: "4600",
    date: "2024-03-11T15:30:00",
    status: "paid",
    email: "james.anderson@example.com",
    amount: 594,
  },
  {
    id: "4599",
    date: "2024-03-11T10:10:00",
    status: "failed",
    email: "mia.white@example.com",
    amount: 276,
  },
  {
    id: "4598",
    date: "2024-03-11T08:50:00",
    status: "refunded",
    email: "william.brown@example.com",
    amount: 315,
  },
  {
    id: "4597",
    date: "2024-03-10T19:45:00",
    status: "paid",
    email: "emma.davis@example.com",
    amount: 529,
  },
  {
    id: "4596",
    date: "2024-03-10T15:55:00",
    status: "paid",
    email: "ethan.harris@example.com",
    amount: 639,
  },
  {
    id: "4596",
    date: "2024-03-10T15:55:00",
    status: "paid",
    email: "ethan.harris@example.com",
    amount: 639,
  },
  {
    id: "4596",
    date: "2024-03-10T15:55:00",
    status: "paid",
    email: "ethan.harris@example.com",
    amount: 639,
  },
  {
    id: "4596",
    date: "2024-03-10T15:55:00",
    status: "paid",
    email: "ethan.harris@example.com",
    amount: 639,
  },
  {
    id: "4596",
    date: "2024-03-10T15:55:00",
    status: "paid",
    email: "ethan.harris@example.com",
    amount: 639,
  },
  {
    id: "4596",
    date: "2024-03-10T15:55:00",
    status: "paid",
    email: "ethan.harris@example.com",
    amount: 639,
  },
  {
    id: "4596",
    date: "2024-03-10T15:55:00",
    status: "paid",
    email: "ethan.harris@example.com",
    amount: 639,
  },
  {
    id: "4596",
    date: "2024-03-10T15:55:00",
    status: "paid",
    email: "ethan.harris@example.com",
    amount: 639,
  },
  {
    id: "4596",
    date: "2024-03-10T15:55:00",
    status: "paid",
    email: "ethan.harris@example.com",
    amount: 639,
  },
  {
    id: "4596",
    date: "2024-03-10T15:55:00",
    status: "paid",
    email: "ethan.harris@example.com",
    amount: 639,
  },
  {
    id: "4596",
    date: "2024-03-10T15:55:00",
    status: "paid",
    email: "ethan.harris@example.com",
    amount: 639,
  },
]);
const columns: TableColumn<Payment>[] = [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => `#${row.getValue("id")}`,
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return h(UButton, {
        color: "neutral",
        variant: "ghost",
        label: "Date",
        size: "sm",
        icon: isSorted
          ? isSorted === "asc"
            ? "i-lucide-arrow-up-narrow-wide"
            : "i-lucide-arrow-down-wide-narrow"
          : "i-lucide-arrow-up-down",
        class: "-mx-2.5 text-xs",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
      });
    },
    cell: ({ row }) => {
      return new Date(row.getValue("date")).toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return h(UButton, {
        color: "neutral",
        variant: "ghost",
        label: "Email",
        icon: isSorted
          ? isSorted === "asc"
            ? "i-lucide-arrow-up-narrow-wide"
            : "i-lucide-arrow-down-wide-narrow"
          : "i-lucide-arrow-up-down",
        class: "-mx-2.5 text-xs",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
      });
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return h(UButton, {
        color: "neutral",
        variant: "ghost",
        label: "Amount",
        size: "sm",
        icon: isSorted
          ? isSorted === "asc"
            ? "i-lucide-arrow-up-narrow-wide"
            : "i-lucide-arrow-down-wide-narrow"
          : "i-lucide-arrow-up-down",
        class: "-mx-2.5 text-xs flex flex-end",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
      });
    },
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "EUR",
      }).format(amount);
      return formatted;
    },
  },
];

const page = ref(10);
const rowPerPage = ref([5, 10, 30]);
const pagination = ref({
  pageIndex: 0,
  pageSize: 10,
});

const globalFilter = ref("");
const columnVisibility = ref({
  id: false,
});
</script>

<template>
  <div class="flex flex-col items-center lg:items-start mb-3">
    <h2 class="font-extrabold text-2xl">Employee list!</h2>
    <span class="text-sm">Here's a list of employees applied!</span>
  </div>
  <div
    class="flex justify-center lg:justify-between flex-wrap items-center py-2 gap-2 w-full"
  >
    <div class="flex items-center gap-2">
      <UInput
        color="neutral"
        class="w-full"
        v-model="globalFilter"
        variant="outline"
        size="sm"
        placeholder="Search..."
      />

      <UDropdownMenu
        :items="
          table?.tableApi
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
        "
        :content="{ align: 'end' }"
      >
        <UButton
          label="Columns"
          color="neutral"
          size="sm"
          variant="outline"
          trailing-icon="i-lucide-chevron-down"
        />
      </UDropdownMenu>
    </div>
    <UButton icon="i-lucide-plus" size="sm" color="neutral" variant="outline"
      >Add Employees</UButton
    >
  </div>
  <UCard
    :ui="{
      body: 'p-0 sm:p-0',
      footer: 'p-0 sm:px-0',
    }"
  >
    <UTable
      ref="table"
      v-model:column-visibility="columnVisibility"
      v-model:global-filter="globalFilter"
      v-model:pagination="pagination"
      :pagination-options="{
        getPaginationRowModel: getPaginationRowModel(),
      }"
      :data="data"
      :columns="columns"
      class="flex-1"
      :ui="{
        th: ' p-0 px-5 py-0 text-xs text-(--foreground)',
        td: 'p-0 px-5 py-2 text-xs text-(--foreground)',
      }"
    />
    <div
      class="flex justify-center lg:justify-between items-center border-t border-(--ui-border) px-2 py-1 gap-3 flex-wrap"
    >
      <span class="text-(--foreground) text-xs"
        >Showing
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
        of {{ table?.tableApi.getRowCount() ?? 0 }} results</span
      >

      <div class="flex justify-center flex-wrap items-center text-white gap-2">
        <span class="text-(--foreground) text-xs">Rows per page</span>
        <USelectMenu
          v-model="page"
          @change="table?.tableApi.setPageSize(page)"
          :items="rowPerPage"
          :search-input="false"
          size="sm"
        />
        <UPagination
          active-color="neutral"
          active-variant="solid"
          :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
          :items-per-page="table?.tableApi?.getState().pagination.pageSize"
          :total="table?.tableApi?.getFilteredRowModel().rows.length"
          @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
        />
      </div>
    </div>
    <!-- <template #footer>
      
    </template> -->
  </UCard>
</template>
