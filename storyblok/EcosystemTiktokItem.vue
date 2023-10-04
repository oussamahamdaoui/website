<script setup lang="ts">
import type { SbBlokData } from '@storyblok/js/dist/types'
import screens from '#tailwind-config/theme/screens'

interface ISbBlokData extends SbBlokData {
  videoLink: string,
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
        :sizes="`50vw, (min-width: ${screens.sm}) 33.333vw, (min-width: ${screens.lg}) 25vw`"
        :alt="video.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      >
    </div>

    <p
      v-if="video.author_name"
      class="text-beige-100 text-sm font-semibold mb-2"
    >
      {{ video.author_name }}
    </p>

    <p
      v-if="video.title"
      class="break-words"
    >
      {{ video.title.substring(0, 200) }}
    </p>
  </a>
</template>
