<template>
  <ul class="flex flex-wrap items-center gap-1 mb-1">
    <span class="text-gray-700 mr-1 font-bold text-sm">Filters:</span>
    <li v-for="filter in filters" :key="filter">
      <div
        class="inline-flex items-center gap-x-0.5 rounded-md px-2 py-1 text-xs font-medium inset-ring inset-ring-gray-500/10"
        :class="
          selected.includes(filter)
            ? 'bg-black-800 text-cream'
            : 'bg-gray-50 text-gray-600'
        "
      >
        <button
          class="flex-1 text-left cursor-pointer"
          @click="toggleFilter(filter)"
        >
          {{ filter }}
        </button>
        <button
          v-if="selected.includes(filter)"
          type="button"
          class="group relative -mr-1 size-3.5 rounded-xs hover:bg-gray-500/20 cursor-pointer"
          @click="toggleFilter(filter)"
        >
          <span class="sr-only">Remove</span>
          <svg
            viewBox="0 0 14 14"
            class="size-3.5 stroke-cream/70 group-hover:stroke-cream"
          >
            <path d="M4 4l6 6m0-6l-6 6" />
          </svg>
          <span class="absolute -inset-1"></span>
        </button>
      </div>
    </li>
  </ul>
</template>

<script setup>
defineProps({
  filters: {
    type: Set,
    required: true,
  },
  selected: {
    type: Set,
    default: () => [],
  },
});

const emit = defineEmits(["toggle"]);

const toggleFilter = (filter) => {
  emit("toggle", filter);
};
</script>
