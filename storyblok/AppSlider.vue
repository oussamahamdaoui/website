<script setup lang="ts">
import type { Options } from '@splidejs/splide'
import { Splide, SplideSlide } from '@splidejs/vue-splide'

const props = defineProps({
  slides: {
    type: Array as PropType<Array<string>>,
    required: true
  },
  pathPrefix: {
    type: String,
    default: ''
  },
  options: {
    type: Object as PropType<Options>,
    default: () => ({
      type: 'loop',
      perPage: 3,
      perMove: 1,
      focus: 0,
      lazyLoad: 'nearby',
      fixedHeight: '240px',
      gap: '1.5rem',
      pagination: true,
      breakpoints: {
        768: {
          perPage: 2
        },
        640: {
          perPage: 1,
          arrows: false,
          gap: '1rem',
          padding: { right: '3rem' }
        }
      }
    })
  },
  height: {
    type: Number,
    default: 240
  }
})

const totalHeight = computed(() => {
  // 7*4 pagination margin-top + 6px pagination height
  if (props.options.pagination) return props.height + 7 * 4 + 6

  return props.height
})
</script>

<template>
  <Splide
    :options="options"
    :style="`height:${totalHeight}px`"
    class="max-sm:-mr-5"
  >
    <SplideSlide
      v-for="(slide, i) in slides"
      :key="i"
    >
      <img
        :src="`${pathPrefix}${slide}`"
        alt=""
        class="block w-full h-full object-cover aspect-video rounded-md"
      >
    </SplideSlide>
  </Splide>
</template>

<style lang="scss">
@import '@splidejs/splide/dist/css/splide-core.min.css';

.splide:not(.is-overflow) .splide__pagination {
  @apply flex;
}

.splide__pagination {
  @apply h-1.5;
  @apply mt-7;
  @apply space-x-2;
  @apply justify-center;
  @apply sm:justify-start;

  li {
    @apply h-1.5;
    @apply leading-[0];
  }

  &__page {
    @apply w-8;
    @apply h-1.5;
    @apply bg-grey-400;
    @apply rounded-sm;

    &.is-active {
      @apply bg-beige-200;
    }
  }
}

.splide__track {
  &:before,
  &:after {
    content: '';
    @apply from-transparent;
    @apply to-brown-500;
    @apply pointer-events-none;
    @apply z-10;
    @apply w-20;
    @apply h-full;
    @apply absolute;
    @apply top-0;
  }

  &:before {
    @apply max-sm:hidden;
    @apply left-0;
    @apply bg-gradient-to-l;
  }

  &:after {
    @apply right-0;
    @apply bg-gradient-to-r;
    @apply w-6;
    @apply sm:w-32;
  }
}

.splide__arrows {
  .splide__arrow {
    @apply z-50;
    @apply absolute;
    @apply top-1/2;
    @apply -translate-y-1/2;

    &:disabled {
      @apply hidden;
    }

    &--prev {
      @apply left-0;
      @apply rotate-180;
    }

    &--next {
      @apply right-0;
    }

    svg {
      height: 29px;
      width: 29px;
      @apply fill-beige-200;
    }
  }
}
</style>
