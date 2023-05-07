import { findContentById } from '@/utils/utility/findContentById'
import { extractInlineStyles } from '@/utils/css/extractInlineStyles'
import { buildGoogleFonts } from '@/utils/googleFonts/buildGoogleFonts'

const defaultStyles = `
.row {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-start;
}

@media (max-width: 420px) {
  .row {
    flex-direction: column;
  }
}

.column {
  width: 100%;
}

.responsive-video {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
}

.responsive-video iframe,
.responsive-video object,
.responsive-video embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
`

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
            .map(({ columns, style }) => {
              const rowStyle = objectToCSS(style)
              const renderColumns = () =>
                columns
                  .map(({ elements, style }) => {
                    const columnStyle = objectToCSS(style)
                    const renderElements = () =>
                      elements
                        .map(({ type, style, id }) => {
                          const elementStyle = objectToCSS(style)
                          let elementBody = ''
                          const content = findContentById(id, data.content)

                          switch (type) {
                            case 'headline':
                              elementBody = `<h1>${content.content}</h1>`
                              break
                            case 'subheadline':
                              elementBody = `<h2>${content.content}</h2>`
                              break
                            case 'paragraph':
                              elementBody = `<p>${content.content}</p>`
                              break
                            case 'image':
                              elementBody = `<img src="${content.content}" alt="${content.alt}">`
                              break
                            case 'button':
                              elementBody = `<a href="${content.href}">${content.content}</a>`
                              break
                            default:
                              break
                          }

                          if (elementBody !== '') {
                            return `<div class="element" style="${elementStyle}">${elementBody}</div>`
                          }

                          return ''
                        })
                        .join('')
                    return `<div class="column" style="${columnStyle}">${renderElements()}</div>`
                  })
                  .join('')
              return `<div class="row" style="${rowStyle}">${renderColumns()}</div>`
            })
            .join('')
        return `<section class="section" style="${sectionStyle}">${renderRows()}</section>`
      })
      .join('')

  let output = `
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
  ${data.seo.favicon ? ` <link rel="icon" href="${data.seo.favicon}">` : ''}
  <title>${data.seo.title}</title>
  <style>
    body {
      ${pageStyle}
    }
    ${defaultStyles}
  </style>
  ${buildGoogleFonts(data, true)}
  ${data.code.head}
</head>
<body>
  ${renderSections()}
  ${data.code.body}
</body>
</html>
`

  output = extractInlineStyles(output)
  return output
}

export default exportHTML
