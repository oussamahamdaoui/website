<script setup lang="ts">
import type { ISbStoryData } from 'storyblok-js-client'
import screens from '#tailwind-config/theme/screens'

const props = defineProps({
  items: {
    type: Array as PropType<ISbStoryData[]>,
    required: true
  }
})

const containerRef = ref<HTMLElement | null>(null)
const childComponents = ref<HTMLElement[]>([])
const columnsCount = ref(2)
const mqlScreenSm = ref<MediaQueryList | null>(null)
const mqlScreenLg = ref<MediaQueryList | null>(null)
const reqAnimFrame = ref<number | null>(null)

onMounted(() => {
  mqlScreenSm.value = window.matchMedia(`(min-width: ${screens.sm})`)
  mqlScreenLg.value = window.matchMedia(`(min-width: ${screens.lg})`)

  // add event listener
  mqlScreenSm.value.addEventListener('change', handleScreenSm)
  mqlScreenLg.value.addEventListener('change', handleScreenLg)
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  if (mqlScreenSm.value) mqlScreenSm.value.removeEventListener('change', handleScreenSm)
  if (mqlScreenLg.value) mqlScreenLg.value.removeEventListener('change', handleScreenLg)
  if (reqAnimFrame.value) window.cancelAnimationFrame(reqAnimFrame.value)
  window.removeEventListener('resize', onResize)
})

async function initLayout() {
  await nextTick()

  // init columns count
  columnsCount.value = mqlScreenLg.value?.matches ? 4 : mqlScreenSm.value?.matches ? 3 : 2

  await setContainerHeight()

  // add class to trigger animation
  if (containerRef.value) containerRef.value.classList.add('loaded')
}

function onResize() {
  reqAnimFrame.value = window.requestAnimationFrame(setContainerHeight)
}

function getTallestColumn() {
  const columnItemsHeight: Array<Array<number>> = []

  // determine the height of each element in each column
  for (let i = 0; i < childComponents.value.length; i++) {
    const column = i % columnsCount.value

    if (!columnItemsHeight[column]) columnItemsHeight[column] = []

    const el = childComponents.value[i]

    columnItemsHeight[column].push(el?.offsetHeight ?? 0)
  }

  const columnsHeight: Array<number> = []

  // calculate the height of each column
  for (let i = 0; i < columnItemsHeight.length; i++)
    columnsHeight[i] = columnItemsHeight[i].reduce((accum, currentHeight) => accum + currentHeight, 0)

  return Math.max(...columnsHeight)
}

async function setContainerHeight() {
  await nextTick()

  if (!containerRef.value) return

  // set tallest column height and add 10px to be safe
  containerRef.value.style.height = `${getTallestColumn() + 10}px`
}

function handleScreenSm(listener: MediaQueryListEvent) {
  columnsCount.value = listener.matches ? 3 : 2
}

function handleScreenLg(listener: MediaQueryListEvent) {
  columnsCount.value = listener.matches ? 4 : 3
}

async function onChildMounted(child: HTMLElement, index: number) {
  if (!child) return
  childComponents.value[index] = child

  if (childComponents.value.length === props.items.length) await initLayout()
}
</script>

<template>
  <div v-if="items && items.length">
    <div
      ref="containerRef"
      class="j-masonry overflow-hidden"
    >
      <StoryblokComponent
        v-for="(item, i) in items"
        :key="item.uuid"
        v-editable="item.content"
        :blok="item.content"
        class="item"
        @rendered="(el: HTMLElement) => onChildMounted(el, i)"
      />

      <span class="item gap" />
      <span class="item gap" />
      <span class="item gap" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.j-masonry {
  @apply flex;
  flex-flow: column wrap;
  @apply content-between;

  &.loaded {
    .item {
      @apply opacity-100;
      @apply translate-y-0;
      transition: opacity 250ms ease-in, transform 500ms cubic-bezier(0, 0, 0.2, 1);
    }
  }
}

.item {
  @apply opacity-0;
  @apply translate-y-5;
  width: calc(50% - 0.625rem);
  @apply pb-10;

  &:not(.gap) {
    // 12 items on initial load
    @for $i from 1 to 13 {
      &:nth-child(#{$i}) {
        transition-delay: $i * 100ms;
      }
    }
  }

  @screen sm {
    width: calc(33.33333% - 1rem);
  }

  @screen lg {
    width: calc(25% - 1.125rem);
  }
}

// Re-order items into 2, 3 and 4 rows
.item {
  &:not(.gap) {
    &:nth-child(2n+1) {
      @apply order-1;
    }

    &:nth-child(2n+2) {
      @apply order-2;
    }
  }
}

@screen sm {
  .item {
    &:not(.gap) {
      &:nth-child(3n+1) {
        @apply order-1;
      }

      &:nth-child(3n+2) {
        @apply order-2;
      }

      &:nth-child(3n+3) {
        @apply order-3;
      }
    }
  }
}

@screen lg {
  .item {
    &:not(.gap) {
      &:nth-child(4n+1) {
        @apply order-1;
      }

      &:nth-child(4n+2) {
        @apply order-2;
      }

      &:nth-child(4n+3) {
        @apply order-3;
      }

      &:nth-child(4n) {
        @apply order-4;
      }
    }
  }
}

/* Force new columns */
.gap {
  @apply basis-full;
  @apply w-0;
  @apply m-0;
  @apply p-0;

  &:nth-of-type(1) {
    @apply block;
  }

  &:nth-of-type(2),
  &:nth-of-type(3) {
    @apply hidden;
  }

  &:nth-of-type(1) {
    @apply order-1;
  }

  &:nth-of-type(2) {
    @apply order-2;
  }

  &:nth-of-type(3) {
    @apply order-3;
  }
}

@screen sm {
  .gap {
    &:nth-of-type(1),
    &:nth-of-type(2) {
      @apply block;
    }

    &:nth-of-type(3) {
      @apply hidden;
    }
  }
}

@screen lg {
  .gap {
    &:nth-of-type(1),
    &:nth-of-type(2),
    &:nth-of-type(3) {
      @apply block;
    }
  }
}
</style>
