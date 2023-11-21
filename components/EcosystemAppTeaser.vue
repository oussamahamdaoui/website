<script setup lang="ts">
import AppTag from '@/storyblok/AppTag.vue'
import type { IApp } from '@/types'
import DownloadIcons from '@/components/DownloadIcons.vue'

const props = defineProps({
  app: {
    type: Object as PropType<IApp>,
    required: true
  },
  large: {
    type: Boolean,
    default: false
  },
  link: {
    type: Boolean,
    default: true
  },
  hideTag: {
    type: Boolean,
    default: false
  },
  appLinks: {
    type: Boolean,
    default: false
  },
  nativeTag: {
    type: Boolean,
    default: false
  }
})
const imageSize = computed(() => props.large ? 64 : 56)
const dynamicComponent = computed(() => props.link ? resolveComponent('NuxtLink') : 'div')
const elementAttrs = computed(() => {
  if (!props.link) return undefined

  return {
    to: `/apps/detail-${encodeURIComponent(props.app.title)}`
  }
})
</script>

<template>
  <Component
    :is="dynamicComponent"
    v-bind="elementAttrs"
    :class="['flex gap-6 items-center max-md:pb-4 md:py-4 md:p-6', { 'md:hover:bg-brown-400 transition-colors rounded': link }]"
  >
    <div class="shrink-0">
      <img
        :src="`/ecosystem/icons/${app.icon || 'fallback-app-icon.webp'}`"
        :alt="app.title"
        loading="lazy"
        :width="imageSize"
        :height="imageSize"
        class="rounded-lg object-contain aspect-square bg-black"
      >
    </div>

    <div class="overflow-hidden">
      <div :class="['font-semibold text-beige-100 flex items-center', large ? 'text-h6' : 'text-base']">
        <span class="mr-2 text-ellipsis line-clamp-1 overflow-hidden">{{ app.title }}</span>

        <AppTag
          v-if="!appLinks && !nativeTag"
          cyan
        >
          {{ app.category }}
        </AppTag>
      </div>

      <p
        v-if="app.shortDescription && !appLinks && !nativeTag"
        class="text-ellipsis line-clamp-2 overflow-hidden"
      >
        {{ app.shortDescription }}
      </p>

      <DownloadIcons
        v-if="appLinks && app.appLinks"
        :links="app.appLinks"
        :hide-link="appLinks"
        class="mt-2"
      />

      <AppTag
        v-if="nativeTag"
        class="mt-2"
      >
        Native on Juno
      </AppTag>
    </div>
  </Component>
</template>
