/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

function exportHTML(data) {
  const objectToCSS = obj =>
    Object.entries(obj)
      .map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`)
      .join(' ')

  const pageStyle = objectToCSS(data.styles.body)

  const renderSections = () =>
    data.styles.sections
      .map(({ style, rows }) => {
        const sectionStyle = objectToCSS(style)

        const renderRows = () =>
          rows
            .map(({ columns }) => {
              const renderColumns = () =>
                columns
                  .map(({ elements }) => {
                    const renderElements = () =>
                      elements
                        .map(({ type, style }) => {
                          if (type === 'text') {
                            const elementStyle = objectToCSS(style)
                            return `<div class="element" style="${elementStyle}">add actual elelement - ${type}</div>`
                          }
                          return ''
                        })
                        .join('')
                    return `<div class="column">${renderElements()}</div>`
                  })
                  .join('')
              return `<div class="row">${renderColumns()}</div>`
            })
            .join('')
        return `<section class="section" style="${sectionStyle}">${renderRows()}</section>`
      })
      .join('')

  const output = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${data.seo.description}">
  <meta name="keywords" content="${data.seo.keywords}">
  <meta property="og:title" content="${data.seo.title}">
  <meta property="og:description" content="${data.seo.description}">
  <meta property="og:url" content="${data.seo.url}">
  <meta property="og:image" content="${data.seo.image}">
  <link rel="icon" href="${data.seo.favicon}">
  <title>${data.seo.title}</title>
  <style>
    body {
      ${pageStyle}
    }
  </style>
  ${data.code.head}
</head>
<body>
  ${renderSections()}
  ${data.code.footer}
</body>
</html>
`
  return output
}

export default exportHTML
