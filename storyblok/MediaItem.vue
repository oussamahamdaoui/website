<script setup lang="ts">
import type { SbBlokData } from '@storyblok/js/dist/types'
import type { ISbAsset, ISbLinkObject } from '@/types'

interface ISbBlokData extends SbBlokData {
  asset: ISbAsset,
  maxWidth?: string,
  width?: string,
  maxHeight?: string,
  height?: string,
  link?: ISbLinkObject
}

const props = defineProps({
  blok: {
    type: Object as PropType<ISbBlokData>,
    required: true
  }
})
const styles = computed(() => {
  let str = ''

  if (props.blok.maxWidth) str += `max-width:${props.blok.maxWidth}px;`
  if (props.blok.maxHeight) str += `max-height:${props.blok.maxHeight}px;`
  if (props.blok.width) str += `width:${props.blok.width}px;`
  if (props.blok.height) str += `height:${props.blok.height}px;`

  return str
})
const isSVGFile = computed(() => /.svg$/.test(props.blok.asset.filename))
</script>

<template>
  <LinkWrapper :link="blok.link">
    <img
      :src="`${blok.asset.filename}${!isSVGFile ? '/m/' : ''}`"
      :alt="blok.asset.alt"
      loading="lazy"
      :style="styles"
    >
  </LinkWrapper>
</template>
