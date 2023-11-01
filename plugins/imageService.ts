export default defineNuxtPlugin(() => {
  return {
    provide: {
      imageService: (path: string, modifiers?: string) => {
        const isSVGFile = computed(() => /.svg$/.test(path))
        let params = '/m/'

        if (modifiers) params += modifiers

        return `${path}${!isSVGFile.value ? params : ''}`
      }
    }
  }
})
