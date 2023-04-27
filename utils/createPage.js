import { generateUUID } from './generateUUID'
import moment from 'moment'
import { cloneDeep } from 'lodash'

export function createPage(callback, funnel) {
  const id = generateUUID()
  const pageName = `Page ${funnel.pages.length + 1}`
  const pageData = {
    id: id,
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

  const key = `marketlify_v3_page_${id}`
  localStorage.setItem(key, JSON.stringify(pageData))

  funnel.pages.push(id)
  const funnelKey = `marketlify_v3_funnel_${funnel.id}`
  localStorage.setItem(funnelKey, JSON.stringify(funnel))

  return callback(cloneDeep(pageData))
}
