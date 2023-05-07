export function generateUniqueId(existingIds) {
  let uniqueId

  do {
    uniqueId = Math.floor(Math.random() * 1000000)
  } while (existingIds.has ? existingIds.has(uniqueId) : existingIds.includes(uniqueId))

  return uniqueId
}
