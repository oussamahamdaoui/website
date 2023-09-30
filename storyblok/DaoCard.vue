<script setup lang="ts">
import type { SbBlokData } from '@storyblok/js/dist/types'
import dayjs from 'dayjs/esm'
import relativeTime from 'dayjs/esm/plugin/relativeTime'
import type { ISbAsset } from '@/types'
import { ButtonVariant, Typography } from '@/types'

interface ISbBlokData extends SbBlokData {
  url: string,
  coverImage: ISbAsset
}

interface IDao {
  name?: string,
  founded?: string,
  image?: string,
  description?: string,
  cover?: string,
  lastActivity?: string,
  proposalCount?: number,
  memberCount?: number
}

// eslint-disable-next-line import/no-named-as-default-member
dayjs.extend(relativeTime)

const props = defineProps({
  blok: {
    type: Object as PropType<ISbBlokData>,
    required: true
  }
})
const { $imageService } = useNuxtApp()

const { data: dao, error } = await useFetch<IDao>(props.blok.url, { key: props.blok._uid })
const coverImage = computed<string | undefined>(() => {
  if (props.blok.coverImage?.filename) return $imageService(props.blok.coverImage.filename)
  if (dao.value?.cover) return getIPFSImage(dao.value.cover)

  return undefined
})

function getIPFSImage(url: string) {
  return url.replace('ipfs://', 'https://ipfs.io/ipfs/')
}
</script>

<template>
  <div
    v-if="dao && !error"
    class="relative flex flex-col justify-between h-full rounded-lg overflow-hidden bg-brown-300 before:shadow-inner before:shadow-beige-200/10 before:pointer-events-none before:w-full before:h-full before:absolute before:z-50 before:rounded-lg"
  >
    <div>
      <div class="relative flex items-end h-[182px] px-6 pb-1">
        <div class="absolute z-10 top-0 left-0 h-full w-full bg-gradient-to-b from-transparent to-brown-300" />

        <img
          v-if="coverImage"
          :src="coverImage"
          alt=""
          loading="lazy"
          class="absolute top-0 left-0 w-full h-full object-cover"
        >

        <div class="relative z-20 flex items-center">
          <img
            v-if="dao.image && dao.name"
            :src="getIPFSImage(dao.image)"
            :alt="dao.name"
            width="56"
            height="56"
            class="rounded-full overflow-hidden border border-grey-400 object-cover mr-2"
          >

          <div>
            <AppHeadline
              v-if="dao.name"
              :style="Typography.HeadlineH6"
              class="!mb-0 !text-beige-100"
            >
              {{ dao.name }}
            </AppHeadline>

            <AppHeadline
              v-if="dao.founded"
              :style="Typography.Secondary2"
              class="!mb-0"
            >
              EST. {{ dayjs(dao.founded).year() }}
            </AppHeadline>
          </div>
        </div>
      </div>

      <div class="px-6 pt-2">
        <p
          v-if="dao.description"
          class="text-ellipsis line-clamp-3 overflow-hidden"
        >
          {{ dao.description }}
        </p>
      </div>
    </div>

    <div class="px-6 pb-6">
      <div class="flex gap-6 mt-5 mb-8">
        <div v-if="dao.lastActivity">
          <div>Last Activity</div>

          <div class="text-beige-200 font-semibold">
            {{ dayjs(dao.lastActivity).fromNow() }}
          </div>
        </div>

        <div v-if="dao.proposalCount">
          <div>Proposals</div>

          <div class="text-beige-200 font-semibold">
            {{ dao.proposalCount }}
          </div>
        </div>

        <div v-if="dao.memberCount">
          <div>Members</div>

          <div class="text-beige-200 font-semibold">
            {{ dao.memberCount }}
          </div>
        </div>
      </div>

      <AppButton
        :variant="ButtonVariant.Secondary"
        to="https://google.com"
        target="_blank"
      >
        Visit DAO
      </AppButton>
    </div>
  </div>
  <div
    v-else
    class="relative rounded-lg overflow-hidden bg-brown-300 before:shadow-inner before:shadow-beige-200/10 before:pointer-events-none before:w-full before:h-full before:absolute before:z-50 before:rounded-lg"
  >
    <p class="p-6">
      Faild to load DAO data.
    </p>
  </div>
</template>
