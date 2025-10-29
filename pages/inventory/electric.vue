<template>
  <section class="py-2 px-3">
    <InventoryFilters
      :filters="brands"
      :selected="selectedBrands"
      @toggle="toggleBrand"
      @clear="clearFilters"
    />
    <InventoryTable :data="filteredData" />
  </section>
</template>

<script setup>
import inventoryData from "~/content/inventory-electric.json";
import InventoryTable from "~/components/InventoryTable.vue";
import InventoryFilters from "~/components/InventoryFilters.vue";
import { useInventoryData } from "~/composables/useInventoryData.js";

const { brands, clearFilters, selectedBrands, filteredData, toggleBrand } =
  useInventoryData(inventoryData);
</script>
