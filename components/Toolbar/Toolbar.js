/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

import { SlSizeFullscreen } from 'react-icons/sl'
import { AiOutlineMobile } from 'react-icons/ai'
import { BiDesktop } from 'react-icons/bi'
import { FaDownload, FaTabletAlt, FaUndo } from 'react-icons/fa'
import SaveButton from './SaveButton'
import FunnelsButton from './FunnelsButton'
import NewFunnelButton from './NewFunnelButton'
import Export from './Export'
import { useState } from 'react'

export default function Toolbar({
  funnel,
  page,
  viewport,
  updateViewport,
  load,
  updateFullscreen,
  name,
  modalOpen,
  modalOpenNew,
  updateFunnel,
  undo,
  undoHistory,
}) {
  const [exportPopup, setExportPopup] = useState(false)

  return (
    <main className="w-full bg-white border-b border-slate-300 shadow-sm p-2 flex justify-between items-center">
      <div className="flex space-x-2">
        <FunnelsButton load={load} modalOpen={modalOpen} updateFunnel={updateFunnel} />
        <NewFunnelButton load={load} modalOpenNew={modalOpenNew} updateFunnel={updateFunnel} />
      </div>

      {page && (
        <>
          <div className="items-center space-x-2 hidden md:flex">
            <button
              onClick={() => {
                updateViewport('desktop')
              }}
              className={'toolbar-button' + (viewport === 'desktop' ? ' active' : '')}
              data-tooltip-id="tooltip"
              data-tooltip-content="Desktop"
            >
              <BiDesktop />
            </button>
            <button
              onClick={() => {
                updateViewport('tablet')
              }}
              className={'toolbar-button' + (viewport === 'tablet' ? ' active' : '')}
              data-tooltip-id="tooltip"
              data-tooltip-content="Tablet"
            >
              <FaTabletAlt />
            </button>
            <button
              onClick={() => {
                updateViewport('mobile')
              }}
              className={'toolbar-button' + (viewport === 'mobile' ? ' active' : '')}
              data-tooltip-id="tooltip"
              data-tooltip-content="Mobile"
            >
              <AiOutlineMobile />
            </button>
            <button
              onClick={updateFullscreen}
              className="toolbar-button"
              data-tooltip-id="tooltip"
              data-tooltip-content="Fullscreen"
            >
              <SlSizeFullscreen />
            </button>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => {
                undo()
              }}
              className="flex items-center toolbar-button"
              data-tooltip-id="tooltip"
              data-tooltip-content="Undo Last Change"
            >
              <FaUndo />
            </button>
            <SaveButton page={page} name={name} />

            <button
              onClick={() => {
                setExportPopup(true)
              }}
              className="flex items-center toolbar-button"
              data-tooltip-id="tooltip"
              data-tooltip-content="Publish Your Site"
            >
              <FaDownload />
              <span className="hidden xl:inline-block">Export</span>
            </button>
          </div>
        </>
      )}

      {exportPopup && <Export funnel={funnel} close={() => setExportPopup(false)} />}
    </main>
  )
}
