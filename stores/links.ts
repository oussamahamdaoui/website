import { defineStore } from 'pinia'
import type { H3Error } from 'h3'
import type { ISbResult } from '@storyblok/js/dist/types'
import { AppCategory, ISbLinkApiObject } from '@/types'

export const useLinksStore = defineStore('links', () => {
  const runtimeConfig = useRuntimeConfig()
  const storyblokApi = useStoryblokApi()

  // state
  const links = ref<Record<string, ISbLinkApiObject> | null>(null)

  // actions
  function getLinkByUUID(uuid: string) {
    return links.value?.[uuid]
  }

  function getLinkByAppCategory(category: AppCategory) {
    if (!links.value) return undefined

    return Object.values(links.value).find(l => l.slug.includes(category.toLowerCase()))
  }

  async function loadLinks() {
    if (links.value) return

    const { data, error } = await useAsyncData<ISbResult, H3Error>(
      async () => await storyblokApi.get('cdn/links', {
        version: runtimeConfig.public.storyblokContentVersion as 'draft' | 'published'
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

    links.value = data.value.data.links
  }

  return { links, getLinkByUUID, getLinkByAppCategory, loadLinks }
})
