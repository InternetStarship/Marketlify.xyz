export default function buildGoogleFonts(data, render = false) {
  if (!data || !data.styles || !data.styles.sections) {
    console.warn('Invalid page data provided to buildGoogleFonts.')
    return
  }

  const sections = data.styles.sections
  let output = ''

  for (let i = 0; i < sections.length; i++) {
    const section = sections[i]
    output += loadFontsFor(section, render)

    for (let j = 0; j < section.rows.length; j++) {
      const row = section.rows[j]
      output += loadFontsFor(row, render)

      for (let k = 0; k < row.columns.length; k++) {
        const column = row.columns[k]
        output += loadFontsFor(column, render)

        for (let l = 0; l < column.elements.length; l++) {
          const element = column.elements[l]
          output += loadFontsFor(element, render)
        }
      }
    }
  }

  if (render) {
    return output
  }
}

function loadFontsFor(item, render = false) {
  const fontFamily = item.style.fontFamily
  const fontWeight = item.style.fontWeight
  const fontItalic = item.style.fontItalic

  if (!fontFamily || !fontWeight) return ''

  if (render) {
    return `<link rel="stylesheet" href="${`https://fonts.googleapis.com/css2?family=${fontFamily.replace(
      ' ',
      '+'
    )}:wght@${fontWeight}${fontItalic ? 'i' : ''}&display=swap`}">`
  } else {
    const key = `${fontFamily}-${fontWeight}-${fontItalic}`
    if (document.getElementById(key)) return ''

    const link = document.createElement('link')
    link.id = key
    link.rel = 'stylesheet'
    link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(' ', '+')}:wght@${fontWeight}${
      fontItalic ? 'i' : ''
    }&display=swap`
    document.head.appendChild(link)
  }
}
