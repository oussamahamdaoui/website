<script setup lang="ts">
import type { IApp } from '@/types'

defineProps({
  app: {
    type: Object as PropType<IApp>,
    required: true
  },
  large: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <NuxtLink
    :to="`/apps/detail-${encodeURIComponent(app.title)}`"
    :class="[
      'group flex items-end md:row-span-3 relative',
      large ? 'min-h-[230px]' : 'h-[212px]'
    ]"
  >
    <div class="absolute rounded-md overflow-hidden w-full h-full">
      <img
        :src="`/ecosystem/${app.icon || 'fallback-app-icon.jpg'}`"
        alt=""
        loading="lazy"
        class="absolute object-cover w-full h-full bg-black group-hover:scale-105 transition-transform duration-300"
      >

      <div class="absolute bg-gradient-to-b from-transparent to-brown-400 w-full h-full z-10" />
    </div>

    <EcosystemAppTeaser
      :app="app"
      :large="large"
      :link="false"
      class="z-20 text-beige-100"
    />
  </NuxtLink>
</template>
