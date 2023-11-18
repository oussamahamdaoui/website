<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { SbBlokData } from '@storyblok/js/dist/types'
import type { ISbMetadata } from '@/types'
import { ButtonVariant } from '@/types'
import { useStoryStore } from '@/stores/story'
import AppButton from '@/storyblok/AppButton.vue'

interface ISbBlokData extends SbBlokData {
  body: SbBlokData[],
  metadata: ISbMetadata,
}

defineProps({
  blok: {
    type: Object as PropType<ISbBlokData>,
    required: true
  }
})

const storyStore = useStoryStore()
const { ecosystemUpdatesItems } = storeToRefs(storyStore)

await storyStore.loadEcosystemUpdates('updates')
</script>

<template>
  <main>
    <section class="py-14">
      <StoryblokComponent
        v-for="body in blok.body"
        :key="body._uid"
        :blok="body"
      />

      <MasonryLayout
        v-if="ecosystemUpdatesItems['updates']?.length"
        class="pt-14"
        :items="ecosystemUpdatesItems['updates']"
      />

      <div class="text-center">
        <AppButton
          v-if="!storyStore.ecosystemUpdatesTotalReached('updates')"
          :variant="ButtonVariant.Large"
          type-button
          class="mt-14 cursor-pointer"
          @click="storyStore.loadMoreEcosystemUpdates('updates')"
        >
          Load more
        </AppButton>
      </div>
    </section>
  </main>
</template>
