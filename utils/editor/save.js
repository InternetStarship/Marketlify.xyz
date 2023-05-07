import { toast } from 'react-toastify'
import { prettySize } from '@/utils/utility/prettySize'
import { checkLocalStorageSize } from '@/utils/utility/checkLocalStorageSize'

export function save(page, name) {
  page.size = prettySize(JSON.stringify(page))
  page.name = name
  const dataSize = new Blob([page], { type: 'application/json' }).size

  if (checkLocalStorageSize(dataSize)) {
    localStorage.setItem(`marketlify_v3_page_${page.id}`, JSON.stringify(page))
    toast('Page has been saved.')
    return true
  } else {
    toast('Your page is too large (>5mb) to save to your browser. Please try again with a smaller page.')
    return null
  }
}
