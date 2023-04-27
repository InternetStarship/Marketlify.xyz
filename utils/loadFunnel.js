import { toast } from 'react-toastify'
import { getPage } from '@/utils/getPage'

export function loadFunnel(callback, funnel, id) {
  const page = getPage(id)
  if (page) {
    toast('Funnel has been loaded.')
    return callback(funnel, page)
  } else {
    toast(`Error: Funnel with ID "${id}" not found.`)
  }
}
