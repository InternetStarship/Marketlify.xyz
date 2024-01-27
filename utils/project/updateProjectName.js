import { toast } from 'react-toastify'

function getProjectKey(id) {
  return `marketlify_v4_project_${id}`
}

function updateLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function getProjectName() {
  const projectNameElement = document.querySelector('#sidebar h2')
  return projectNameElement.innerText.trim()
}

export function updateProjectName(state) {
  const project = state.project.get()
  const projectKey = getProjectKey(project.id)

  const projectName = getProjectName()
  state.project.name.set(projectName)

  updateLocalStorage(projectKey, project)

  state.active.current.set('updated-name: ' + projectName)

  toast('Project name has been updated.')
}
