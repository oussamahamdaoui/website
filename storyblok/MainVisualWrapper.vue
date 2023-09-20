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
  <!-- 553px main layout BG image - 91px header height -->
  <div class="h-[462px]">
    <StoryblokComponent
      v-for="body in blok.body"
      :key="body._uid"
      :blok="body"
    />
  </div>
</template>

<style lang="scss" scoped>
:deep(.grid) {
  > div {
    &:nth-of-type(1) {
      @apply mt-6 md:mt-16;
    }

    &:nth-of-type(2) {
      height: 100%;

      @screen md {
        height: auto;
      }

      > div,
      img {
        height: 100%;

        @screen md {
          height: auto;
        }
      }
    }
  }
}
</style>
