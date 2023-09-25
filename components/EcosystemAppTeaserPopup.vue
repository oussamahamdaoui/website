<script setup lang="ts">
import TwitterIcon from '@/assets/images/icons/twitter.svg?component'
import DiscordIcon from '@/assets/images/icons/discord.svg?component'
import GithubIcon from '@/assets/images/icons/github.svg?component'
import TelegramIcon from '@/assets/images/icons/telegram.svg?component'
import AppIcon from '@/assets/images/icons/app.svg?component'
import type { IApp } from '@/types'
import { Spacing } from '@/types'

defineProps({
  app: {
    type: Object as PropType<IApp>,
    required: true
  }
})
</script>

<template>
  <AppCard
    class="h-full"
    :spacing="Spacing.Md"
  >
    <div class="flex gap-6">
      <img
        :src="`/ecosystem/${app.icon || 'fallback-app-icon.webp'}`"
        :alt="app.title"
        loading="lazy"
        width="64"
        height="64"
        class="rounded-lg object-contain aspect-square bg-black"
      >

      <div class="text-beige-100">
        <span class="font-semibold text-lg text-ellipsis line-clamp-1 overflow-hidden mb-0.5">{{ app.title }}</span>

        <p
          v-if="app.text"
          class="text-ellipsis line-clamp-2 overflow-hidden"
        >
          {{ app.text }}
        </p>
      </div>
    </div>

    <AppSlider
      v-if="app.preview?.length"
      class="mt-6 overflow-hidden rounded-md"
      :slides="app.preview"
      :options="{
        lazyLoad: 'nearby',
        fixedHeight: '210px',
      }"
      :height="210"
      path-prefix="/ecosystem/"
    />

    <div class="flex gap-3 items-center justify-between mt-6">
      <div class="flex gap-3">
        <a
          v-if="app.twitter"
          :href="app.twitter"
          target="_blank"
          class="text-grey-100 hover:underline transition-transform origin-center hover:scale-125"
        >
          <TwitterIcon
            width="32"
            height="32"
            class="shrink-0"
          />
        </a>

        <a
          v-if="app.github"
          :href="app.github"
          target="_blank"
          class="text-grey-100 hover:underline transition-transform origin-center hover:scale-125"
        >
          <GithubIcon
            width="32"
            height="32"
            class="shrink-0"
          />
        </a>

        <a
          v-if="app.discord"
          :href="app.discord"
          target="_blank"
          class="text-grey-100 hover:underline transition-transform origin-center hover:scale-125"
        >
          <DiscordIcon
            width="32"
            height="32"
            class="shrink-0"
          />
        </a>

        <a
          v-if="app.telegram"
          :href="app.telegram"
          target="_blank"
          class="text-grey-100 hover:underline transition-transform origin-center hover:scale-125"
        >
          <TelegramIcon
            width="32"
            height="32"
            class="shrink-0"
          />
        </a>
      </div>

      <AppCard
        v-if="app.website !== ''"
        :to="app.website"
        target="_blank"
        :spacing="Spacing.Xs"
      >
        <div class="flex items-center gap-4">
          <AppIcon
            class="text-grey-100"
            width="32"
            height="32"
          />

          <span class="font-semibold text-beige-100">Go to app</span>
        </div>
      </AppCard>
    </div>
  </AppCard>
</template>
