<script setup lang="ts">
import type { SbBlokData } from '@storyblok/js/dist/types'
import TwitterIcon from '@/assets/images/icons/twitter.svg?component'
import YoutubeIcon from '@/assets/images/icons/youtube.svg?component'
import DiscordIcon from '@/assets/images/icons/discord.svg?component'
import DaoDaoIcon from '@/assets/images/icons/daodao.svg?component'
import GithubIcon from '@/assets/images/icons/github.svg?component'
import TelegramIcon from '@/assets/images/icons/telegram.svg?component'
import type { ISbLinkObject } from '@/types'

interface ISbBlokData extends SbBlokData {
  link: ISbLinkObject,
  app: string,
  large: boolean,
}

const props = defineProps({
  blok: {
    type: Object as PropType<ISbBlokData>,
    required: true
  }
})
const linkHandler = useLinkHandler(props.blok.link)

function resolveIcon(app: string) {
  switch (app) {
    case 'twitter':
      return TwitterIcon
    case 'youtube':
      return YoutubeIcon
    case 'discord':
      return DiscordIcon
    case 'daodao':
      return DaoDaoIcon
    case 'github':
      return GithubIcon
    case 'telegram':
      return TelegramIcon
  }
}
</script>

<template>
  <NuxtLink
    v-bind="linkHandler"
    :aria-label="blok.app"
  >
    <Component
      :is="resolveIcon(blok.app)"
      :width="blok.large ? 32 : 24"
      :height="blok.large ? 32 : 24"
      class="block transition-transform origin-center hover:scale-125"
    />
  </NuxtLink>
</template>
