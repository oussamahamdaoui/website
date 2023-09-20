import type { ISbLinkURLObject } from 'storyblok-js-client'
import type { ISbLinkObject } from '@/types'
import { LinkType } from '@/types'
import { useLinksStore } from '@/stores/links'

export function useLinkHandler(linkObject: ISbLinkObject | undefined) {
  if (!linkObject) return undefined

  const linksStore = useLinksStore()

  function trimTrailingSlash(path: string) {
    return path.replace(/\/$/, '')
  }

  function getStoryUrl({ story, id }: { story: ISbLinkURLObject, id: string }) {
    if (story?.url) return `/${trimTrailingSlash(story.url)}`

    // edge case for references within resolved relations
    const extractedSlug = linksStore.getLinkByUUID(id)?.slug

    if (extractedSlug) return `/${trimTrailingSlash(extractedSlug)}`

    return undefined
  }

  return {
    to: linkObject?.linktype === LinkType.Story
      ? getStoryUrl(linkObject)
      : trimTrailingSlash(linkObject.url),
    target: linkObject.target
  }
}
