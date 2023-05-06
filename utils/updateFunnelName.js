import { toast } from 'react-toastify'

function getFunnelKey(id) {
  return `marketlify_v3_funnel_${id}`
}

function updateLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function getFunnelName() {
  const funnelNameElement = document.querySelector('#sidebar h2')
  return funnelNameElement.innerText.trim()
}

export function updateFunnelName(state) {
  const funnel = state.funnel.get()
  const funnelKey = getFunnelKey(funnel.id)

  const funnelName = getFunnelName()
  state.funnel.name.set(funnelName)

  updateLocalStorage(funnelKey, funnel)

  toast('Funnel name has been updated.')
}
