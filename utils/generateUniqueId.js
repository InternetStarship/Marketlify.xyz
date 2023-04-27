export default function generateUniqueId(existingIds) {
  let uniqueId

  do {
    uniqueId = Math.floor(Math.random() * 1000000)
  } while (existingIds.has(uniqueId))

  return uniqueId
}
