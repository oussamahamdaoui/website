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
  <div class="j-grid-scroll relative">
    <div class="overflow-x-auto">
      <StoryblokComponent
        v-for="body in blok.body"
        :key="body._uid"
        :blok="body"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.j-grid-scroll {
  &:after {
    content: '';
    @apply from-transparent;
    @apply to-brown-500;
    @apply pointer-events-none;
    @apply z-10;
    @apply w-20;
    @apply h-full;
    @apply absolute;
    @apply top-0;
    @apply xl:opacity-0;
  }

  &:after {
    @apply right-0;
    @apply bg-gradient-to-r;
    @apply w-16;
    @apply sm:w-32;
  }
}
</style>
