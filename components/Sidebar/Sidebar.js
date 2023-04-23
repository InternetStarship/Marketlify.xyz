/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

import Panel from './Panel'
import Settings from './Settings'
import Layers from './Layers'
import { useState, useEffect } from 'react'

export default function Sidebar({ current, page, close, selectedId, updatePage, updateCurrent }) {
  const [selected, setSelected] = useState(current)

  useEffect(() => {
    setSelected(current)
  }, [current])

  return (
    <main id="sidebar">
      {selected === 'editing' && (
        <Panel page={page} close={close} selectedId={selectedId} updatePage={updatePage} />
      )}
      {selected === 'settings' && (
        <Settings updateCurrent={updateCurrent} page={page} updatePage={updatePage} />
      )}
      {selected === 'layers' && <Layers updateCurrent={updateCurrent} page={page} updatePage={updatePage} />}
      {selected === '' && (
        <div className="text-lg font-medium text-center p-12 text-slate-600">
          Welcome to Marketlify Builder! A free offline page builder.
        </div>
      )}
    </main>
  )
}
