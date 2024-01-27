export function removeProject(id) {
  if (typeof localStorage !== 'undefined') {
    const projectKey = `marketlify_v4_project_${id}`
    const projectDataString = localStorage.getItem(projectKey)
    const projectData = JSON.parse(projectDataString)

    if (projectData && Array.isArray(projectData.pages)) {
      projectData.pages.forEach(pageId => {
        const pageKey = `marketlify_v4_page_${pageId}`
        localStorage.removeItem(pageKey)
      })
    }

    localStorage.removeItem(projectKey)
  }
  return null
}
