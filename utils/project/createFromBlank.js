import { toast } from 'react-toastify'
import { generateUUID } from '../utility/generateUUID'
import moment from 'moment'

export function createFromBlank(state, name, numberOfPages) {
  const projectId = generateUUID()
  const numberOfPagesInt = parseInt(numberOfPages)

  const projectKey = `marketlify_v4_project_${projectId}`

  const projectData = {
    id: projectId,
    name: name,
    size: 0,
    pages: [],
    created_at: moment().format('MMMM Do YYYY, h:mm:ss a'),
  }

  for (let i = 0; i < numberOfPagesInt; i++) {
    const pageId = generateUUID()
    const pageKey = `marketlify_v4_page_${pageId}`
    const pageName = `Page ${i + 1}`
    projectData.pages.push(pageId)

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

  localStorage.setItem(projectKey, JSON.stringify(projectData))

  const firstPage = JSON.parse(localStorage.getItem(`marketlify_v4_page_${projectData.pages[0]}`))

  state.project.name.set(projectData.name)
  state.project.pages.set(projectData.pages)
  state.page.data.set(firstPage.data)
  state.page.id.set(firstPage.id)
  state.page.size.set(firstPage.size)
  state.page.created_at.set(firstPage.created_at)
  state.popup.open.set(false)

  state.active.current.set(projectId)

  toast('New project created.')
}
