/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */
import { FaSave } from 'react-icons/fa'

function SaveButton({ page, name }) {
  function save() {
    const uuid = generateUUID()
    const jsonData = JSON.stringify(page)
    const dataSize = new Blob([jsonData], { type: 'application/json' }).size

    if (checkLocalStorageSize(dataSize)) {
      localStorage.setItem(`marketlify~${name}~${uuid}`, jsonData)
      return uuid
    } else {
      alert('Your page is too large to save to your browser. Please try again with a smaller page.')
      return null
    }
  }

  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  function checkLocalStorageSize(dataSize) {
    const maxSize = 5 * 1024 * 1024 // 5 MB
    let currentSize = 0

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      const value = localStorage.getItem(key)
      currentSize += new Blob([key + value], { type: 'text/plain' }).size
    }

    return currentSize + dataSize <= maxSize
  }

  return (
    <button onClick={save} className="flex items-center toolbar-button-primary">
      <FaSave />
    </button>
  )
}

export default SaveButton
