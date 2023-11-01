<script setup lang="ts">
import ChromeIcon from '@/assets/images/icons/chrome.svg?component'
import FirefoxIcon from '@/assets/images/icons/firefox.svg?component'
import AndroidIcon from '@/assets/images/icons/android.svg?component'
import IosIcon from '@/assets/images/icons/ios.svg?component'
import type { IAppLinks } from '@/types'

const props = defineProps({
  links: {
    type: Object as PropType<IAppLinks>,
    default: undefined
  },
  hideLink: {
    type: Boolean,
    default: false
  }
})

const dynamicComponent = computed(() => props.hideLink ? 'div' : 'a')
</script>

<template>
  <ul
    v-if="links"
    class="flex space-x-1 text-grey-200"
  >
    <li v-if="links.chrome">
      <Component
        :is="dynamicComponent"
        :href="hideLink ? undefined : links.chrome"
        :target="hideLink ? undefined : '_blank'"
        class="group"
      >
        <ChromeIcon
          width="24"
          height="24"
          :class="['transition-transform origin-center', { 'group-hover:scale-125': !hideLink }]"
        />
      </Component>
    </li>

    <li v-if="links.firefox">
      <Component
        :is="dynamicComponent"
        :href="hideLink ? undefined : links.firefox"
        :target="hideLink ? undefined : '_blank'"
        class="group"
      >
        <FirefoxIcon
          width="24"
          height="24"
          :class="['transition-transform origin-center', { 'group-hover:scale-125': !hideLink }]"
        />
      </Component>
    </li>

    <li v-if="links.android">
      <Component
        :is="dynamicComponent"
        :href="hideLink ? undefined : links.android"
        :target="hideLink ? undefined : '_blank'"
        class="group"
      >
        <AndroidIcon
          width="24"
          height="24"
          :class="['transition-transform origin-center', { 'group-hover:scale-125': !hideLink }]"
        />
      </Component>
    </li>

    <li v-if="links.ios">
      <Component
        :is="dynamicComponent"
        :href="hideLink ? undefined : links.ios"
        :target="hideLink ? undefined : '_blank'"
        class="group"
      >
        <IosIcon
          width="24"
          height="24"
          :class="['transition-transform origin-center', { 'group-hover:scale-125': !hideLink }]"
        />
      </Component>
    </li>
  </ul>
</template>
