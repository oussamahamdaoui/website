<script setup lang="ts">
import type { SbBlokData } from '@storyblok/js/dist/types'
import screens from '#tailwind-config/theme/screens'

interface ISbBlokData extends SbBlokData {
  videoLink: string,
  duration: string,
}

interface IVideoItem {
  title: string,
  author_name: string,
  thumbnail_url: string,
}

onMounted(() => emit('rendered', rootRef.value))

const props = defineProps({
  blok: {
    type: Object as PropType<ISbBlokData>,
    required: true
  }
})
const emit = defineEmits<{
  'rendered': [value: HTMLElement]
}>()
const rootRef = ref()
const url = `https://www.tiktok.com/oembed?url=${props.blok.videoLink}`
const { data: video } = await useFetch<IVideoItem>(url, { key: props.blok.videoLink })
</script>

<template>
  <a
    v-if="video"
    ref="rootRef"
    :href="blok.videoLink"
    target="_blank"
    class="group"
  >
    <div class="relative mb-4 rounded-md overflow-hidden aspect-[9/16]">
      <img
        :src="video.thumbnail_url"
        :alt="video.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      >

      <div class="absolute bottom-0 h-20 w-full bg-gradient-to-t from-brown-500/40 z-10" />

      <div class="flex items-center absolute z-20 left-2 bottom-1.5 ">
        <div class="border-solid border-l-beige-100 border-l-[12px] border-y-transparent border-y-[7px] border-r-0 mr-2" />

        <span class="text-beige-100 font-semibold text-base">{{ blok.duration }}</span>
      </div>
    </div>

    <p
      v-if="video.author_name"
      class="text-beige-100 text-sm font-semibold mb-2"
    >
      {{ video.author_name }}
    </p>

    <p
      v-if="video.title"
      class="line-clamp-6"
    >
      {{ video.title }}
    </p>
  </a>
</template>
