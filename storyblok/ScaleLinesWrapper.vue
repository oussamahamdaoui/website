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
  <div class="pl-7 bg-scale-lines bg-repeat-y bg-left-top">
    <StoryblokComponent
      v-for="body in blok.body"
      :key="body._uid"
      :blok="body"
    />
  </div>
</template>
