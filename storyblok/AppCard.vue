<script setup lang="ts">
import type { SbBlokData } from '@storyblok/js/dist/types'
import ArrowRightIcon from '@/assets/images/icons/arrow-right.svg?component'
import type { ISbAsset, ISbLinkObject } from '@/types'
import { Spacing, Gradient } from '@/types'

interface ISbBlokData extends SbBlokData {
  body: SbBlokData[],
  link: ISbLinkObject,
  bgGradient: Gradient | undefined,
  spacing: Spacing,
  alignItems: string,
  heightFull: boolean,
  minHeight: string,
  bgImage: ISbAsset,
  bgImageStyles: string,
  noOverflow: boolean,
}

const props = defineProps({
  blok: {
    type: Object as PropType<ISbBlokData>,
    default: undefined
  },
  to: {
    type: String,
    default: undefined
  },
  arrow: {
    type: Boolean,
    default: false
  },
  spacing: {
    type: String as PropType<Spacing>,
    default: Spacing.Sm
  },
  heightFull: {
    type: Boolean,
    default: false
  }
})
const linkHandler = useLinkHandler(props.blok?.link)
const hasLink = computed(() => Boolean(props.to || (props.blok?.link.url || props.blok?.link.story?.url)))
const dynamicComponent = computed(() => hasLink.value ? resolveComponent('NuxtLink') : 'div')
const classes = computed(() => [
  { 'p-2': props.spacing === Spacing.Xs || props.blok?.spacing === Spacing.Xs },
  { 'p-4': props.spacing === Spacing.Sm || props.blok?.spacing === Spacing.Sm },
  { 'p-6': props.spacing === Spacing.Md || props.blok?.spacing === Spacing.Md },
  { 'p-8': props.spacing === Spacing.Lg || props.blok?.spacing === Spacing.Lg },
  { 'bg-gradient-to-br from-salmon-300 to-orange-100 text-beige-200': props.blok?.bgGradient === Gradient.Salmon },
  { 'bg-gradient-to-br from-cyan-400 to-cyan-300 shadow-inner shadow-beige-200/10 text-beige-200': props.blok?.bgGradient === Gradient.Cyan },
  { 'bg-brown-300 border border-grey-400': props.blok?.bgGradient !== Gradient.Salmon && props.blok?.bgGradient !== Gradient.Cyan },
  { 'h-full': props.heightFull || props.blok?.heightFull },
  { 'block hover:border-grey-300 transition-colors pr-11 lg:pr-14 relative': hasLink.value },
  { relative: props.blok?.bgImage?.filename },
  { 'overflow-hidden': props.blok?.noOverflow && props.blok?.bgImage?.filename }
])
const styles = computed(() => props.blok?.minHeight ? `min-height:${props.blok.minHeight}px;` : undefined)
const bgImageStyles = computed(() => props.blok?.bgImageStyles || undefined)
</script>

<template>
  <Component
    :is="dynamicComponent"
    v-editable="blok"
    :to="to"
    v-bind="linkHandler"
    :class="[
      'rounded-lg',
      ...classes
    ]"
    :style="styles"
  >
    <div
      :class="[
        'relative z-10',
        { 'h-full': heightFull || blok?.heightFull },
        { 'flex items-center': blok?.alignItems === 'center' }
      ]"
    >
      <slot>
        <template v-if="blok">
          <StoryblokComponent
            v-for="body in blok.body"
            :key="body._uid"
            :blok="body"
          />
        </template>
      </slot>
    </div>

    <img
      v-if="blok?.bgImage?.filename"
      :src="$imageService(blok.bgImage.filename, '800x0')"
      alt=""
      class="absolute z-0"
      :style="bgImageStyles"
    >

    <ArrowRightIcon
      v-if="hasLink"
      class="absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 text-beige-200"
      width="13"
      height="19"
    />
  </Component>
</template>
