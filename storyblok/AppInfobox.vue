<script setup lang="ts">
import type { SbBlokData } from '@storyblok/js/dist/types'
import { ISbAsset } from '~/types'

interface ISbBlokData extends SbBlokData {
  headline: SbBlokData[],
  image: ISbAsset,
  text: string,
  button: SbBlokData[]
}

defineProps({
  blok: {
    type: Object as PropType<ISbBlokData>,
    required: true
  }
})

const imageRef = ref<HTMLImageElement | null>(null)
const imageWidth = ref(0)
let resizeObserver: ResizeObserver | undefined

function observeImage() {
  if (!window && !('ResizeObserver' in window)) return

  resizeObserver = new ResizeObserver(entries => entries.forEach((entry) => {
    imageWidth.value = Math.round(entry.contentRect.width)
  }))

  if (imageRef.value) resizeObserver.observe(imageRef.value)
}

onMounted(() => {
  observeImage()
})

watchEffect(() => {
  if (imageRef.value) imageWidth.value = imageRef.value.clientWidth
})

onUnmounted(() => {
  if (resizeObserver) resizeObserver.disconnect()
})
</script>

<template>
  <div class="flex rounded-md bg-salmon-300 text-beige-200 relative overflow-hidden">
    <div class="absolute top-0 left-0 h-full max-md:w-3/12">
      <img
        v-if="blok.image"
        ref="imageRef"
        :src="blok.image.filename"
        :alt="blok.image.alt"
        class="h-full object-cover object-right"
      >
    </div>

    <div
      class="p-4 lg:p-8 lg:flex lg:items-center lg:pr-6"
      :style="`padding-left:${imageWidth + 24}px`"
    >
      <StoryblokComponent
        :if="blok.headline?.[0]"
        :blok="blok.headline[0]"
        class="max-lg:mb-4 lg:!mb-0 lg:mr-8"
      />

      <p>{{ blok.text }}</p>

      <StoryblokComponent
        v-if="blok.button?.[0]"
        :blok="blok.button[0]"
        class="max-lg:mt-4 lg:shrink-0 lg:ml-8"
      />
    </div>
  </div>
</template>
