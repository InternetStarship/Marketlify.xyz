/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

function exportHTML(data) {
  const {
    page,
    seo: { title, description, keywords, url, image, favicon },
    code: { head, body },
    sections,
  } = data

  const objectToCSS = obj =>
    Object.entries(obj)
      .map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`)
      .join(' ')

  const pageStyle = objectToCSS(page)

  const renderSections = () =>
    sections
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
                        .map(({ type, content, style }) => {
                          if (type === 'text') {
                            const elementStyle = objectToCSS(style)
                            return `<div class="element" style="${elementStyle}">${content}</div>`
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

  downloadFile(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${description}">
  <meta name="keywords" content="${keywords}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${image}">
  <link rel="icon" href="${favicon}">
  <title>${title}</title>
  <style>
    body {
      ${pageStyle}
    }
  </style>
  ${head}
</head>
<body>
  ${renderSections()}
  ${body}
</body>
</html>
`)
}

function downloadFile(content, fileName = 'index.html') {
  const blob = new Blob([content], { type: 'text/html;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export default exportHTML
