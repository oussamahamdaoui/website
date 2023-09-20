<script setup lang="ts">
import type { SbBlokData } from '@storyblok/js/dist/types'
import JunoLogo from '@/assets/images/logo/juno-logo-wordmark.svg?component'
import type { ISbLinkObject } from '@/types'

interface ISbBlokData extends SbBlokData {
  link: ISbLinkObject,
  width: string,
  height: string
}

defineProps({
  blok: {
    type: Object as PropType<ISbBlokData>,
    default: undefined
  }
})
</script>

<template>
  <LinkWrapper
    :link="blok?.link"
    aria-label="Juno"
    class="hover:text-beige-200 transition-all"
  >
    <JunoLogo
      :width="blok?.width"
      :height="blok?.height"
    />
  </LinkWrapper>
</template>
