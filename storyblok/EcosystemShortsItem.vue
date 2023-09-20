<script setup lang="ts">
import type { SbBlokData } from '@storyblok/js/dist/types'
import dayjs from 'dayjs/esm'
import duration from 'dayjs/esm/plugin/duration'
import screens from '#tailwind-config/theme/screens'

// eslint-disable-next-line import/no-named-as-default-member
dayjs.extend(duration)

interface ISbBlokData extends SbBlokData {
  videoId: string,
}

interface IVideoThumbnail {
  url: string,
  width: number,
  height: number
}

interface IVideoItem {
  snippet: {
    title: string,
    description: string,
    channelId: string,
    channelTitle: string,
    thumbnails: Record<string, IVideoThumbnail>
  },
  contentDetails: {
    duration: string,
  }
}

interface IChannelItem {
  snippet: {
    thumbnails: Record<string, IVideoThumbnail>
  },
}

interface IVideosResponse {
  items: IVideoItem[]
}

interface IChannelResponse {
  items: IChannelItem[]
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
const runtimeConfig = useRuntimeConfig()
const url = `https://www.googleapis.com/youtube/v3/videos?id=${props.blok.videoId}&key=${runtimeConfig.public.youtubeApiKey}&part=snippet,contentDetails&fields=items(snippet,contentDetails(duration))`
const { data: video } = await useFetch(url, { key: props.blok.videoId, transform: (res: IVideosResponse) => res.items[0] })
const durationConverted = computed(() => video?.value ? dayjs.duration(video.value.contentDetails.duration).format('H:m:ss').replace(/^0:/, '') : '')
const channelUrl = computed(() => {
  if (!video.value) return '' // accept call to fail if no channelId

  return `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${video.value.snippet.channelId}&fields=items%2Fsnippet%2Fthumbnails&key=${runtimeConfig.public.youtubeApiKey}`
})
const { data: channel } = useNuxtData<IVideoItem>(video.value?.snippet.channelId ?? 'yt-channel-id') // cache channel data

if (!channel.value && video.value) await useFetch(channelUrl, { key: video.value.snippet.channelId ?? 'yt-channel-id', transform: (res: IChannelResponse) => res.items[0] })
</script>

<template>
  <a
    v-if="video"
    ref="rootRef"
    :href="`https://www.youtube.com/watch?v=${blok.videoId}`"
    target="_blank"
    class="group"
  >
    <div class="relative mb-4 rounded-md overflow-hidden aspect-[9/16]">
      <img
        :src="video.snippet.thumbnails.high.url"
        :srcset="`
          ${video.snippet.thumbnails.high.url} ${video.snippet.thumbnails.high.width}w,
          ${video.snippet.thumbnails.standard.url} ${video.snippet.thumbnails.standard.width}w
        `"
        :sizes="`50vw, (min-width: ${screens.sm}) 33.333vw, (min-width: ${screens.lg}) 25vw`"
        :alt="video.snippet.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      >

      <div class="absolute bottom-0 h-20 w-full bg-gradient-to-t from-brown-500/40 z-10" />

      <div class="flex items-center absolute z-20 left-2 bottom-1.5 ">
        <div class="border-solid border-l-beige-100 border-l-[12px] border-y-transparent border-y-[7px] border-r-0 mr-2" />

        <span class="text-beige-100 font-semibold text-base">{{ durationConverted }}</span>
      </div>
    </div>

    <p
      v-if="video.snippet.title"
      class="mb-2"
    >
      {{ video.snippet.title }}
    </p>

    <p
      v-if="video.snippet.description"
      class="break-words"
    >
      {{ video.snippet.description.substring(0, 200) }}
    </p>

    <div class="flex items-center mt-3">
      <img
        v-if="channel?.snippet?.thumbnails?.default?.url"
        :src="channel.snippet.thumbnails.default.url"
        :alt="video.snippet.channelTitle"
        width="34"
        height="34"
        class="rounded-full border border-grey-400 mr-2"
      >

      <span class="text-beige-100 text-sm font-semibold">{{ video.snippet.channelTitle }}</span>
    </div>
  </a>
</template>
