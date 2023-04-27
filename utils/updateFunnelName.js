export function updateFunnelName(funnel, callback) {
  const funnelKey = `marketlify_v3_funnel_${funnel.id}`
  funnel.name = document.querySelector('#sidebar h2').innerText.trim()
  localStorage.setItem(funnelKey, JSON.stringify(funnel))
  return callback
}
