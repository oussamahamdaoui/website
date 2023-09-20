<script setup lang="ts">
import type { ISbLinkObject } from '@/types'
import { useLinkHandler } from '@/composables/useLinkHandler'

const props = defineProps({
  link: {
    type: Object as PropType<ISbLinkObject>,
    default: undefined
  },
  element: {
    type: String,
    default: 'div'
  }
})
const linkHandler = useLinkHandler(props.link)
const dynamicComponent = computed(() => linkHandler?.to ? resolveComponent('NuxtLink') : props.element ?? 'div')
</script>

<template>
  <Component
    :is="dynamicComponent"
    v-bind="linkHandler"
  >
    <slot />
  </Component>
</template>
