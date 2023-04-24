/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

import Panel from './Panel'
import Settings from './Settings'
import Layers from './Layers'
import { useState, useEffect } from 'react'
import { RiFileAddLine } from 'react-icons/ri'

export default function Sidebar({ current, page, funnel, close, selectedId, updatePage, updateCurrent }) {
  const [selected, setSelected] = useState(current)

  useEffect(() => {
    setSelected(current)
  }, [current])

  function getPageName(id) {
    const key = `marketlify_v3_page_${id}`
    const data = localStorage.getItem(key)
    if (data === null) return null
    let output = JSON.parse(data)
    return output.name
  }

  return (
    <main id="sidebar">
      {selected === 'editing' && (
        <Panel page={page} close={close} selectedId={selectedId} updatePage={updatePage} />
      )}
      {selected === 'settings' && (
        <Settings updateCurrent={updateCurrent} page={page} updatePage={updatePage} />
      )}
      {selected === 'layers' && <Layers updateCurrent={updateCurrent} page={page} updatePage={updatePage} />}
      {selected === '' && funnel && (
        <div className="p-6">
          <h2 className="text-xl font-bold pb-3 text-slate-900 pr-12">{funnel.name}</h2>
          <div className="bg-slate-50 border border-slate-200 rounded shadow-sm">
            {funnel.pages.map((id, index) => (
              <div
                key={index}
                className="font-medium text-slate-600 truncate p-2 rounded cursor-pointer hover:bg-white hover:text-slate-900"
              >
                {getPageName(id) || 'Untitled Page'}
              </div>
            ))}
          </div>
          <button className="toolbar-button mt-2">
            <RiFileAddLine /> <span>Add Page</span>
          </button>
        </div>
      )}
    </main>
  )
}
