import { generateUUID } from '@/utils/utility/generateUUID'

export function cloneProject(id) {
  if (typeof localStorage !== 'undefined') {
    const originalProjectKey = `marketlify_v4_project_${id}`
    const originalProjectDataString = localStorage.getItem(originalProjectKey)
    const originalProjectData = JSON.parse(originalProjectDataString)

    if (originalProjectData) {
      const duplicatedProjectId = generateUUID()
      const duplicatedProjectKey = `marketlify_v4_project_${duplicatedProjectId}`
      const duplicatedProjectData = JSON.parse(JSON.stringify(originalProjectData))

      duplicatedProjectData.id = duplicatedProjectId
      duplicatedProjectData.name = `${duplicatedProjectData.name} (Copy)`

      duplicatedProjectData.pages = []

      if (Array.isArray(originalProjectData.pages)) {
        originalProjectData.pages.forEach(pageId => {
          const originalPageKey = `marketlify_v4_page_${pageId}`
          const originalPageDataString = localStorage.getItem(originalPageKey)
          const originalPageData = JSON.parse(originalPageDataString)

          if (originalPageData) {
            const duplicatedPageId = generateUUID()
            const duplicatedPageKey = `marketlify_v4_page_${duplicatedPageId}`
            const duplicatedPageData = JSON.parse(JSON.stringify(originalPageData))

            duplicatedPageData.id = duplicatedPageId
            localStorage.setItem(duplicatedPageKey, JSON.stringify(duplicatedPageData))
            duplicatedProjectData.pages.push(duplicatedPageId)
          }
        })
      }

      localStorage.setItem(duplicatedProjectKey, JSON.stringify(duplicatedProjectData))

      return duplicatedProjectId
    }
  }
  return null
}
