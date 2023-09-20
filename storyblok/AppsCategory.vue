<script setup lang="ts">
import type { SbBlokData } from '@storyblok/js/dist/types'
import { useAppsStore } from '~/stores/apps'
import type { IApp } from '@/types'
import { AppCategory } from '@/types'

interface ISbBlokData extends SbBlokData {
  category: AppCategory | undefined,
  preview: boolean
}

const props = defineProps({
  blok: {
    type: Object as PropType<ISbBlokData>,
    required: true
  },
  limit: {
    type: Number,
    default: undefined
  },
  exclude: {
    type: Array as PropType<IApp[]>,
    default: undefined
  }
})
const appsStore = useAppsStore()
const apps = computed(() => {
  let res = props.blok.category ? appsStore.getAppsByCategory(props.blok.category) : appsStore.apps

  if (props.exclude) res = res.filter(r => !props.exclude?.includes(r))
  if (props.limit) res = res.slice(0, props.limit)

  return res
})
const appGroups = computed(() => {
  const appsSliced = apps.value.slice(0, 9)
  const groupSize = Math.ceil(appsSliced.length / 3) // calculates the size of each sub-array, rounded up
  const groups = []

  for (let i = 0; i < appsSliced.length; i += groupSize)
    groups.push(appsSliced.slice(i, i + groupSize)) // slices the original array into sub-arrays

  return groups
})
</script>

<template>
  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    <template v-if="blok.preview">
      <div
        v-for="(appGroup, i) in appGroups"
        :key="i"
        class="grid gap-6 place-content-start"
      >
        <template
          v-for="(app, ii) in appGroup"
          :key="ii"
        >
          <EcosystemAppPreview
            v-if="ii === 0 && blok.preview"
            :app="app"
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
    </template>
    <template v-else>
      <LazyHoverPopup
        v-for="(app, i) in apps"
        :key="i"
      >
        <template #popup>
          <EcosystemAppTeaserPopup :app="app" />
        </template>

        <template #hover>
          <EcosystemAppTeaser :app="app" />
        </template>
      </LazyHoverPopup>
    </template>
  </div>
</template>
