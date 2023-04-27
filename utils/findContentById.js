function findContentById(id, content = []) {
  if (Array.isArray(content)) {
    for (const item of content) {
      if (item.id === id) return item
    }
  }

  return null
}

export default findContentById
