

import { h } from "vue";
import type { TableColumn } from "@nuxt/ui";

/**
 * Generates table columns dynamically with customizable headers and cell renderers.
 */
// Adjust path as needed

export function useTableColumns(UButton: Component) {
  const createColumn = <T>(
    key: keyof T,
    label: string,
    sortable: boolean = true,
    cellRenderer?: (row: any) => any,

  ): TableColumn<T> => ({
    accessorKey: key as string,
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      if (!sortable) {
        return h("span", {}, label);
      }

      return h(UButton, {
        color: "neutral",
        variant: "ghost",
        label,
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

    cell: ({ row }) =>
      cellRenderer ? cellRenderer(row) : h("span", {}, row.getValue(key as string)),
  });



  return { createColumn };
}



export function useTableColumnCheckBox(UCheckbox: Component, table: any) {

  const createColumnWithCheckBox = <T>(
    // Ensure the correct type here
  ): TableColumn<T> => ({
    id: 'select',
    header: ({ table }) =>
      h(UCheckbox, {
        modelValue: table.getIsSomePageRowsSelected()
          ? 'indeterminate'
          : table.getIsAllPageRowsSelected(),
        'onUpdate:modelValue': (value: boolean | 'indeterminate') =>
          table.toggleAllPageRowsSelected(!!value),
        ariaLabel: 'Select all'
      }),
    cell: ({ row }) =>
      h(UCheckbox, {
        modelValue: row.getIsSelected(),
        'onUpdate:modelValue': (value: boolean | 'indeterminate') =>
          row.toggleSelected(!!value),
        ariaLabel: 'Select row'
      })
  });


  return { createColumnWithCheckBox };
}
