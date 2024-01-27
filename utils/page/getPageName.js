export function getPageName(id) {
  const key = `marketlify_v4_page_${id}`
  const data = localStorage.getItem(key)
  if (data === null) return null
  let output = JSON.parse(data)
  return output.name
}
