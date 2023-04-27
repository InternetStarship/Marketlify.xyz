export function updateRowLayout() {
  setTimeout(() => {
    const canvasWrapper = document.getElementById('mainCanvas')
    const rows = document.querySelectorAll('.row')
    const isSingleColumn = canvasWrapper.clientWidth <= 320

    rows.forEach(row => {
      if (isSingleColumn) {
        row.classList.add('singleColumn')
      } else {
        row.classList.remove('singleColumn')
      }
    })
  }, 500)
}
