import type { ISbAsset } from '@/types'

export function useImageFocusPoint(asset: Partial<ISbAsset> | undefined) {
  const defaultPosition = { x: 50, y: 50 }

  if (!asset?.filename || !asset?.focus) return defaultPosition

  function extractSize(url: string) {
    const pattern = /\/(\d+x\d+)\//
    const match = url.match(pattern)

    if (match && match.length > 1) return match[1].split('x')
    else return null
  }

  function extractFocusPoint(focus: string) {
    const pattern = /(\d+x\d+)/
    const match = focus.match(pattern)

    if (match && match.length > 1) return match[1].split('x')
    else return null
  }

  const size = extractSize(asset.filename)
  const focusPoint = extractFocusPoint(asset.focus)

  if (!size || !focusPoint) return defaultPosition

  const [width, height] = size
  const [pointX, pointY] = focusPoint

  const x = ((Number(pointX) / Number(width)) * 100).toFixed(2)
  const y = ((Number(pointY) / Number(height)) * 100).toFixed(2)

  return { x, y }
}
