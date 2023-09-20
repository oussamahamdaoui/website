import { defineStore } from 'pinia'
import ecosystemApps from '@/assets/json/ecosystem.json'
import type { IApp } from '@/types'
import { AppCategory } from '@/types'
import { shuffleArray } from '@/utils/shuffleArray'

export const useAppsStore = defineStore('apps', () => {
  const apps = ref<IApp[]>(shuffleArray<IApp>(ecosystemApps as IApp[]))

  function getAppsByCategory(category: AppCategory) {
    return apps.value.filter((app: IApp) => app.category === category)
  }

  return { apps, getAppsByCategory }
})
