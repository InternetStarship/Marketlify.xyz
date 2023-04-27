export function removeFunnel(id) {
  if (typeof localStorage !== 'undefined') {
    const funnelKey = `marketlify_v3_funnel_${id}`
    const funnelDataString = localStorage.getItem(funnelKey)
    const funnelData = JSON.parse(funnelDataString)

    if (funnelData && Array.isArray(funnelData.pages)) {
      funnelData.pages.forEach(pageId => {
        const pageKey = `marketlify_v3_page_${pageId}`
        localStorage.removeItem(pageKey)
      })
    }

    localStorage.removeItem(funnelKey)
  }
  return null
}
