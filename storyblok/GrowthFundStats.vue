<script setup lang="ts">
import type { SbBlokData } from '@storyblok/js/dist/types'
import dayjs from 'dayjs/esm'
import relativeTime from 'dayjs/esm/plugin/relativeTime'

interface ISbBlokData extends SbBlokData {
  investments: string,
  investmentsAmount: string,
}

// eslint-disable-next-line import/no-named-as-default-member
dayjs.extend(relativeTime)

defineProps({
  blok: {
    type: Object as PropType<ISbBlokData>,
    required: true
  }
})

const { data: tvl } = await useLazyFetch('https://indexer.daodao.zone/juno-1/contract/juno1xz54y0ktew0dcm00f9vjw0p7x29pa4j5p9rwq6zerkytugzg27qs4shxnt/daoCore/tvl', { key: 'jgf-tvl' })
const { data: memberCount } = await useLazyFetch<string>('https://indexer.daodao.zone/juno-1/contract/juno1xz54y0ktew0dcm00f9vjw0p7x29pa4j5p9rwq6zerkytugzg27qs4shxnt/daoCore/memberCount', { key: 'jgf-member-count' })
const { data: lastMembershipChange } = await useLazyFetch<string>('https://indexer.daodao.zone/juno-1/contract/juno1xz54y0ktew0dcm00f9vjw0p7x29pa4j5p9rwq6zerkytugzg27qs4shxnt/daoCore/lastMembershipChange', { key: 'jgf-last-membership-change' })
const { data: lastActivity } = await useLazyFetch<string>('https://indexer.daodao.zone/juno-1/contract/juno1xz54y0ktew0dcm00f9vjw0p7x29pa4j5p9rwq6zerkytugzg27qs4shxnt/daoCore/lastActivity', { key: 'jgf-last-activity' })

const tvlFormatted = computed(() => {
  if (!tvl.value) return '-'

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(Number(tvl.value))
})
const lastMembershipChangeFormatted = computed(() => {
  if (!lastMembershipChange.value) return '-'

  return dayjs(lastMembershipChange.value).fromNow()
})
const lastActivityFormatted = computed(() => {
  if (!lastActivity.value) return '-'

  return dayjs(lastActivity.value).fromNow()
})
</script>

<template>
  <div
    v-editable="blok"
    class="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-12 place-items-center storyblok__outline"
  >
    <div>
      <div class="text-cyan-200 text-xs uppercase mb-2.5 text-center storyblok__outline">
        Treasury
      </div>

      <div class="font-neue-haas text-beige-200 text-2xl mb-3 text-center storyblok__outline">
        {{ tvlFormatted }}
      </div>

      <span class="text-center block">est. USD value</span>
    </div>

    <div>
      <div class="text-cyan-200 text-xs uppercase mb-2.5 text-center storyblok__outline">
        Investments
      </div>

      <div class="font-neue-haas text-beige-200 text-2xl mb-3 text-center storyblok__outline">
        {{ blok.investments }}
      </div>

      <span class="text-center block">{{ blok.investmentsAmount }} est. USD value</span>
    </div>

    <div>
      <div class="text-cyan-200 text-xs uppercase mb-2.5 text-center storyblok__outline">
        Members
      </div>

      <div class="font-neue-haas text-beige-200 text-2xl mb-3 text-center storyblok__outline">
        {{ memberCount ?? '-' }}
      </div>

      <span class="text-center block">Last added {{ lastMembershipChangeFormatted }}</span>
    </div>

    <div>
      <div class="text-cyan-200 text-xs uppercase mb-2.5 text-center storyblok__outline">
        Last activity
      </div>

      <div class="font-neue-haas text-beige-200 text-2xl mb-3 text-center storyblok__outline">
        {{ lastActivityFormatted }}
      </div>

      <span class="text-center block">Proposal submitted</span>
    </div>
  </div>
</template>
