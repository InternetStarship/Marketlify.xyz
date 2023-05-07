export function findContentById(id, state) {
  if (Array.isArray(state.page.data.content.get())) {
    for (const item of state.page.data.content.get()) {
      if (item.id === id) return item
    }
  }

  return null
}
