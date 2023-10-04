<script setup lang="ts">
import type { SbBlokData } from '@storyblok/js/dist/types'
import PlayIcon from '@/assets/images/icons/play.svg?component'
import type { ISbAsset } from '@/types'

interface ISbBlokData extends SbBlokData {
  image: ISbAsset,
  text: string,
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
    class="flex items-center flex-col text-center w-[120px]"
  >
    <div class="group relative cursor-pointer w-[84px] h-[84px] mb-3">
      <PlayIcon
        class="absolute z-10 left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 text-white drop-shadow-lg group-hover:scale-125 transition-transform"
        width="15"
        height="16"
      />

      <img
        :src="$imageService(blok.image.filename, '216x216')"
        :alt="blok.image.alt ?? ''"
        class="aspect-square border-2 border-grey-400 rounded-xl p-1"
        width="84"
        height="84"
      >
    </div>

    <span>{{ blok.text }}</span>
  </div>
</template>

<style scoped lang="scss">

</style>
