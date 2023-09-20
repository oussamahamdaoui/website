<script setup lang="ts">
import type { SbBlokData } from '@storyblok/js/dist/types'
import type { ISbLinkObject } from '@/types'
import { ButtonVariant } from '@/types'
import ArrowLeftIcon from '@/assets/images/icons/arrow-left.svg?component'
import PlayIcon from '@/assets/images/icons/play.svg?component'
import { useLinkHandler } from '@/composables/useLinkHandler'

interface ISbBlokData extends SbBlokData {
  text?: string,
  link: ISbLinkObject,
  variant: ButtonVariant,
}

const props = defineProps({
  blok: {
    type: Object as PropType<ISbBlokData>,
    default: undefined
  },
  variant: {
    type: String as PropType<ButtonVariant>,
    default: undefined
  },
  to: {
    type: String,
    default: undefined
  },
  typeButton: {
    type: Boolean,
    default: false
  }
})
const dynamicComponent = computed(() => props.typeButton ? 'div' : linkHandler.value?.to ? resolveComponent('NuxtLink') : 'div')
const linkHandler = computed(() => props.to ? { to: props.to } : useLinkHandler(props.blok?.link))
const getVariant = computed(() => (props.variant ?? props.blok?.variant) as ButtonVariant)
const isSecondary = computed(() => getVariant.value === ButtonVariant.Secondary)
const isSecondaryBeige = computed(() => getVariant.value === ButtonVariant.SecondaryBeige)
const isSmall = computed(() => [ButtonVariant.Small, ButtonVariant.SmallBlur].includes(getVariant.value))
const isLarge = computed(() => [ButtonVariant.Large, ButtonVariant.LargeBlur].includes(getVariant.value))
const isBlur = computed(() => [ButtonVariant.LargeBlur, ButtonVariant.SmallBlur].includes(getVariant.value))
const isPlayButton = computed(() => [ButtonVariant.PlayButton].includes(getVariant.value))
const isArrowLeft = computed(() => getVariant.value === ButtonVariant.ArrowLeft)
const classes = computed(() => [
  { 'h-8 w-8 pa-0 text-xs justify-center': isArrowLeft.value },
  { 'h-8 px-4 text-xs': isSmall.value && !isArrowLeft.value },
  { 'h-12 px-6 text-base': isLarge.value && !isArrowLeft.value },
  { 'py-1 text-base text-salmon-200 hover:text-salmon-100': isSecondary.value },
  { 'py-1 text-base text-beige-200 hover:text-beige-100': isSecondaryBeige.value },
  { 'text-beige-200': isPlayButton.value }
])
const backgroundClasses = computed(() => [
  { 'backdrop-blur-sm bg-beige-100/10 ': isBlur.value },
  { 'bg-brown-100': !isSecondary.value && !isSecondaryBeige.value && !isBlur.value && !isPlayButton.value }
])
const textClasses = computed(() => [
  { 'after:h-px after:w-full after:absolute after:bottom-0 after:left-0 after:scale-x-0 after:origin-right transition-colors after:transition-transform group-hover:after:origin-left group-hover:after:scale-x-100': isSecondary.value || isSecondaryBeige.value || isPlayButton.value },
  { 'after:bg-salmon-200 group-hover:after:bg-salmon-100': isSecondary.value },
  { 'after:bg-beige-200 group-hover:after:bg-beige-100': isSecondaryBeige.value },
  { 'after:bg-beige-200': isPlayButton.value }
])
</script>

<template>
  <Component
    :is="dynamicComponent"
    v-bind="linkHandler"
    :class="[
      'group relative font-semibold inline-flex items-center rounded text-beige-100 cursor-pointer',
      ...classes
    ]"
  >
    <ArrowLeftIcon
      v-if="isArrowLeft"
      width="8"
      height="13"
      class="z-10"
    />

    <div
      v-if="isPlayButton"
      class="group relative bg-salmon-200 h-8 w-8 rounded-full mr-3 overflow-hidden"
    >
      <PlayIcon
        class="absolute text-beige-200 top-1/2 left-[53%] -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 ease-in-out group-hover:scale-[5]"
        width="15"
        height="16"
      />

      <PlayIcon
        class="absolute text-salmon-200 top-1/2 left-[53%] -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 ease-in-out scale-0 group-hover:scale-100"
        width="15"
        height="16"
      />
    </div>

    <div
      v-if="!isSecondary && !isSecondaryBeige && !isPlayButton"
      :class="[
        'absolute z-0 top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 w-full h-full rounded transition-all origin-center group-hover:brightness-125 group-hover:h-[calc(100%+6px)] group-hover:w-[calc(100%+6px)]',
        ...backgroundClasses
      ]"
    />

    <div :class="['relative z-10', ...textClasses]">
      <slot>
        <template v-if="blok?.text">
          {{ blok.text }}
        </template>
      </slot>
    </div>

    <span
      v-if="isSecondary || isSecondaryBeige"
      class="ml-1 group-hover:translate-x-1.5 transition-transform"
    >
      ->
    </span>
  </Component>
</template>
