/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

import { HiOutlineCog } from 'react-icons/hi'
import { BsLayers, BsTabletLandscape } from 'react-icons/bs'
import { AiOutlineMobile } from 'react-icons/ai'
import { BiDesktop } from 'react-icons/bi'
import { MdPreview } from 'react-icons/md'
import { FaDownload } from 'react-icons/fa'

export default function Toolbar({ page, viewport, updateViewport }) {
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

  function toggleLayers() {
    console.log('...')
  }

  return (
    <main className="w-full bg-slate-100 border-b border-slate-300 shadow-xl p-2 flex justify-between items-center">
      <div className="font-bold text-2xl">Marketlify.xyz</div>
      <div className="flex space-x-2">
        <div className="flex items-center  space-x-2 mr-2">
          <button
            onClick={() => {
              updateViewport('desktop')
            }}
            className={'toolbar-button' + (viewport === 'desktop' ? ' active' : '')}
          >
            <BiDesktop />
          </button>
          <button
            onClick={() => {
              updateViewport('tablet')
            }}
            className={'toolbar-button' + (viewport === 'tablet' ? ' active' : '')}
          >
            <BsTabletLandscape />
          </button>
          <button
            onClick={() => {
              updateViewport('mobile')
            }}
            className={'toolbar-button' + (viewport === 'mobile' ? ' active' : '')}
          >
            <AiOutlineMobile />
          </button>
        </div>

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
            // toggleSettings()
          }}
          className="toolbar-button"
        >
          <MdPreview />
        </button>
        <button
          onClick={() => {
            exportHTML(page)
          }}
          className="flex items-center toolbar-button-primary"
        >
          <FaDownload />
        </button>
      </div>
    </main>
  )
}
