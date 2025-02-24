<script setup lang="ts">
import { ref, computed, h } from "vue";
import {
  getCoreRowModel,
  getPaginationRowModel,
  useVueTable,
  createColumnHelper,
} from "@tanstack/vue-table";

type Payment = {
  id: string;
  date: string;
  status: "paid" | "failed" | "refunded";
  email: string;
  amount: number;
};

const data = ref<Payment[]>([
  {
    id: "1",
    date: "2024-02-01",
    status: "paid",
    email: "user1@example.com",
    amount: 100,
  },
  {
    id: "2",
    date: "2024-02-02",
    status: "failed",
    email: "user2@example.com",
    amount: 200,
  },
  {
    id: "3",
    date: "2024-02-03",
    status: "refunded",
    email: "user3@example.com",
    amount: 300,
  },
]);

const columnHelper = createColumnHelper<Payment>();

const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => `#${info.getValue()}`,
  }),
  columnHelper.accessor("date", {
    header: "Date",
    cell: (info) => new Date(info.getValue()).toLocaleDateString(),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) =>
      h("span", { class: `badge badge-${info.getValue()}` }, info.getValue()),
  }),
  columnHelper.accessor("email", {
    header: "Email",
  }),
  columnHelper.accessor("amount", {
    header: "Amount",
    cell: (info) =>
      new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
        info.getValue()
      ),
  }),
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) =>
      h(
        "button",
        { class: "btn btn-danger", onClick: () => deleteRow(row.index) },
        "Delete"
      ),
  },
];

const table = useVueTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
});

const addRow = () => {
  data.value.push({
    id: (data.value.length + 1).toString(),
    date: new Date().toISOString().split("T")[0],
    status: "paid",
    email: `newuser${data.value.length + 1}@example.com`,
    amount: Math.floor(Math.random() * 500) + 100,
  });
};

const deleteRow = (index: number) => {
  data.value.splice(index, 1);
};
</script>

<template>
  <button @click="addRow" class="btn btn-primary">Add Row</button>

  <table class="table">
    <thead>
      <tr>
        <th v-for="column in table.getHeaderGroups()[0].headers" :key="column.id">
          {{ column.column.columnDef.header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in table.getRowModel().rows" :key="row.id">
        <td v-for="cell in row.getVisibleCells()" :key="cell.id">
          <component
            :is="cell.column.columnDef.cell({ row, getValue: cell.getValue })"
          ></component>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style>
.table {
  width: 100%;
  border-collapse: collapse;
}
.table th,
.table td {
  padding: 10px;
  border: 1px solid #ddd;
}
.btn {
  padding: 5px 10px;
  margin: 5px;
  cursor: pointer;
}
.btn-danger {
  background: red;
  color: white;
}
.btn-primary {
  background: blue;
  color: white;
}
.badge-paid {
  color: green;
}
.badge-failed {
  color: red;
}
.badge-refunded {
  color: orange;
}
</style>
