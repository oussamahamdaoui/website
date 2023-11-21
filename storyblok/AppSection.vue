<script setup lang="ts">
import type { SbBlokData } from '@storyblok/js/dist/types'
import { Spacing } from '@/types'

interface ISbBlokData extends SbBlokData {
  body: SbBlokData[],
  backgroundColor: {
    value?: string
  },
  spacing: Spacing
}

const props = defineProps({
  blok: {
    type: Object as PropType<ISbBlokData>,
    default: undefined
  },
  bgColorAlt: {
    type: Boolean,
    default: false
  },
  spacing: {
    type: String as PropType<Spacing>,
    default: undefined
  }
})
const classes = computed(() => ({
  'bg-brown-400': props.bgColorAlt || !!props.blok?.backgroundColor?.value,
  'py-11': props.spacing === Spacing.Sm || props.blok?.spacing === Spacing.Sm,
  'py-11 lg:py-14': props.spacing === Spacing.Md || props.blok?.spacing === Spacing.Md,
  'py-14 lg:py-20': props.spacing === Spacing.Lg || props.blok?.spacing === Spacing.Lg
}))
</script>

<template>
  <section
    v-editable="blok"
    :class="classes"
  >
    <div>
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
  </section>
</template>
