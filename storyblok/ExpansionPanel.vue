<script setup lang="ts">
import type { SbBlokData } from '@storyblok/js/dist/types'
import ArrowBottomIcon from '@/assets/images/icons/arrow-bottom.svg?component'
import { Typography } from '@/types'

interface ISbBlokData extends SbBlokData {
  title: string,
  text: SbBlokData[]
}

defineProps({
  blok: {
    type: Object as PropType<ISbBlokData>,
    required: true
  }
})
const isOpen = ref(false)

function enter(el: Element) {
  const element = el as HTMLElement

  element.style.width = getComputedStyle(element).width
  element.style.position = 'absolute'
  element.style.visibility = 'hidden'
  element.style.height = 'auto'

  const height = getComputedStyle(element).height

  element.style.width = ''
  element.style.position = ''
  element.style.visibility = ''
  element.style.height = '0'

  // Force repaint to make sure the
  // animation is triggered correctly.
  // getComputedStyle(element).height

  // Trigger the animation.
  // We use `requestAnimationFrame` because we need
  // to make sure the browser has finished
  // painting after setting the `height`
  // to `0` in the line above.
  requestAnimationFrame(() => {
    element.style.height = height
  })
}

function afterEnter(el: Element) {
  const element = el as HTMLElement

  element.style.height = 'auto'
}

function leave(el: Element) {
  const element = el as HTMLElement

  element.style.height = getComputedStyle(element).height

  // Force repaint to make sure the
  // animation is triggered correctly.
  // getComputedStyle(element).height

  requestAnimationFrame(() => {
    element.style.height = '0'
  })
}
</script>

<template>
  <div>
    <button
      type="button"
      class="flex items-center text-left"
      @click="isOpen = !isOpen"
    >
      <ArrowBottomIcon
        width="19"
        height="12"
        :class="['text-beige-200 mr-8 transition-transform origin-center shrink-0', { '-scale-y-100': isOpen }]"
      />

      <AppHeadline
        :style="Typography.HeadlineH6"
        class="!mb-0"
      >
        {{ blok.title }}
      </AppHeadline>
    </button>

    <Transition
      name="expand"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
    >
      <div
        v-show="isOpen"
        class="j-accelerate"
      >
        <StoryblokComponent
          :blok="blok.text[0]"
          class="mt-4"
        />
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.rotate-180 {
  transform: rotate(180deg);
}

.expand-enter-active,
.expand-leave-active {
  transition: height 250ms ease-in-out;
  overflow: hidden;
}

.expand-enter,
.expand-leave-to {
  height: 0;
}

.j-accelerate {
  will-change: height;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}
</style>
