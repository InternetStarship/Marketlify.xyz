import { toast } from 'react-toastify'
import { prettySize } from '@/utils/utility/prettySize'
import { checkLocalStorageSize } from '@/utils/utility/checkLocalStorageSize'
import { cloneDeep } from 'lodash'

export function save(state) {
  const page = JSON.stringify(cloneDeep(state.page.get()))
  state.page.size.set(prettySize(page))
  const dataSize = new Blob([page], { type: 'application/json' }).size

  if (checkLocalStorageSize(dataSize)) {
    localStorage.setItem(`marketlify_v3_page_${state.page.id.get()}`, page)
    toast('Page has been saved.')
    return true
  } else {
    toast('Your page is too large (>5mb) to save to your browser. Please try again with a smaller page.')
    return null
  }
}
