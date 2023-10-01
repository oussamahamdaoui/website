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

const ticking = ref(false)
const imageRef = ref<HTMLDivElement | null>(null)
const hasImage = computed(() => props.asset || props.path)
const { x, y } = useImageFocusPoint(props.asset)
const imageStyles = `object-position: ${x}% ${y}%;`
const delayModifier = 4

onMounted(() => {
  if (detectMobile()) return

  window.addEventListener('scroll', scrollEvent)
  screen.orientation.addEventListener('change', parallaxAnimate)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', scrollEvent)
  screen.orientation.removeEventListener('change', parallaxAnimate)
})

function scrollEvent() {
  if (ticking.value) return

  window.requestAnimationFrame(() => {
    parallaxAnimate()
    ticking.value = false
  })

  ticking.value = true
}

function parallaxAnimate() {
  if (!imageRef.value) return

  const { scrollY } = window
  const { height } = imageRef.value.getBoundingClientRect()

  if (scrollY < 0 || scrollY > height) return

  imageRef.value.setAttribute('style', `transform: translateY(${Math.floor(scrollY / delayModifier)}px)`)
}

function detectMobile() {
  return 'ontouchmove' in window
}
</script>

<template>
  <div
    v-if="hasImage"
    :class="['absolute -z-10 w-full overflow-hidden', layout === Layout.Home ? 'h-[553px]' : 'h-[317px] opacity-20']"
  >
    <div class="absolute bottom-0 h-[165px] w-full bg-gradient-to-t from-brown-500 z-10" />

    <div
      ref="imageRef"
      class="h-full will-change-transform"
    >
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
