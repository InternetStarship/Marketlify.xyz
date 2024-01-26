import { generateUUID } from '@/utils/utility/generateUUID'

export function cloneFunnel(id) {
  if (typeof localStorage !== 'undefined') {
    const originalFunnelKey = `marketlify_v3_funnel_${id}`
    const originalFunnelDataString = localStorage.getItem(originalFunnelKey)
    const originalFunnelData = JSON.parse(originalFunnelDataString)

    if (originalFunnelData) {
      const duplicatedFunnelId = generateUUID()
      const duplicatedFunnelKey = `marketlify_v3_funnel_${duplicatedFunnelId}`
      const duplicatedFunnelData = JSON.parse(JSON.stringify(originalFunnelData))

      duplicatedFunnelData.id = duplicatedFunnelId
      duplicatedFunnelData.name = `${duplicatedFunnelData.name} (Copy)`

      duplicatedFunnelData.pages = []

      if (Array.isArray(originalFunnelData.pages)) {
        originalFunnelData.pages.forEach(pageId => {
          const originalPageKey = `marketlify_v3_page_${pageId}`
          const originalPageDataString = localStorage.getItem(originalPageKey)
          const originalPageData = JSON.parse(originalPageDataString)

          if (originalPageData) {
            const duplicatedPageId = generateUUID()
            const duplicatedPageKey = `marketlify_v3_page_${duplicatedPageId}`
            const duplicatedPageData = JSON.parse(JSON.stringify(originalPageData))

            duplicatedPageData.id = duplicatedPageId
            localStorage.setItem(duplicatedPageKey, JSON.stringify(duplicatedPageData))
            duplicatedFunnelData.pages.push(duplicatedPageId)
          }
        })
      }

      localStorage.setItem(duplicatedFunnelKey, JSON.stringify(duplicatedFunnelData))

      return duplicatedFunnelId
    }
  }
  return null
}
