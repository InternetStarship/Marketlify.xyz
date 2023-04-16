/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

import { HiOutlineCog } from 'react-icons/hi'
import { BsLayers, BsFiletypeHtml, BsTabletLandscape } from 'react-icons/bs'
import { AiOutlineMobile } from 'react-icons/ai'
import { BiDesktop } from 'react-icons/bi'

export default function Toolbar({ page }) {
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

  function toggleSettings() {
    console.log('...')
  }

  function toggleMobile() {
    console.log('...')
  }

  function toggleTablet() {
    console.log('...')
  }

  function toggleDesktop() {
    console.log('...')
  }

  function toggleLayers() {
    console.log('...')
  }

  return (
    <main className="w-full bg-slate-100 border-b border-slate-300 shadow-xl p-2 flex justify-between items-center">
      <div className="font-bold text-2xl">PageBuilder</div>
      <div className="flex space-x-2">
        <button
          onClick={() => {
            toggleMobile()
          }}
          className="toolbar-button"
        >
          <AiOutlineMobile />
        </button>
        <button
          onClick={() => {
            toggleTablet()
          }}
          className="toolbar-button"
        >
          <BsTabletLandscape />
        </button>
        <button
          onClick={() => {
            toggleDesktop()
          }}
          className="toolbar-button"
        >
          <BiDesktop />
        </button>
        <button
          onClick={() => {
            toggleLayers()
          }}
          className="toolbar-button"
        >
          <BsLayers />
        </button>
        <button
          onClick={() => {
            toggleSettings()
          }}
          className="toolbar-button"
        >
          <HiOutlineCog />
        </button>
        <button
          onClick={() => {
            exportHTML(page)
          }}
          className="flex items-center toolbar-button"
        >
          <BsFiletypeHtml className="mr-2" />
          Export
        </button>
      </div>
    </main>
  )
}
