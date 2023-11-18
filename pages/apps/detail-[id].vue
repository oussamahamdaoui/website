<script setup lang="ts">
import TwitterIcon from '@/assets/images/icons/twitter-x.svg?component'
import DiscordIcon from '@/assets/images/icons/discord.svg?component'
import GithubIcon from '@/assets/images/icons/github.svg?component'
import TelegramIcon from '@/assets/images/icons/telegram.svg?component'
import AppIcon from '@/assets/images/icons/app.svg?component'
import { useAppsStore } from '@/stores/apps'
import { useLinksStore } from '@/stores/links'
import { ButtonVariant, Spacing, Typography } from '@/types'

const route = useRoute()
const appsStore = useAppsStore()
const linkStore = useLinksStore()
const runtimeConfig = useRuntimeConfig()

const app = appsStore.apps.find(app => app.title === decodeURIComponent(route.params.id as string))

if (!app) throw createError({
  statusCode: 404,
  statusMessage: 'The page you’re looking for can’t be found.',
  fatal: true
})

useSeoMeta({
  title: app?.title ?? '',
  ogTitle: app?.title ?? '',
  description: app?.text ?? '',
  ogDescription: app?.text ?? '',
  ogImage: `${runtimeConfig.public.metaLocationOrigin}/ecosystem/icons/${app?.icon || 'fallback-app-icon.webp'}` ?? '',
  twitterCard: 'summary_large_image',
  twitterTitle: app?.title ?? '',
  twitterDescription: app?.text ?? '',
  twitterImage: `${runtimeConfig.public.metaLocationOrigin}/ecosystem/icons/${app?.icon || 'fallback-app-icon.webp'}` ?? ''
})

const backLink = computed(() => {
  if (process.server || !app) return '/'
  if (!history.state.back) return `/${linkStore.getLinkByAppCategory(app.category)?.slug}`

  return history.state.back
})
</script>

<template>
  <div
    v-if="app"
    class="min-h-screen flex flex-col"
  >
    <BackgroundImage
      v-if="app.backgroundImage"
      :path="`/ecosystem/background-images/${app.backgroundImage}`"
    />

    <TheHeader />

    <main class="flex flex-col flex-grow justify-between">
      <AppSection :spacing="Spacing.Md">
        <div>
          <div class="flex flex-wrap gap-6">
            <AppButton
              :variant="ButtonVariant.ArrowLeft"
              :to="backLink"
              class="shrink-0"
            />

            <div class="flex gap-6 max-sm:basis-full">
              <div class="shrink-0">
                <img
                  class="object-contain aspect-square bg-black rounded-xl"
                  :src="`/ecosystem/icons/${app.icon || 'fallback-app-icon.webp'}`"
                  :alt="app.title"
                  width="72"
                  height="72"
                >
              </div>

              <div>
                <AppHeadline
                  :style="Typography.HeadlineH2"
                  element="h1"
                  class="text-ellipsis line-clamp-2 overflow-hidden"
                >
                  {{ app.title }}
                </AppHeadline>

                <div class="flex flex-wrap items-center gap-x-3 gap-y-2 mb-2">
                  <AppHeadline
                    :style="Typography.Secondary2"
                    element="span"
                    class="!mb-0"
                  >
                    {{ app.category }}
                  </AppHeadline>

                  <DownloadIcons :links="app.appLinks" />
                </div>
              </div>
            </div>
          </div>

          <AppSlider
            v-if="app.appPreviews?.length"
            class="mt-11"
            :slides="app.appPreviews"
            path-prefix="/ecosystem/"
          />

          <div class="flex max-md:flex-col-reverse md:justify-between mt-11 gap-12 lg:gap-24">
            <div>
              {{ app.text }}
            </div>

            <div class="max-md:flex flex-wrap gap-6 content-center md:space-y-4 md:w-5/12 lg:w-4/12">
              <AppCard
                v-if="app.website !== ''"
                class="md:mb-7 max-md:basis-full"
                :to="app.website"
                target="_blank"
              >
                <div class="flex items-center gap-4">
                  <AppIcon
                    class="border-grey-200"
                    width="34"
                    height="34"
                  />

                  <span class="font-semibold text-beige-100">Go to app</span>
                </div>
              </AppCard>

              <a
                v-if="app.twitter"
                :href="app.twitter"
                target="_blank"
                class="flex items-center gap-5 hover:underline"
              >
                <TwitterIcon
                  width="34"
                  height="34"
                  class="shrink-0"
                />

                <span class="max-md:hidden">{{ app.twitter.replace(/^https?:\/\//, '') }}</span>
              </a>

              <a
                v-if="app.github"
                :href="app.github"
                target="_blank"
                class="flex items-center gap-5 hover:underline"
              >
                <GithubIcon
                  width="34"
                  height="34"
                  class="shrink-0"
                />

                <span class="max-md:hidden">{{ app.github.replace(/^https?:\/\//, '') }}</span>
              </a>

              <a
                v-if="app.discord"
                :href="app.discord"
                target="_blank"
                class="flex items-center gap-5 hover:underline"
              >
                <DiscordIcon
                  width="34"
                  height="34"
                  class="shrink-0"
                />

                <span class="max-md:hidden">{{ app.discord.replace(/^https?:\/\//, '') }}</span>
              </a>

              <a
                v-if="app.telegram"
                :href="app.telegram"
                target="_blank"
                class="flex items-center gap-5 hover:underline"
              >
                <TelegramIcon
                  width="34"
                  height="34"
                  class="shrink-0"
                />

                <span class="max-md:hidden">{{ app.telegram.replace(/^https?:\/\//, '') }}</span>
              </a>
            </div>
          </div>
        </div>
      </AppSection>

      <AppSection
        :spacing="Spacing.Md"
        bg-color-alt
      >
        <AppHeadline
          :style="Typography.HeadlineH6"
          element="h6"
          class="mb-8"
        >
          Other {{ app.category }} Apps
        </AppHeadline>

        <AppsCategory
          :blok="{ category: app.category, preview: false }"
          :limit="3"
          :exclude="[app]"
        />
      </AppSection>
    </main>

    <TheFooter />
  </div>
</template>
