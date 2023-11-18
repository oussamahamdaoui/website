<script setup lang="ts">
import type { IApp } from '@/types'

const props = defineProps({
  app: {
    type: Object as PropType<IApp>,
    required: true
  },
  large: {
    type: Boolean,
    default: false
  }
})
const router = useRouter()

function linkToDetailView() {
  router.push(`/apps/detail-${encodeURIComponent(props.app.title)}`)
}
</script>

<template>
  <div
    :class="['group flex items-end md:row-span-3 relative cursor-pointer',large ? 'min-h-[230px]' : 'h-[212px]']"
    @click="linkToDetailView"
  >
    <div class="absolute rounded-md overflow-hidden w-full h-full z-0">
      <img
        :src="app.coverImage ? `/ecosystem/cover-images/${app.coverImage}` : `/ecosystem/icons/${app.icon || 'fallback-app-icon.webp'}`"
        alt=""
        loading="lazy"
        class="absolute object-cover w-full h-full bg-black group-hover:scale-105 transition-transform duration-300"
      >

      <div class="absolute bg-gradient-to-b from-transparent to-brown-400 w-full h-full z-10" />
    </div>

    <LazyHoverPopup>
      <template #popup>
        <EcosystemAppTeaserPopup :app="app" />
      </template>

      <template #hover>
        <EcosystemAppTeaser
          :app="app"
          :large="large"
          :link="false"
          class="z-20 text-beige-100"
        />
      </template>
    </LazyHoverPopup>
  </div>
</template>
