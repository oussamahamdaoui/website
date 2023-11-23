<script setup lang="ts">
import type { SbBlokData } from '@storyblok/js/dist/types'
import { useStoryStore } from '@/stores/story'
import type { ISbAsset } from '@/types'
import screens from '#tailwind-config/theme/screens'

interface ISbBlokData extends SbBlokData {
  image: ISbAsset
  title: string
  text: string
  user: string
  link: string
}

const props = defineProps({
  blok: {
    type: Object as PropType<ISbBlokData>,
    required: true
  }
})
const storyStore = useStoryStore()
const user = storyStore.getMediumUserByUUID(props.blok.user)
const rootRef = ref()
const emit = defineEmits<{
  'rendered': [value: HTMLElement]
}>()

onMounted(() => emit('rendered', rootRef.value))
</script>

<template>
  <a
    ref="rootRef"
    :href="blok.link"
    target="_blank"
    class="group"
  >
    <div
      v-if="blok.image?.filename"
      class="mb-4 rounded-md overflow-hidden"
    >
      <img
        :src="$imageService(blok.image.filename, '870x0')"
        :srcset="`
          ${$imageService(blok.image.filename, '300x0')} 300w,
          ${$imageService(blok.image.filename, '580x0')} 580w,
          ${$imageService(blok.image.filename, '870x0')} 870w
        `"
        :sizes="`50vw, (min-width: ${screens.sm}) 33.333vw, (min-width: ${screens.lg}) 25vw`"
        :alt="blok.image.alt || ''"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        @load="emit('rendered', rootRef)"
      >
    </div>

    <p class="text-beige-100 text-sm font-semibold mb-2">
      {{ blok.title }}
    </p>

    <p class="break-words">{{ blok.text }}</p>

    <div
      v-if="user"
      class="flex items-center mt-3"
    >
      <img
        :src="$imageService(user.avatar.filename, '102x102')"
        :alt="user.avatar.alt || ''"
        width="34"
        height="34"
        class="rounded-full border border-grey-400 mr-2"
      >

      <span class="text-beige-100 font-semibold">
        {{ user.username }}
      </span>
    </div>
  </a>
</template>
