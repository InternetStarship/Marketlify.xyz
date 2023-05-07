import { toast } from 'react-toastify'
import { cloneDeep } from 'lodash'
import { getPage } from '@/utils/page/getPage'

export function loadPage(state, id) {
  const page = getPage(id)
  state.page.data.set(page.data)
  state.page.id.set(page.id)
  state.page.name.set(page.name)
  state.page.size.set(page.size)
  state.page.created_at.set(page.created_at)
  state.undo.history.set([cloneDeep(page)])

  toast('Page has been loaded.')
}
