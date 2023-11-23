<script setup lang="ts">
import type { Options } from '@splidejs/splide'
import { Splide, SplideSlide, SplideTrack } from '@splidejs/vue-splide'

defineProps({
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
      perPage: 3,
      focus: 0,
      omitEnd: true,
      lazyLoad: 'nearby',
      gap: '1.5rem',
      breakpoints: {
        1024: {
          perPage: 2
        },
        768: {
          perPage: 1,
          arrows: false,
          gap: '1rem',
          padding: { right: '3rem' }
        }
      }
    })
  }
})

const arrowPrevDisabled = ref(true)
const arrowNextDisabled = ref(true)

function updateArrowsState(splide: typeof Splide) {
  arrowPrevDisabled.value = splide.Components.Arrows.arrows.prev.disabled
  arrowNextDisabled.value = splide.Components.Arrows.arrows.next.disabled
}
</script>

<template>
  <Splide
    :options="options"
    :has-track="false"
    class="max-sm:-mr-5"
    @splide:arrows:updated="updateArrowsState"
  >
    <div :class="['relative', { 'j-arrow-prev-disabled': arrowPrevDisabled, 'j-arrow-next-disabled': arrowNextDisabled }]">
      <SplideTrack>
        <SplideSlide
          v-for="(slide, i) in slides"
          :key="i"
        >
          <img
            :src="`${pathPrefix}${slide}`"
            alt=""
            class="block w-full h-full object-cover aspect-[16/10.5] rounded-md"
          >
        </SplideSlide>
      </SplideTrack>

      <div class="splide__arrows" />
    </div>

    <ul class="splide__pagination" />
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

.j-arrow {
  &-prev-disabled .splide__track:before,
  &-next-disabled .splide__track:after {
    @apply opacity-0;
    @apply transition-opacity;
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
    @apply opacity-50;
    @apply transition-opacity;
  }

  &:before {
    @apply max-md:hidden;
    @apply left-0;
    @apply bg-gradient-to-l;
  }

  &:after {
    @apply right-0;
    @apply bg-gradient-to-r;
  }
}

.splide__arrows {
  .splide__arrow {
    @apply z-50;
    @apply absolute;
    @apply top-1/2;
    @apply -translate-y-1/2;
    @apply transition-opacity;
    @apply duration-300;

    &:disabled {
      @apply opacity-0;
    }

    &--prev {
      @apply left-2;
      @apply rotate-180;
    }

    &--next {
      @apply right-2;
    }

    svg {
      height: 29px;
      width: 29px;
      @apply fill-beige-200;
    }
  }
}
</style>
