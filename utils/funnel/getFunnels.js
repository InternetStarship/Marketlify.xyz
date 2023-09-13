export function getFunnels() {
  const funnels = []

  if (typeof localStorage !== 'undefined') {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)

      if (key && key.startsWith('marketlify_v3_funnel_')) {
        const localItem = localStorage.getItem(key)
        if (localItem) {
          try {
            const data = JSON.parse(localItem)
            funnels.push(data)
          } catch (err) {
            console.error(`Error parsing data for key ${key}:`, err)
          }
        }
      }
    }
  }

  return funnels
}
