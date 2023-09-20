<script setup lang="ts">
import type { SbBlokData } from '@storyblok/js/dist/types'
import type { IGridLayout } from '@/types'
import { Spacing } from '@/types'

interface ISbBlokData extends SbBlokData {
  body: SbBlokData[],
  gridLayout: IGridLayout,
  spacingTop: Spacing,
  spacingBottom: Spacing
}

const props = defineProps({
  blok: {
    type: Object as PropType<ISbBlokData>,
    required: true
  }
})

const classes = computed(() => [
  { 'pt-11': props.blok.spacingTop === Spacing.Sm },
  { 'pt-14': props.blok.spacingTop === Spacing.Md },
  { 'pt-20': props.blok.spacingTop === Spacing.Lg },
  { 'pb-11': props.blok.spacingBottom === Spacing.Sm },
  { 'pb-14': props.blok.spacingBottom === Spacing.Md },
  { 'pb-20': props.blok.spacingBottom === Spacing.Lg },
  ...useGridLayout(props.blok.gridLayout)
])
</script>

<template>
  <div
    v-editable="blok"
    :class="classes"
  >
    <StoryblokComponent
      v-for="body in blok.body"
      :key="body._uid"
      :blok="body"
    />
  </div>
</template>
