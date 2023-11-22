<script setup lang="ts">
import { useStoryStore } from '@/stores/story'

const storyStore = useStoryStore()
const { ecosystemUpdatesItemsLatest } = storyStore

await storyStore.loadEcosystemUpdates('updates')
</script>

<template>
  <div
    v-if="ecosystemUpdatesItemsLatest('updates')?.length"
    class="relative"
  >
    <div class="absolute z-10 pointer-events-none bottom-0 w-full h-36 bg-gradient-to-b from-transparent to-brown-400" />

    <MasonryLayout
      :items="ecosystemUpdatesItemsLatest('updates')"
      class="h-[820px] overflow-hidden"
    />
  </div>
</template>
