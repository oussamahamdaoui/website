<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { SbBlokData } from '@storyblok/js/dist/types'
import type { ISbMetadata } from '@/types'
import { useStoryStore } from '~/stores/story'
import { ButtonVariant } from '@/types'
import AppButton from '~/storyblok/AppButton.vue'

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

await storyStore.loadEcosystemUpdates('ecosystem/shorts/items')
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
        v-if="ecosystemUpdatesItems['ecosystem/shorts/items']?.length"
        class="pt-14"
        :items="ecosystemUpdatesItems['ecosystem/shorts/items']"
      />

      <div class="text-center">
        <AppButton
          v-if="!storyStore.ecosystemUpdatesTotalReached('ecosystem/shorts/items')"
          :variant="ButtonVariant.Large"
          type-button
          class="mt-14 cursor-pointer"
          @click="storyStore.loadMoreEcosystemUpdates('ecosystem/shorts/items')"
        >
          Load more
        </AppButton>
      </div>
    </section>
  </main>
</template>
