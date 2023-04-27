export function checkLocalStorageSize(dataSize) {
  const maxSize = 5 * 1024 * 1024 // 5 MB
  let currentSize = 0

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    const value = localStorage.getItem(key)
    currentSize += new Blob([key + value], { type: 'text/plain' }).size
  }

  return currentSize + dataSize <= maxSize
}
