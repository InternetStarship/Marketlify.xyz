export function getFunnels() {
  const funnels = []
  if (typeof localStorage !== 'undefined') {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      const data = JSON.parse(localStorage.getItem(key))
      if (key.startsWith('marketlify_v3_funnel_')) {
        funnels.push(data)
      }
    }
  }

  return funnels
}
