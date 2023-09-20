<script setup lang="ts">
import type { SbBlokData } from '@storyblok/js/dist/types'
import type { ISbAsset } from '@/types'
import { Typography } from '@/types'

interface ISbBlokData extends SbBlokData {
  icon: {
    asset: ISbAsset,
    maxWidth: string,
    width: string,
    maxHeight: string,
    height: string,
  }[],
  title: string,
}

defineProps({
  blok: {
    type: Object as PropType<ISbBlokData>,
    required: true
  }
})
</script>

<template>
  <div
    v-editable="blok"
    :class="['px-4 py-2.5 cursor-pointer border-r last:border-0 border-brown-200 content-center', { 'flex items-center flex-wrap justify-center gap-2.5': blok.icon }]"
  >
    <MediaItem
      v-if="blok.icon[0]"
      :blok="blok.icon[0]"
    />

    <AppHeadline
      :style="Typography.HighlightMd"
      class="!text-beige-100 !mb-0 max-md:text-center max-md:!text-xs"
    >
      {{ blok.title }}
    </AppHeadline>
  </div>
</template>
