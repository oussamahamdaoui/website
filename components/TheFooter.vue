<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useConfigStore } from '@/stores/config'

const configStore = useConfigStore()
const { footerMenu } = storeToRefs(configStore)
</script>

<template>
  <footer
    v-if="footerMenu"
    class="sticky top-[100vh] py-14 bg-black"
  >
    <div>
      <StoryblokComponent
        v-for="body in footerMenu"
        :key="body._uid"
        :blok="body"
      />

      <a
        href="https://designdao.io/"
        target="_blank"
        class="group flex items-center justify-center uppercase space-x-2 mt-14 text-xs text-grey-200 tracking-widest"
      >
        <span>Designed by</span>

        <img
          src="@/assets/images/design-dao/designdao.png"
          alt="Design DAO"
          width="25"
          class="inline-block grayscale group-hover:grayscale-0 transition-all duration-500"
        >

        <span>Design DAO</span>
      </a>
    </div>
  </footer>
</template>
