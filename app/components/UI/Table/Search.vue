<script lang="ts" setup>
import { type Column } from "@tanstack/vue-table"; // Import Column type
import { upperFirst } from "scule";
defineProps({
  table: {
    type: Object as PropType<Record<string, any> | null>,
    required: true,
    default: () => null,
  },
  hasSearch:{
    type:Boolean,
    default:true,
  },
  hasColumnFilter:{
    type:Boolean,
    default:true,
  }
});
const globalFilter = defineModel<string>('search',{ required: true });
</script>

<template>
  <div
    class="flex justify-center lg:justify-between px-2 flex-wrap items-center py-2 gap-2 w-full"
  >
    <div class="flex items-center gap-2">
      <UInput
        v-if="hasSearch"
        type="search"
        color="neutral"
        class="w-full"
        v-model="globalFilter"
        variant="outline"
        size="sm"
        placeholder="Search..."
      />

      <UDropdownMenu
        v-if="hasColumnFilter"
        :items="table?.tableApi
                ?.getAllColumns()
                .filter((column:Column<any>) => column.getCanHide())
                .map((column: Column<any>) => ({
                  label: upperFirst(column.id),
                  type: 'checkbox' as const,
                  checked: column.getIsVisible(),
                  onUpdateChecked(checked: boolean) {
                      table?.tableApi?.getColumn(column.id)?.toggleVisibility(!!checked);
                  },
                  onSelect(e?: Event) {
                      e?.preventDefault();
                  }
              }))
                "
        :content="{ align: 'end' }"
      >
        <UButton
          label="Columns"
          size="sm"
          variant="solid"
          trailing-icon="i-lucide-chevron-down"
        />
      </UDropdownMenu>
    </div>
    <div class="flex flex-wrap justify-center items-center gap-2">
      <slot name="actions"></slot>
    </div>
  </div>
</template>
