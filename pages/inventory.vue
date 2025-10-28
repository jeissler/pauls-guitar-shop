<template>
  <div>
    <h1
      class="font-barlow-condensed-medium text-4xl leading-tight uppercase text-left drop-shadow-sm mb-3"
    >
      Current Inventory
    </h1>
    <p
      class="font-barlow-condensed-regular text-xl text-left leading-relaxed mb-8"
    >
      {{ inventoryText }}
    </p>

    <div
      class="bg-cream/90 p-1 rounded-lg border border-black-600/30 overflow-x-auto"
    >
      <nav class="mb-4">
        <div class="flex flex-wrap gap-1">
          <NuxtLink
            v-for="tab in tabs"
            :key="tab.path"
            :to="tab.path"
            class="px-2 sm:px-3 py-1 sm:py-1.5 font-barlow-condensed-medium text-base sm:text-lg uppercase tracking-wide transition-colors duration-300 ease-in-out rounded-md whitespace-nowrap flex-shrink-0"
            :class="[
              $route.path === tab.path
                ? 'bg-black-800 text-cream shadow-lg border border-black-700/20'
                : 'text-black-700 hover:text-black-900 hover:underline',
            ]"
          >
            {{ tab.name }}
          </NuxtLink>
        </div>
      </nav>

      <NuxtPage />
    </div>
  </div>
</template>

<script setup>
import contentData from "~/content/content.json";

definePageMeta({
  redirect: "/inventory/electric",
});

const tabs = [
  { name: "Electric", path: "/inventory/electric" },
  { name: "Acoustic", path: "/inventory/acoustic" },
  { name: "Bass", path: "/inventory/bass" },
  { name: "Amplifiers", path: "/inventory/amplifiers" },
  { name: "Gear", path: "/inventory/gear" },
];

const inventoryText =
  contentData.find((e) => e.Section === "inventory")?.Content || "";
</script>
