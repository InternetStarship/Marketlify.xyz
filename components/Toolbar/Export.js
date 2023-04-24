/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

import { useState } from 'react'
import Popup from '@/components/Popup'
import exportHTML from '@/utils/exportHTML'

export default function Export({ funnel, close }) {
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
  }

  return (
    <Popup title="Export Funnel" open={true} closeOverride={close}>
      <div className="bg-orange-50 border border-orange-200 text-orange-900 p-6 rounded shadow-sm">
        <h3 className="text-xl font-bold">Send to ClickFunnels 2.0</h3>
        <p className="py-2">
          <strong>EASY:</strong> Keep editing your funnel on ClickFunnels 2.0 and forget about the tech
          challenges! Start collecting email leads and selling your products right now. All you need is a
          ClickFunnels transfer tool.
        </p>
        <div className="flex space-x-3">
          <a
            href="https://chrome.google.com/webstore/detail/clickfunnels-transfer-too/idfgegkhondcbgnmopdkibfhecmnebaa"
            target="_blank"
            className="page-modal-close-button mt-2"
          >
            Install Chrome Extension
          </a>
          <a href="http://wynterfunnels.com" target="_blank" className="page-modal-close-button mt-2">
            Create Account
          </a>
        </div>
      </div>

      <div className="p-6 mt-3 rounded shadow-sm">
        <h3 className="text-xl font-bold">Raw HTML Files</h3>
        <p className="py-2 text-slate-500">
          <strong>HARD:</strong> Host the code your self and connect the pages together like it was 2014. Not
          for the faint of heart. You will need to know how to use FTP and have a web hosts, adding domain,
          etc. This is for the advanced users.
        </p>
        <button
          onClick={() => {
            exportFunnel()
          }}
          className="page-modal-close-button mt-2"
        >
          Download Now (.zip)
        </button>
      </div>
    </Popup>
  )
}
