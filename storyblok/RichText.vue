<script setup lang="ts">
import type { SbBlokData, ISbRichtext } from '@storyblok/js/dist/types'

interface ISbBlokData extends SbBlokData {
  body: ISbRichtext,
}

const props = defineProps({
  blok: {
    type: Object as PropType<ISbBlokData | ISbRichtext>,
    required: true
  }
})

const markup = computed(() => renderRichText((props.blok as ISbBlokData)?.body ?? props.blok))
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->
  <div
    v-editable="blok"
    v-html="markup"
  />
  <!-- eslint-enable vue/no-v-html -->
</template>

<style lang="scss" scoped>
:deep(p:not(:only-child)) {
  @apply mb-4;
}

:deep(a) {
  @apply text-salmon-200;
  @apply hover:underline;
}
</style>
