<script setup lang="ts">
import { useStoryStore } from '@/stores/story'

const storyStore = useStoryStore()
const story = ref(storyStore.story)

onMounted(() => {
  if (!story.value?.id) return
  useStoryblokBridge(story.value.id, evStory => (story.value = evStory))
})
useSeoMeta({
  title: () => story.value?.content.metadata?.title ?? '',
  ogTitle: () => story.value?.content.metadata?.og_title ?? '',
  description: () => story.value?.content.metadata?.description ?? '',
  ogDescription: () => story.value?.content.metadata?.og_description ?? '',
  ogImage: () => story.value?.content.metadata?.og_image ?? '',
  twitterCard: 'summary_large_image',
  twitterTitle: () => story.value?.content.metadata?.twitter_title ?? '',
  twitterDescription: () => story.value?.content.metadata?.twitter_description ?? '',
  twitterImage: () => story.value?.content.metadata?.twitter_image ?? ''
})
</script>

<template>
  <div
    v-if="story"
    class="min-h-screen overflow-x-hidden"
  >
    <BackgroundImage
      v-if="story.content.bgImage"
      :asset="story.content.bgImage"
      :layout="story.content.layout"
    />

    <TheHeader />

    <StoryblokComponent
      :blok="story.content"
    />

    <TheFooter />
  </div>
</template>
