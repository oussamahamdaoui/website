<script setup lang="ts">
import type { SbBlokData } from '@storyblok/js/dist/types'

interface ISbBlokData extends SbBlokData {
  body: SbBlokData[],
}

defineProps({
  blok: {
    type: Object as PropType<ISbBlokData>,
    required: true
  }
})
</script>

<template>
  <div v-editable="blok">
    <StoryblokComponent
      v-for="body in blok.body"
      :key="body._uid"
      :blok="body"
    />
  </div>
</template>
