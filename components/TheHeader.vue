<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useConfigStore } from '@/stores/config'

const configStore = useConfigStore()
const { headerLogo, headerMenu, headerMenuSocial } = storeToRefs(configStore)
const navActive = ref(false)

function toggleNav() {
  navActive.value = !navActive.value
}

useHead({
  htmlAttrs: {
    class: computed(() => navActive.value ? 'overflow-hidden' : '')
  }
})
</script>

<template>
  <header
    v-if="headerMenu && headerMenuSocial"
    :class="[
      'group max-lg:fixed h-[91px] max-lg:z-50 max-lg:backdrop-blur-lg max-lg:bg-brown-500/60 max-lg:transition-all max-lg:duration-300 max-lg:overflow-hidden',
      { 'j-active max-lg:!bg-brown-500 max-lg:!h-screen': navActive }
    ]"
  >
    <div class="flex justify-between items-center h-[91px]">
      <StoryblokComponent
        v-if="headerLogo"
        :blok="headerLogo"
        class="text-salmon-200 z-50 opacity-100 max-lg:group-[.j-active]:opacity-0 max-lg:group-[.j-active]:pointer-events-none"
      />

      <div
        class="lg:hidden z-50 relative"
        @click="toggleNav"
      >
        <div class="w-7 h-0.5 bg-beige-200 group-[.j-active]:translate-y-2.5 transition-transform group-[.j-active]:opacity-0" />

        <div class="w-7 h-0.5 my-2 bg-beige-200 group-[.j-active]:opacity-0 transition-opacity " />

        <div class="w-7 h-0.5 bg-beige-200 group-[.j-active]:-translate-y-2.5 transition-transform group-[.j-active]:opacity-0" />

        <div class="w-7 h-0.5 bg-beige-200 absolute top-1/2 -translate-y-1/2 opacity-0 group-[.j-active]:opacity-100 group-[.j-active]:rotate-45 transition-transform" />

        <div class="w-7 h-0.5 bg-beige-200 absolute top-1/2 -translate-y-1/2 opacity-0 group-[.j-active]:opacity-100 group-[.j-active]:-rotate-45 transition-transform" />
      </div>

      <nav
        class="lg:flex text-beige-200 font-semibold max-lg:absolute max-lg:overflow-hidden
        max-lg:top-0 -mx-5 sm:-mx-6 lg:mx-0 max-lg:w-screen px-8 lg:p-0"
      >
        <ul class="lg:flex items-center max-lg:space-y-6 lg:space-x-6 lg:space-x-8 text-2xl lg:text-sm max-lg:pt-28">
          <li
            v-for="(blok, index) in headerMenu"
            :key="blok._uid"
            class="max-lg:opacity-0 max-lg:-translate-y-2 max-lg:transition-all max-lg:group-[.j-active]:opacity-100 max-lg:group-[.j-active]:translate-y-0 max-lg:duration-300"
            :style="navActive ? `transition-delay: ${index * .05}s;` : undefined"
          >
            <StoryblokComponent :blok="blok" />
          </li>
        </ul>

        <ul
          class="flex items-center lg:ml-8 lg:ml-11 max-lg:mt-12 space-x-8 lg:space-x-2 lg:space-x-3 max-lg:opacity-0
          max-lg:-translate-y-2 max-lg:transition-all max-lg:group-[.j-active]:opacity-100 max-lg:group-[.j-active]:translate-y-0 max-lg:duration-300"
          :style="navActive ? `transition-delay: ${headerMenu.length * .05}s;` : undefined"
        >
          <li
            v-for="blok in headerMenuSocial"
            :key="blok._uid"
          >
            <StoryblokComponent :blok="blok" />
          </li>
        </ul>
      </nav>
    </div>

    <div class="h-[1px] bg-beige-200 opacity-15 hidden lg:block" />
  </header>
</template>
