<script setup lang="ts">
import type { SbBlokData } from '@storyblok/js/dist/types'
import screens from '#tailwind-config/theme/screens'
import { useStoryStore } from '~/stores/story'
import type { ISbAsset } from '~/types'

interface ISbBlokData extends SbBlokData {
  videoId: string,
  image: ISbAsset,
  channel: string,
  title: string,
  description: string,
  duration: string,
}

const props = defineProps({
  blok: {
    type: Object as PropType<ISbBlokData>,
    required: true
  }
})
const emit = defineEmits<{
  'rendered': [value: HTMLElement]
}>()
const storyStore = useStoryStore()
const channel = storyStore.getYoutubeChannelByUUID(props.blok.channel)
const rootRef = ref()

onMounted(() => emit('rendered', rootRef.value))
</script>

<template>
  <a
    ref="rootRef"
    :href="`https://www.youtube.com/watch?v=${blok.videoId}`"
    target="_blank"
    class="group"
  >
    <div class="relative mb-4 rounded-md overflow-hidden aspect-video">
      <img
        v-if="blok.image?.filename"
        :src="$imageService(blok.image.filename, '413x0')"
        :srcset="`
          ${$imageService(blok.image.filename, '495x0')} 495w,
          ${$imageService(blok.image.filename, '580x0')} 580w,
          ${$imageService(blok.image.filename, '870x0')} 870w
        `"
        :sizes="`50vw, (min-width: ${screens.sm}) 33.333vw, (min-width: ${screens.lg}) 25vw`"
        :alt="blok.image.alt || ''"
        loading="lazy"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      >

      <div class="absolute bottom-0 h-20 w-full bg-gradient-to-t from-brown-500/40 z-10" />

      <div class="flex items-center absolute z-20 left-2 bottom-1.5 ">
        <div class="border-solid border-l-beige-100 border-l-[12px] border-y-transparent border-y-[7px] border-r-0 mr-2" />

        <span class="text-beige-100 font-semibold text-base">{{ blok.duration }}</span>
      </div>
    </div>

    <p
      v-if="blok.title"
      class="mb-2 text-beige-100 font-semibold"
    >
      {{ blok.title }}
    </p>

    <p
      v-if="blok.description"
      class="line-clamp-6"
    >
      {{ blok.description }}
    </p>

    <div
      v-if="channel"
      class="flex items-center mt-3"
    >
      <img
        :src="$imageService(channel.avatar.filename, '102x102')"
        :alt="channel.avatar.alt || ''"
        width="34"
        height="34"
        class="rounded-full border border-grey-400 mr-2"
      >

      <span class="text-beige-100 text-sm font-semibold text-ellipsis overflow-hidden">{{ channel.name }}</span>
    </div>
  </a>
</template>
