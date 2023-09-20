<script setup lang="ts">
import type { SbBlokData } from '@storyblok/js/dist/types'

interface ISbBlokData extends SbBlokData {
  tabs: SbBlokData[],
  contents: SbBlokData[],
}

defineProps({
  blok: {
    type: Object as PropType<ISbBlokData>,
    required: true
  }
})
const activeIndex = ref(0)

function changeTab(index: number) {
  activeIndex.value = index
}
</script>

<template>
  <div>
    <div class="inline-flex items-stretch overflow-hidden border bg-brown-300 border-brown-200 rounded-lg md:rounded-full">
      <StoryblokComponent
        v-for="(tab, i) in blok.tabs"
        :key="tab._uid"
        :blok="tab"
        :class="['transition-colors', { 'bg-brown-200 shadow-tab-active': activeIndex === i }]"
        @click="changeTab(i)"
      />
    </div>

    <div class="mt-12">
      <StoryblokComponent
        v-for="(content, i) in blok.contents"
        v-show="activeIndex === i"
        :key="content._uid"
        :blok="content"
      />
    </div>
  </div>
</template>
