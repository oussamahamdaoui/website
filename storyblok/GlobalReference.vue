<script setup lang="ts">
import type { SbBlokData } from '@storyblok/js/dist/types'

interface ISbBlokData extends SbBlokData {
  reference: {
    content: {
      body: SbBlokData[]
    }
  },
}

defineProps({
  blok: {
    type: Object as PropType<ISbBlokData>,
    required: true
  }
})
</script>

<template>
  <StoryblokComponent :blok="blok.reference.content.body[0]" />
</template>
