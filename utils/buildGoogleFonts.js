// googleFontsLoader.js
export default function buildGoogleFonts(page) {
  if (!page || !page.data || !page.data.styles || !page.data.styles.sections) {
    console.warn('Invalid page data provided to buildGoogleFonts.')
    return
  }

  const sections = page.data.styles.sections

  sections.forEach(section => {
    loadFontsFor(section)
    section.rows.forEach(row => {
      loadFontsFor(row)
      row.columns.forEach(column => {
        loadFontsFor(column)
        column.elements.forEach(element => {
          loadFontsFor(element)
        })
      })
    })
  })

  function loadFontsFor(item) {
    const fontFamily = item.style.fontFamily
    const fontWeight = item.style.fontWeight
    const fontItalic = item.style.fontItalic

    if (!fontFamily || !fontWeight) return

    const key = `${fontFamily}-${fontWeight}-${fontItalic}`
    if (document.getElementById(key)) return

    const link = document.createElement('link')
    link.id = key
    link.rel = 'stylesheet'
    link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(' ', '+')}:wght@${fontWeight}${
      fontItalic ? 'i' : ''
    }&display=swap`
    document.head.appendChild(link)

    console.log('added font link')
  }
}
