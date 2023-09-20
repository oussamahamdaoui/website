<script setup lang="ts">
import type { SbBlokData } from '@storyblok/js/dist/types'
import type { ISbLinkObject } from '@/types'

interface ISbBlokData extends SbBlokData {
  text: string,
  color: string,
  link?: ISbLinkObject
}

const props = defineProps({
  blok: {
    type: Object as PropType<ISbBlokData>,
    default: undefined
  },
  cyan: {
    type: Boolean,
    default: false
  },
  salmon: {
    type: Boolean,
    default: false
  },
  yellow: {
    type: Boolean,
    default: false
  }
})
const classes = computed(() => {
  if (props.blok?.link?.id) return 'bg-brown-200 text-grey-100 transition-colors link-active:bg-cyan-200/15 link-active:text-cyan-100 hover:text-grey-400 hover:bg-beige-200'

  return {
    'bg-cyan-300 text-cyan-100': props.blok?.color === 'cyan' || props.cyan,
    'bg-salmon-400 text-salmon-100': props.blok?.color === 'salmon' || props.salmon,
    'bg-yellow-200 text-yellow-100': props.blok?.color === 'yellow' || props.yellow,
    'bg-brown-200 text-grey-100': !props.blok?.color && !props.cyan && !props.salmon && !props.yellow
  }
})
</script>

<template>
  <LinkWrapper
    v-editable="blok"
    :link="blok?.link"
    :class="[
      'link-active:bg-cyan-100/10 inline-flex font-semibold items-center rounded-l-full rounded-r-full text-xs h-5 px-2',
      classes
    ]"
  >
    <slot>
      {{ blok?.text }}
    </slot>
  </LinkWrapper>
</template>
