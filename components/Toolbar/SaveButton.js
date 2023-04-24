/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

import { FaSave } from 'react-icons/fa'
import { toast } from 'react-toastify'
import prettySize from '@/utils/prettySize'

function SaveButton({ page, name }) {
  function save() {
    page.size = prettySize(JSON.stringify(page))
    page.name = name
    const dataSize = new Blob([page], { type: 'application/json' }).size

    if (checkLocalStorageSize(dataSize)) {
      localStorage.setItem(`marketlify_v3_page_${page.id}`, JSON.stringify(page))
      toast('Page has been saved.')
      return true
    } else {
      toast('Your page is too large to save to your browser. Please try again with a smaller page.')
      return null
    }
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
    <button
      onClick={save}
      className="flex items-center toolbar-button-primary"
      data-tooltip-id="tooltip"
      data-tooltip-content="Save to local storage"
    >
      <FaSave />
      <span className="hidden xl:inline-block">Save</span>
    </button>
  )
}

export default SaveButton
