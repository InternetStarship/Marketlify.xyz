export function findById(id, obj = sections) {
  if (Array.isArray(obj)) {
    for (const item of obj) {
      const result = findById(id, item)
      if (result) return _.cloneDeep(result)
    }
  } else if (typeof obj === 'object') {
    if (obj.id === id) return _.cloneDeep(obj)

    for (const key in obj) {
      const result = findById(id, obj[key])
      if (result) return _.cloneDeep(result)
    }
  }

  return null
}
