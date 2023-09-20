<script setup lang="ts">
import type { SbBlokData } from '@storyblok/js/dist/types'
import type { IGridLayout } from '@/types'
import { useGridLayout } from '@/composables/useGridLayout'

interface ISbBlokData extends SbBlokData {
  body: SbBlokData[],
  listType: string,
  counterLeftOfHeadline: boolean,
  gridLayout: IGridLayout
}

const props = defineProps({
  blok: {
    type: Object as PropType<ISbBlokData>,
    required: true
  }
})

const classes = computed(() => [...useGridLayout(props.blok.gridLayout), props.blok.listType === 'ol' ? '[counter-reset:section]' : ''])
</script>

<template>
  <Component
    :is="blok.listType"
    v-editable="blok"
    :class="classes"
  >
    <StoryblokComponent
      v-for="body in blok.body"
      :key="body._uid"
      :blok="body"
      :list-type="blok.listType"
      :counter-left-of-headline="blok.counterLeftOfHeadline"
    />
  </Component>
</template>

<style lang="scss" scoped>
ol {
  counter-reset: section;
}
</style>
