<script setup lang="ts">
import type { SbBlokData } from '@storyblok/js/dist/types'
import type { IGridItemLayout } from '@/types'

interface ISbBlokData extends SbBlokData {
  body: SbBlokData[],
  gridItemLayout: IGridItemLayout
}

const props = defineProps({
  blok: {
    type: Object as PropType<ISbBlokData>,
    required: true
  }
})

const classes = computed(() => useGridItemLayout(props.blok.gridItemLayout))
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
