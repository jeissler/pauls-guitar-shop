<template>
  <section class="bg-black/66 p-6 pb-10 rounded-sm">
    <h1 class="font-barlow-condensed-medium text-4xl leading-tight uppercase text-left drop-shadow-sm mb-3">Have Questions?</h1>
    <p class="font-barlow-condensed-regular text-xl text-left leading-relaxed">
      {{ contactText }}
    </p>
    <!-- Hours and Map Flex Row -->
    <div class="flex flex-col md:flex-row gap-8 mt-10 items-stretch justify-center">
      <div class="max-w-md w-full md:w-96 mx-auto md:mx-0">
        <h2 class="font-barlow-condensed-semibold text-2xl text-white mb-3 text-center uppercase tracking-wide">Open Hours</h2>
        <ul class="font-barlow-condensed-regular text-lg space-y-1 text-center">
          <li v-for="(item, idx) in openHours" :key="idx">
            <span class="font-semibold">{{ item.day }}:</span> {{ item.hours }}
          </li>
        </ul>
      </div>
      <div class="rounded-lg overflow-hidden shadow-lg w-full max-w-2xl aspect-video mx-auto md:mx-0">
        <iframe
          src="https://maps.google.com/maps?q=1334+NW+Hwy+7,+Blue+Springs,+MO+64014&ll=39.0341913,-94.2706153&z=17&output=embed"
          width="100%"
          height="100%"
          style="border:0;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  </section>
</template>

<script setup>
import contentData from '~/content/content.json'

const contactText = contentData.find(e => e.Section === 'contact')?.Content || ''
const openHoursSection = contentData.find(e => e.Section === 'open_hours')
const openHours = openHoursSection && openHoursSection.Content
  ? openHoursSection.Content.split('\n').map(line => {
      const [day, ...rest] = line.split(':')
      return {
        day: day.trim(),
        hours: rest.join(':').trim()
      }
    })
  : []
</script> 