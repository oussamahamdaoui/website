<script setup lang="ts">
import type { SbBlokData } from '@storyblok/js/dist/types'
import type { ISbLinkObject } from '@/types'

interface ISbBlokData extends SbBlokData {
  link: ISbLinkObject,
  text: string | undefined
}

const props = defineProps({
  blok: {
    type: Object as PropType<ISbBlokData>,
    required: true
  }
})
const linkHandler = useLinkHandler(props.blok.link)
</script>

<template>
  <NuxtLink v-bind="linkHandler">
    {{ blok.text || blok.link?.story?.name }}
  </NuxtLink>
</template>

<style lang="scss" scoped>
a,
.router-link-active {
  @apply relative;

  &:after {
    @apply content-[''];
    @apply h-px;
    @apply w-full;
    @apply absolute;
    @apply bottom-0;
    @apply left-0;
    @apply origin-right;
    @apply transition-transform;
    @apply bg-current;
  }
}

a:not(.router-link-active) {
  &:after {
    @apply scale-x-0;
  }

  &:hover:after {
    @apply origin-left;
    @apply scale-x-100;
  }
}
</style>
