<template>
  <table class="w-full">
    <thead>
      <tr class="border-b border-gray-500">
        <th
          v-for="header in tableHeaders"
          :key="header"
          scope="col"
          class="px-3 py-3 text-left font-barlow-condensed-medium text-gray-900"
        >
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, idx) in data"
        :key="idx"
        class="transition-colors duration-200 hover:bg-gray-50/50"
        :class="{
          'border-b border-gray-500': idx < data.length - 1,
        }"
      >
        <td
          v-for="header in tableHeaders"
          :key="header"
          class="px-3 py-3 font-barlow-condensed-regular text-gray-700"
        >
          {{ item[header] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
});

const tableHeaders = Object.keys(props.data[0]);
</script>
