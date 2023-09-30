<script setup lang="ts">
import type { ISbAsset } from '@/types'
import { Layout } from '@/types'

const props = defineProps({
  asset: {
    type: Object as PropType<ISbAsset>,
    default: undefined
  },
  path: {
    type: String,
    default: undefined
  },
  layout: {
    type: String as PropType<Layout>,
    default: Layout.Default
  },
  opacify: {
    type: Boolean,
    default: false
  }
})

const imageRef = ref<HTMLDivElement | null>(null)
const hasImage = computed(() => props.asset || props.path)
const { x, y } = useImageFocusPoint(props.asset)
const imageStyles = `object-position: ${x}% ${y}%;`
const delayModifier = 4

onMounted(() => {
  window.addEventListener('scroll', parallaxAnimate)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', parallaxAnimate)
})

function parallaxAnimate() {
  if (!imageRef.value) return

  const { scrollY } = window
  const { height } = imageRef.value.getBoundingClientRect()

  if (scrollY > height) return

  imageRef.value.setAttribute('style', `transform: translateY(${scrollY / delayModifier}px)`)
}
</script>

<template>
  <div
    v-if="hasImage"
    :class="['absolute -z-10 w-full overflow-hidden', layout === Layout.Home ? 'h-[553px]' : 'h-[317px] opacity-20']"
  >
    <div class="absolute bottom-0 h-[165px] w-full bg-gradient-to-t from-brown-500 z-10" />

    <div ref="imageRef">
      <img
        v-if="asset"
        :src="$imageService(asset.filename)"
        :srcset="`
          ${$imageService(asset.filename, '1280x0/filters:quality(90)')} 640w,
          ${$imageService(asset.filename, '2048x0/filters:quality(90)')} 1024w,
          ${$imageService(asset.filename, '2880x0/filters:quality(90)')} 1440w,
          ${$imageService(asset.filename, '3840x0/filters:quality(90)')} 2560w
        `"
        sizes="100vw"
        alt=""
        class="object-cover w-full h-full"
        :style="imageStyles"
      >
      <img
        v-else
        :src="path"
        alt=""
        :class="['object-cover w-full h-full', { 'opacity-20': opacify}]"
      >
    </div>
  </div>
</template>
