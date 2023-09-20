import { defineStore } from 'pinia'
import type { H3Error } from 'h3'
import type { ISbResult } from '@storyblok/js/dist/types'
import type { ISbStoryData } from 'storyblok-js-client'
import type { ISbStoryDataContent, ISbStoryMediumUserContent, ISbStoryTwitterUserContent } from '@/types'

export const useStoryStore = defineStore('story', () => {
  const runtimeConfig = useRuntimeConfig()
  const storyblokApi = useStoryblokApi()

  // state
  const story = ref<ISbStoryData<ISbStoryDataContent> | null>(null)
  const ecosystemMediumUsers = ref<ISbStoryData<ISbStoryMediumUserContent>[]>([])
  const ecosystemTwitterUsers = ref<ISbStoryData<ISbStoryTwitterUserContent>[]>([])
  const ecosystemUpdatesItems = ref<Record<string, ISbStoryData[]>>({})
  const ecosystemUpdatesPage = ref<Record<string, number>>({})
  const ecosystemUpdatesTotal = ref<Record<string, number>>({})

  // actions
  function getMediumUserByUUID(uuid: string) {
    return ecosystemMediumUsers.value.find((user: ISbStoryData<ISbStoryMediumUserContent>) => user.uuid === uuid)?.content
  }

  function getTwitterUserByUUID(uuid: string) {
    return ecosystemTwitterUsers.value.find((user: ISbStoryData<ISbStoryTwitterUserContent>) => user.uuid === uuid)?.content
  }

  function ecosystemUpdatesItemsLatest(url: string) {
    return ecosystemUpdatesItems.value[url].slice(0, 12)
  }

  function ecosystemUpdatesTotalReached(url: string) {
    return ecosystemUpdatesItems.value[url].length >= ecosystemUpdatesTotal.value[url]
  }

  async function loadStory(slug: string | string[]) {
    const url = Array.isArray(slug) && slug.length > 0 ? slug.join('/').replace(/\/+$/, '') : 'home'
    const { data, error } = await useAsyncData<ISbResult, H3Error>(
      `story-${url}`,
      async () => await storyblokApi.get(`cdn/stories/${url}`, {
        version: runtimeConfig.public.storyblokContentVersion as 'draft' | 'published',
        resolve_links: 'url',
        resolve_relations: ['global-reference.reference']
      })
    )

    if (!data.value) throw createError({
      statusCode: 404,
      statusMessage: 'The page you’re looking for can’t be found.',
      fatal: true
    })

    if (error.value) throw createError({
      statusCode: error.value.statusCode,
      statusMessage: 'An unexpected error occurred.',
      fatal: true
    })

    story.value = data.value.data.story
  }

  async function loadEcosystemMediumUsers() {
    if (ecosystemMediumUsers.value.length) return

    const { data, error } = await useAsyncData<ISbResult, H3Error>(
      async () => await storyblokApi.get('cdn/stories', {
        version: runtimeConfig.public.storyblokContentVersion as 'draft' | 'published',
        resolve_links: 'url',
        starts_with: 'medium-user'
      })
    )

    if (!data.value) throw createError({
      statusCode: 404,
      statusMessage: 'The page you’re looking for can’t be found.',
      fatal: true
    })

    if (error.value) throw createError({
      statusCode: error.value.statusCode,
      statusMessage: 'An unexpected error occurred.',
      fatal: true
    })

    ecosystemMediumUsers.value = data.value.data.stories
  }

  async function loadEcosystemTwitterUsers() {
    if (ecosystemTwitterUsers.value.length) return

    const { data, error } = await useAsyncData<ISbResult, H3Error>(
      async () => await storyblokApi.get('cdn/stories', {
        version: runtimeConfig.public.storyblokContentVersion as 'draft' | 'published',
        resolve_links: 'url',
        starts_with: 'twitter-user'
      })
    )

    if (!data.value) throw createError({
      statusCode: 404,
      statusMessage: 'The page you’re looking for can’t be found.',
      fatal: true
    })

    if (error.value) throw createError({
      statusCode: error.value.statusCode,
      statusMessage: 'An unexpected error occurred.',
      fatal: true
    })

    ecosystemTwitterUsers.value = data.value.data.stories
  }

  async function loadEcosystemUpdates(url: string) {
    if (!ecosystemUpdatesPage.value[url]) ecosystemUpdatesPage.value[url] = 1

    const { data, error } = await useAsyncData<ISbResult, H3Error>(
      async () => await storyblokApi.get('cdn/stories', {
        version: runtimeConfig.public.storyblokContentVersion as 'draft' | 'published',
        resolve_links: 'url',
        starts_with: url,
        is_startpage: false,
        sort_by: 'created_at:desc',
        per_page: 12,
        page: ecosystemUpdatesPage.value[url]
      })
    )

    if (!data.value) throw createError({
      statusCode: 404,
      statusMessage: 'The page you’re looking for can’t be found.',
      fatal: true
    })

    if (error.value) throw createError({
      statusCode: error.value.statusCode,
      statusMessage: 'An unexpected error occurred.',
      fatal: true
    })

    ecosystemUpdatesTotal.value[url] = data.value.total
    ecosystemUpdatesItems.value[url] = data.value.data.stories
  }

  async function loadMoreEcosystemUpdates(url: string) {
    if (ecosystemUpdatesItems.value[url].length >= ecosystemUpdatesTotal.value[url]) return

    ecosystemUpdatesPage.value[url] += 1

    const { data, error } = await useAsyncData<ISbResult, H3Error>(
      async () => await storyblokApi.get('cdn/stories', {
        version: runtimeConfig.public.storyblokContentVersion as 'draft' | 'published',
        resolve_links: 'url',
        starts_with: url,
        is_startpage: false,
        sort_by: 'created_at:desc',
        per_page: 12,
        page: ecosystemUpdatesPage.value[url]
      })
    )

    if (!data.value) throw createError({
      statusCode: 404,
      statusMessage: 'The page you’re looking for can’t be found.',
      fatal: true
    })

    if (error.value) throw createError({
      statusCode: error.value.statusCode,
      statusMessage: 'An unexpected error occurred.',
      fatal: true
    })

    ecosystemUpdatesItems.value[url].push(...data.value.data.stories)
  }

  return {
    story,
    ecosystemMediumUsers,
    ecosystemTwitterUsers,
    ecosystemUpdatesItems,
    ecosystemUpdatesPage,
    ecosystemUpdatesTotal,
    getMediumUserByUUID,
    getTwitterUserByUUID,
    ecosystemUpdatesItemsLatest,
    ecosystemUpdatesTotalReached,
    loadStory,
    loadEcosystemMediumUsers,
    loadEcosystemTwitterUsers,
    loadEcosystemUpdates,
    loadMoreEcosystemUpdates
  }
})
