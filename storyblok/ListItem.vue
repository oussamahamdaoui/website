<script setup lang="ts">
import type { SbBlokData } from '@storyblok/js/dist/types'
import CheckmarkIcon from '@/assets/images/icons/checkmark.svg?component'

interface ISbBlokData extends SbBlokData {
  body: SbBlokData[],
}

defineProps({
  blok: {
    type: Object as PropType<ISbBlokData>,
    required: true
  },
  listType: {
    type: String,
    required: true
  },
  counterLeftOfHeadline: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <li
    v-editable="blok"
    :class="['flex', {'j-list-ordered': listType === 'ol' }, {'j-counter-headline': counterLeftOfHeadline }]"
  >
    <CheckmarkIcon
      v-if="listType === 'ul'"
      class="text-cyan-200 shrink-0 mr-4"
      width="22"
      height="22"
    />

    <div>
      <StoryblokComponent
        v-for="body in blok.body"
        :key="body._uid"
        :blok="body"
      />
    </div>
  </li>
</template>

<style lang="scss" scoped>
.j-list-ordered {
  counter-increment: section;

  &:not(.j-counter-headline) {
    &:before {
      content: counters(section, '.');
      @apply w-8;
      @apply h-8;
      @apply mr-4;
      @apply text-beige-200;
      @apply font-semibold;
      @apply text-base;
      @apply bg-brown-200;
      @apply rounded-full;
      @apply shrink-0;
      @apply flex;
      @apply items-center;
      @apply justify-center;
    }
  }

  &.j-counter-headline {
    :deep(h1),
    :deep(h2),
    :deep(h3),
    :deep(h4),
    :deep(h5),
    :deep(h6) {
      @apply flex;
      @apply items-center;

      &:before {
        content: counters(section, '.');
        @apply w-8;
        @apply h-8;
        @apply mr-4;
        @apply text-beige-200;
        @apply font-semibold;
        @apply text-base;
        @apply bg-brown-200;
        @apply rounded-full;
        @apply shrink-0;
        @apply flex;
        @apply items-center;
        @apply justify-center;
      }
    }
  }
}
</style>
