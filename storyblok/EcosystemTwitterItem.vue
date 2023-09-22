<script setup lang="ts">
import type { ISbRichtext, SbBlokData } from '@storyblok/js/dist/types'
import { useStoryStore } from '@/stores/story'
import TwitterIcon from '@/assets/images/icons/twitter.svg?component'
import screens from '#tailwind-config/theme/screens'
import { ISbAsset } from '@/types'

interface ISbBlokData extends SbBlokData {
  image: ISbAsset
  text: ISbRichtext
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
const user = storyStore.getTwitterUserByUUID(props.blok.user)
const rootRef = ref()
const emit = defineEmits<{
  'rendered': [value: HTMLElement]
}>()

onMounted(() => emit('rendered', rootRef.value))
</script>

<template>
  <div ref="rootRef">
    <div class="group p-4 border border-brown-200 rounded-lg bg-brown-500">
      <div class="flex flex-wrap-reverse gap-3 justify-between">
        <a
          v-if="user"
          :href="user.link"
          target="_blank"
          class="inline-flex group/user items-center mb-4"
        >
          <img
            :src="$imageService(user.avatar.filename, '117x117')"
            :alt="user.avatar.alt || ''"
            width="39"
            height="39"
            class="rounded-full border border-grey-400 mr-2"
          >

          <div class="group-hover/user:text-beige-200 transition-colors">
            <div class="font-semibold">
              {{ user.username }}
            </div>

            <div class="text-xs">
              {{ user.handle }}
            </div>
          </div>
        </a>

        <a
          :href="blok.link"
          target="_blank"
        >
          <TwitterIcon
            width="32"
            height="32"
            class="block transition-transform origin-center hover:scale-125"
          />
        </a>
      </div>

      <RichText
        v-if="blok.text"
        :blok="blok.text"
        class="overflow-hidden"
      />

      <a
        v-if="blok.image?.filename"
        :href="blok.link"
        target="_blank"
        class="overflow-hidden block rounded-sm mt-4"
      >
        <img
          :src="$imageService(blok.image.filename, '0x393')"
          :srcset="`
            ${$imageService(blok.image.filename, '0x393')} 393w,
            ${$imageService(blok.image.filename, '0x570')} 570w,
            ${$imageService(blok.image.filename, '0x768')} 768w
          `"
          :sizes="`50vw, (min-width: ${screens.sm}) 33.333vw, (min-width: ${screens.lg}) 25vw`"
          :alt="blok.image.alt || ''"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          @load="emit('rendered', rootRef)"
        >
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(p:last-of-type) {
  @apply mb-0;
}
</style>
