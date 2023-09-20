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

onMounted(() => {
  if (!splineViewer?.value?.shadowRoot) return
  // fixes horizontal scrollbar on small screens
  const sheet = new CSSStyleSheet()

  sheet.replaceSync('canvas { width: 100%;height: 100%; }')
  splineViewer.value.shadowRoot.adoptedStyleSheets.push(sheet)
})
</script>

<template>
  <div :style="styles">
    <!-- @vue-ignore -->
    <spline-viewer
      ref="splineViewer"
      :url="blok.url"
      loading="auto"
      class="overflow-hidden"
    />
  </div>
</template>
