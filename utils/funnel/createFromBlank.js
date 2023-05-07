import { toast } from 'react-toastify'
import { generateUUID } from '../utility/generateUUID'
import moment from 'moment'

export function createFromBlank(state, name, numberOfPages) {
  const funnelId = generateUUID()
  const numberOfPagesInt = parseInt(numberOfPages)

  const funnelKey = `marketlify_v3_funnel_${funnelId}`

  const funnelData = {
    id: funnelId,
    name: name,
    size: 0,
    pages: [],
    created_at: moment().format('MMMM Do YYYY, h:mm:ss a'),
  }

  for (let i = 0; i < numberOfPagesInt; i++) {
    const pageId = generateUUID()
    const pageKey = `marketlify_v3_page_${pageId}`
    const pageName = `Page ${i + 1}`
    funnelData.pages.push(pageId)

    const pageData = {
      id: pageId,
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

    localStorage.setItem(pageKey, JSON.stringify(pageData))
  }

  localStorage.setItem(funnelKey, JSON.stringify(funnelData))

  const firstPage = JSON.parse(localStorage.getItem(`marketlify_v3_page_${funnelData.pages[0]}`))

  state.funnel.name.set(funnelData.name)
  state.funnel.pages.set(funnelData.pages)
  state.page.data.set(firstPage.data)
  state.page.id.set(firstPage.id)
  state.page.size.set(firstPage.size)
  state.page.created_at.set(firstPage.created_at)
  state.popup.open.set(false)

  toast('New funnel created.')
}
