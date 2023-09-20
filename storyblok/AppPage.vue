<script setup lang="ts">
import type { SbBlokData } from '@storyblok/js/dist/types'
import type { ISbMetadata } from '@/types'

interface ISbBlokData extends SbBlokData {
  body: SbBlokData[],
  metadata: ISbMetadata,
}

defineProps({
  blok: {
    type: Object as PropType<ISbBlokData>,
    required: true
  }
})
</script>

<template>
  <main>
    <StoryblokComponent
      v-for="body in blok.body"
      :key="body._uid"
      :blok="body"
    />
  </main>
</template>
