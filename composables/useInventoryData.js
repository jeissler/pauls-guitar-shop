import { useRouter } from "vue-router";

export const useInventoryData = (inventoryData) => {
  const brands = new Set(inventoryData.map((item) => item.Brand));

  const router = useRouter();
  const selectedBrands = ref([]);

  const filteredData = computed(() => {
    if (!selectedBrands.value.length) return inventoryData;
    return inventoryData.filter((item) =>
      selectedBrands.value.includes(item.Brand)
    );
  });

  const toggleBrand = (brand) => {
    if (selectedBrands.value.includes(brand)) {
      selectedBrands.value = selectedBrands.value.filter((b) => b !== brand);
    } else {
      selectedBrands.value = [...selectedBrands.value, brand];
    }
    updateURL();
  };

  const clearFilters = () => {
    selectedBrands.value = [];
    updateURL();
  };

  const updateURL = () => {
    const query = { ...router.currentRoute.value.query };

    if (selectedBrands.value.length > 0) {
      query.brands = selectedBrands.value;
    } else {
      delete query.brands;
    }

    router.replace({
      path: router.currentRoute.value.path,
      query,
    });
  };

  return {
    brands,
    selectedBrands,
    filteredData,
    toggleBrand,
    clearFilters,
  };
};
