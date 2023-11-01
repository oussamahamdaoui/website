<script setup lang="ts">
import type { SbBlokData } from '@storyblok/js/dist/types'
import type { ISbAsset } from '@/types'
import { Typography } from '@/types'
import DaoDaoIcon from '@/assets/images/icons/daodao-no-boundary.svg?component'

interface ISbBlokData extends SbBlokData {
  element: string,
  style: Typography,
  text: string,
  leadingIcon: ISbAsset,
  textAlign: string,
  limitMarginBottom: boolean,
}

const props = defineProps({
  blok: {
    type: Object as PropType<ISbBlokData>,
    default: undefined
  },
  style: {
    type: String as PropType<Typography>,
    default: undefined
  },
  element: {
    type: String,
    default: undefined
  }
})
const computedStyle = computed(() => props.style ?? props.blok?.style)
const hasLeadingIcon = computed<boolean>(() => !!props.blok?.leadingIcon?.id)
const typography = computed(() => {
  switch (computedStyle.value) {
    case Typography.HeadlineH1:
      return ['font-neue-haas text-beige-200 text-5xl-mobile lg:text-5xl', hasLeadingIcon.value ? 'mb-2' : 'mb-3']
    case Typography.HeadlineH2:
      return ['font-neue-haas text-beige-200 text-3xl md:text-4xl', hasLeadingIcon.value ? 'mb-2' : 'mb-3']
    case Typography.HeadlineH3:
      return ['font-neue-haas text-beige-200 text-2xl md:text-3xl', hasLeadingIcon.value ? 'mb-2' : 'mb-3']
    case Typography.HeadlineH4:
      return ['font-neue-haas text-beige-200 text-2xl', hasLeadingIcon.value ? 'mb-2' : 'mb-3']
    case Typography.HeadlineH5:
      return ['font-neue-haas text-beige-200 text-xl', hasLeadingIcon.value ? 'mb-2' : 'mb-3']
    case Typography.HeadlineH6:
      return ['font-neue-haas text-beige-200 text-lg', hasLeadingIcon.value ? 'mb-2' : 'mb-3']
    case Typography.Secondary1:
      return ['text-cyan-200 text-base uppercase tracking-widest', hasLeadingIcon.value ? 'mb-2' : 'mb-3']
    case Typography.Secondary2:
      return ['text-cyan-200 text-xs uppercase tracking-widest', hasLeadingIcon.value ? 'mb-1.5' : 'mb-2.5']
    case Typography.Secondary1DaoDao:
      return ['text-cyan-200 text-base md:text-base uppercase tracking-widest', hasLeadingIcon.value ? 'mb-2' : 'mb-3']
    case Typography.Secondary2DaoDao:
      return ['text-cyan-200 text-xs uppercase tracking-widest', hasLeadingIcon.value ? 'mb-1.5' : 'mb-2.5']
    case Typography.HighlightLg:
      return ['text-beige-200 text-base font-semibold', hasLeadingIcon.value ? 'mb-1.5' : 'mb-2.5']
    case Typography.HighlightMd:
      return ['text-beige-200 text-sm font-semibold', hasLeadingIcon.value ? 'mb-1.5' : 'mb-2.5']
    case Typography.HighlightSm:
      return ['text-beige-200 text-xs font-semibold', hasLeadingIcon.value ? 'mb-1.5' : 'mb-2.5']
  }
})
const textAlign = computed(() => props.blok?.textAlign ? `text-${props.blok.textAlign}` : '')
const isDaoDaoVariant = computed(() => computedStyle.value === Typography.Secondary1DaoDao || computedStyle.value === Typography.Secondary2DaoDao)
const dynamicElement = computed(() => isDaoDaoVariant.value ? 'a' : props.element ?? props.blok?.element ?? 'div')
const attrs = computed(() => {
  if (isDaoDaoVariant.value) return {
    href: 'https://daodao.zone/',
    target: '_blank'
  }

  return undefined
})
</script>

<template>
  <Component
    :is="dynamicElement"
    v-bind="attrs"
    v-editable="blok"
    :class="[
      { 'inline-flex items-center': isDaoDaoVariant || hasLeadingIcon },
      typography,
      textAlign,
      { '!mb-1': props.blok?.limitMarginBottom }
    ]"
  >
    <img
      v-if="hasLeadingIcon"
      class="inline-block mr-4"
      :src="blok?.leadingIcon.filename as string"
      width="32"
      height="48"
      alt=""
    >

    <slot>
      {{ blok?.text }}
    </slot>

    <DaoDaoIcon
      v-if="isDaoDaoVariant"
      width="21"
      height="21"
      class="inline-block ml-3"
    />
  </Component>
</template>
