<script setup lang="ts">
import type { SbBlokData } from '@storyblok/js/dist/types'
import CloseIcon from '@/assets/images/icons/close.svg?component'

interface ISbBlokData extends SbBlokData {
  activator: SbBlokData[],
  video: SbBlokData[],
}

defineProps({
  blok: {
    type: Object as PropType<ISbBlokData>,
    required: true
  }
})

const active = ref(false)

function hide() {
  active.value = false
}
</script>

<template>
  <div>
    <StoryblokComponent
      :blok="blok.activator[0]"
      class="py-2"
      @click="active = !active"
    />

    <Transition name="fade">
      <div
        v-if="active"
        class="fixed top-0 left-0 w-full h-full z-[100] p-6 flex flex-col justify-center items-center"
      >
        <div
          class="backdrop-blur-sm bg-brown-400/80 w-full h-full absolute z-0"
          @click="hide"
        />

        <div class="flex flex-col items-end max-w-screen-xl w-full z-10 relative">
          <CloseIcon
            width="20"
            height="20"
            class="text-beige-200 mb-5 cursor-pointer absolute -top-8"
            @click="hide"
          />

          <div class="aspect-video w-full max-h-[calc(100vh-88px)]">
            <StoryblokComponent :blok="blok.video[0]" />
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity;
}

.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}
</style>
