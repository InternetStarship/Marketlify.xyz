import { toast } from 'react-toastify'
import { getPage } from '@/utils/page/getPage'
import { cloneDeep } from 'lodash'

export function loadFunnel(state, funnel, id) {
  const page = getPage(id)
  if (page) {
    state.popup.open.set(false)
    state.popup.type.set('')
    state.funnel.name.set(funnel.name)
    state.funnel.pages.set(funnel.pages)
    state.page.data.set(page.data)
    state.page.name.set(page.name)
    state.page.id.set(page.id)
    state.page.size.set(page.size)
    state.page.created_at.set(page.created_at)
    state.undo.history.set([cloneDeep(page)])

    toast('Funnel has been loaded.')
  } else {
    toast(`Error: Funnel with ID "${id}" not found.`)
  }
}
