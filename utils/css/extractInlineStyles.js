export function htmlString(htmlString) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlString, 'text/html')
  const elementsWithStyle = doc.querySelectorAll('[style]')
  const stylesMap = new Map()
  let styleCounter = 0

  elementsWithStyle.forEach(el => {
    const style = el.getAttribute('style').trim()

    if (style.length === 0) {
      el.removeAttribute('style')
      return
    }

    let className

    if (stylesMap.has(style)) {
      className = stylesMap.get(style)
    } else {
      className = `marketlify-${styleCounter}`
      stylesMap.set(style, className)
      styleCounter++
    }

    el.classList.add(className)
    el.removeAttribute('style')
  })

  const stylesArray = Array.from(stylesMap.entries())
  const stylesText = stylesArray.map(([style, className]) => `.${className} { ${style} }`).join('\n')

  const styleTag = doc.createElement('style')
  styleTag.textContent = stylesText
  doc.head.appendChild(styleTag)

  const serializer = new XMLSerializer()
  return minifyHTML(removeMetaClosingTag(serializer.serializeToString(doc.documentElement)))
}

const removeMetaClosingTag = htmlString => {
  const metaTagRegex = /(<meta[^>]*?)\s*\/>/gi
  const sanitizedHtmlString = htmlString.replace(metaTagRegex, '$1>')
  return removeLinkClosingTag(sanitizedHtmlString)
}

const removeLinkClosingTag = htmlString => {
  const linkTagRegex = /(<link[^>]*?)\s*\/>/gi
  const sanitizedHtmlString = htmlString.replace(linkTagRegex, '$1>')
  return sanitizedHtmlString
}
function minifyHTML(html) {
  html = html.replaceAll(`style=""`, '')
  html = html.replace(/[\s]+/g, ' ')
  html = html.replace(/<!--.*?-->/gi, '')

  const OPTIONAL_CLOSING_TAGS = ['option', 'thead', 'tbody', 'tfoot', 'colgroup']
  const re = new RegExp('<\\/?(' + OPTIONAL_CLOSING_TAGS.join('|') + ')[^>]*>', 'gi')
  html = html.replace(re, '')

  return '<!DOCTYPE html>' + html.trim()
}
