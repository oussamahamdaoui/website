<script setup lang="ts">
import type { SbBlokData } from '@storyblok/js/dist/types'

interface ISbBlokData extends SbBlokData {
  url: string,
  width: string,
  height: string,
}

const props = defineProps({
  blok: {
    type: Object as PropType<ISbBlokData>,
    required: true
  }
})
const styles = computed(() => {
  return `aspect-ratio:${props.blok.width}/${props.blok.height};max-width:${props.blok.width}px;max-height:${props.blok.height}px;`
})

const splineViewer = ref<HTMLElement | null>(null)
</script>

<template>
  <div :style="styles">
    <!-- @vue-ignore -->
    <spline-viewer
      ref="splineViewer"
      :url="blok.url"
      loading="lazy"
      class="overflow-hidden pointer-events-none"
    />
  </div>
</template>
