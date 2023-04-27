/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import Popup from '@/components/Popup'
import exportHTML from '@/utils/exportHTML'

export default function Export({ funnel, close }) {
  function sanitizeFileName(name) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  function exportFunnel() {
    const pages = []
    funnel.pages.map(pageId => {
      const key = `marketlify_v3_page_${pageId}`
      const page = JSON.parse(localStorage.getItem(key))
      const html = exportHTML(page.data)
      pages.push({
        name: page.name,
        html: html,
      })
    })

    const zip = new JSZip()

    pages.forEach(page => {
      zip.file(`${sanitizeFileName(page.name)}.html`, page.html)
    })

    zip.generateAsync({ type: 'blob' }).then(blob => {
      saveAs(blob, `${sanitizeFileName(funnel.name)}.zip`)
    })
  }

  return (
    <Popup title="Export Funnel" open={true} closeOverride={close}>
      <div className="p-6 rounded">
        <h3 className="text-xl font-bold">Raw HTML Files</h3>
        <p className="py-2 text-slate-500">
          Host the code your self and connect the pages together like it was 2014. Not for the faint of heart.
          You will need to know how to use FTP and have a web hosts, adding domain, etc. This is for the
          advanced users.
        </p>
        <div className="flex space-x-2">
          <button
            onClick={() => {
              exportFunnel()
            }}
            className="page-modal-close-button mt-2"
          >
            Download (.zip)
          </button>
          <button className="toolbar-button mt-2">Export to ClickFunnels 2.0 (coming soon)</button>
        </div>
      </div>
    </Popup>
  )
}
