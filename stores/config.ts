import { defineStore } from 'pinia'
import type { H3Error } from 'h3'
import type { ISbResult } from '@storyblok/js/dist/types'
import type { ISbConfigData } from '@/types'

export const useConfigStore = defineStore('config', () => {
  const runtimeConfig = useRuntimeConfig()
  const storyblokApi = useStoryblokApi()

  // state
  const config = ref<ISbConfigData | null>(null)

  // getters
  const headerLogo = computed(() => config.value?.headerLogo[0])
  const headerMenu = computed(() => config.value?.headerMenu)
  const headerMenuSocial = computed(() => config.value?.headerMenuSocial)
  const footerMenu = computed(() => config.value?.footerMenu)

  // actions
  async function loadConfig() {
    if (config.value) return

    const { data, error } = await useAsyncData<ISbResult, H3Error>(
      async (): Promise<ISbResult> => await storyblokApi.get('cdn/stories/config', {
        version: runtimeConfig.public.storyblokContentVersion as 'draft' | 'published',
        resolve_links: 'url'
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

    config.value = data.value.data.story.content
  }

  return { config, headerLogo, headerMenu, headerMenuSocial, footerMenu, loadConfig }
})
