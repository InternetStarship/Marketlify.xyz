import { generateUUID } from '../utility/generateUUID'
import { cloneDeep } from 'lodash'
import { toast } from 'react-toastify'
import moment from 'moment'

function getPageName(pages) {
  return `Page ${pages.length + 1}`
}

function createPageData(id, pageName) {
  return {
    id,
    name: pageName,
    size: 0,
    created_at: moment().format('MMMM Do YYYY, h:mm:ss a'),
    data: {
      seo: {
        title: pageName,
        description: '',
        url: '',
        image: '',
        favicon: '',
      },
      code: {
        head: '',
        body: '',
        css: '',
      },
      styles: {
        body: {
          backgroundColor: '#ffffff',
        },
        sections: [],
      },
      content: [],
    },
  }
}

function updateLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function createPage(state) {
  const id = generateUUID()
  const pageName = getPageName(state.project.pages.get())
  const pageData = createPageData(id, pageName)

  const key = `marketlify_v4_page_${id}`
  const projectKey = `marketlify_v4_project_${state.project.get().id}`
  updateLocalStorage(key, pageData)
  updateLocalStorage(projectKey, state.project.get())

  state.project.pages.set([...state.project.pages.get(), id])
  state.page.name.set(pageData.name)
  state.page.data.set(pageData.data)
  state.page.id.set(pageData.id)
  state.page.size.set(pageData.size)
  state.page.created_at.set(pageData.created_at)
  state.project.set(cloneDeep(state.project.get()))
  state.undo.history.set([pageData])

  state.active.current.set(id)

  toast('Page has been added to project.')
}
