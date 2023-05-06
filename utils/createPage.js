import { generateUUID } from './generateUUID'
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
  const pageName = getPageName(state.funnel.pages.get())
  const pageData = createPageData(id, pageName)

  const key = `marketlify_v3_page_${id}`
  const funnelKey = `marketlify_v3_funnel_${state.funnel.get().id}`
  updateLocalStorage(key, pageData)
  updateLocalStorage(funnelKey, state.funnel.get())

  state.funnel.pages.set([...state.funnel.pages.get(), id])
  state.page.data.set(pageData.data)
  state.page.id.set(pageData.id)
  state.page.size.set(pageData.size)
  state.page.created_at.set(pageData.created_at)
  state.funnel.set(cloneDeep(state.funnel.get()))
  state.undo.history.set([pageData])

  toast('Page has been added to funnel.')
}
