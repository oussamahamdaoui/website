<script setup lang="ts">
import type { SbBlokData } from '@storyblok/js/dist/types'
import type { ISbAsset } from '@/types'
import screens from '#tailwind-config/theme/screens'

interface ISbBlokData extends SbBlokData {
  body: SbBlokData[],
  image: ISbAsset
}

defineProps({
  blok: {
    type: Object as PropType<ISbBlokData>,
    required: true
  }
})

onMounted(() => {
  imageRendered.value = true
})

const animationDuration = 500

const imageRendered = ref(false)
const imageLoaded = ref(false)
const imageAnimated = ref(false)

function animate() {
  imageLoaded.value = true

  setTimeout(() => {
    imageAnimated.value = true
  }, animationDuration + 100)
}
</script>

<template>
  <!-- 553px main layout BG image - 91px header height -->
  <div class="relative h-[462px] pt-10 md:pt-16">
    <div class="max-w-xl">
      <StoryblokComponent
        v-for="body in blok.body"
        :key="body._uid"
        :blok="body"
      />
    </div>

    <img
      v-if="imageRendered && blok.image"
      :src="$imageService(blok.image.filename, '2088x0/filters:quality(90)')"
      :srcset="`
          ${$imageService(blok.image.filename, '800x0/filters:quality(90)')} 800w,
          ${$imageService(blok.image.filename, '1280x0/filters:quality(90)')} 1280w,
          ${$imageService(blok.image.filename, '1600x0/filters:quality(90)')} 1600w,
          ${$imageService(blok.image.filename, '2088x0/filters:quality(90)')} 2088w
        `"
      :sizes="`100vw, (min-width: ${screens.md}) 50vw`"
      alt=""
      class="dur"
      :class="[
        'j-visual absolute -z-10 pointer-events-none min-w-[640px] w-[750px] sm:min-w-[750px] sm:w-[900px] md:min-w-[900px] md:w-[976px] lg:w-[1044px]',
        { 'opacity-0 scale-50': !imageLoaded },
        { [`origin-bottom-left ease-[cubic-bezier(.03,.88,.09,.95)] transition-transform duration-${animationDuration}`]: !imageAnimated }
      ]"
      @load="animate"
    >
  </div>
</template>

<style lang="scss" scoped>
.j-visual {
  @apply left-1/2;
  @apply -translate-x-1/2;
  @apply -bottom-14;

  @screen md {
    transform: translateY(-15%);
    @apply bottom-auto;
    @apply top-1/2;
    right: -18%;
    @apply translate-x-0;
    @apply left-auto;
    @apply -translate-y-1/2;
  }
}
</style>
