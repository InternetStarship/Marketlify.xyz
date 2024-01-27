import { toast } from 'react-toastify'
import { getPage } from '@/utils/page/getPage'
import { cloneDeep } from 'lodash'

export function loadProject(state, project, id) {
  const page = getPage(id)
  if (page) {
    state.popup.open.set(false)
    state.popup.type.set('')
    state.project.id.set(project.id)
    state.project.name.set(project.name)
    state.project.pages.set(project.pages)
    state.page.data.set(page.data)
    state.page.name.set(page.name)
    state.page.id.set(page.id)
    state.page.size.set(page.size)
    state.page.created_at.set(page.created_at)
    state.undo.history.set([cloneDeep(page)])
    state.active.current.set(id)

    toast('Project has been loaded. ')
  } else {
    toast(`Error: Project with ID "${id}" not found.`)
  }
}
