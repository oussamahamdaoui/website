<script setup lang="ts">
import type { SbBlokData } from '@storyblok/js/dist/types'
import type { IApp } from '@/types'
import { useAppsStore } from '@/stores/apps'

enum FeaturedKey {
  Wallets = 'wallets_featured',
  Exchanges = 'exchanges_featured'
}

interface ISbBlokData extends SbBlokData {
  featuredKey: string,
  preview: boolean,
}

type FeaturedApps = [string, string]

const props = defineProps({
  blok: {
    type: Object as PropType<ISbBlokData>,
    required: true
  }
})
const appsStore = useAppsStore()
const url = 'https://indexer.daodao.zone/juno-1/contract/juno1el3vtsz7l4mw77nm9723t3uxud38mmth8f3nhq9n4washqndsudsg3xez6/daoCore/listItems'
const { data: featuredAppIDs, error, pending } = await useLazyFetch<FeaturedApps[]>(url, { key: 'juno-app-dao-featured-apps', server: false })

const featuredApps = computed(() => {
  if (!featuredAppIDs?.value) return undefined

  const apps: IApp[] = []
  const index = featuredAppIDs.value.findIndex(a => a[0] === props.blok.featuredKey)

  if (index < 0) return undefined

  featuredAppIDs.value[index][1].split(',').forEach((id) => {
    const app = appsStore.apps.find(a => a.id === id.trim())

    if (app) apps.push(app)
  })

  return apps
})
</script>

<template>
  <template v-if="featuredApps && featuredApps.length && !error">
    <div
      v-if="blok.preview"
      class="grid md:grid-cols-2 md:grid-rows-3 gap-x-6 gap-y-6"
    >
      <template
        v-for="(app, index) in featuredApps"
        :key="app.id"
      >
        <EcosystemAppPreview
          v-if="index === 0"
          :app="app"
          large
        />
        <LazyHoverPopup v-else>
          <template #popup>
            <EcosystemAppTeaserPopup :app="app" />
          </template>

          <template #hover>
            <EcosystemAppTeaser :app="app" />
          </template>
        </LazyHoverPopup>
      </template>
    </div>
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-6"
    >
      <LazyHoverPopup
        v-for="app in featuredApps"
        :key="app.id"
      >
        <template #popup>
          <EcosystemAppTeaserPopup :app="app" />
        </template>

        <template #hover>
          <EcosystemAppTeaser
            :app="app"
            :native-tag="blok.featuredKey === FeaturedKey.Exchanges"
            :app-links="blok.featuredKey === FeaturedKey.Wallets"
          />
        </template>
      </LazyHoverPopup>
    </div>
  </template>
  <div v-else-if="pending" />
  <div v-else>
    Failed to load apps.
  </div>
</template>
