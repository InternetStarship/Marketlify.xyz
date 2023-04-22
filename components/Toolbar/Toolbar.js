/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

import { HiOutlineCog } from 'react-icons/hi'
import { BsLayers } from 'react-icons/bs'
import { SlSizeFullscreen } from 'react-icons/sl'
import { AiOutlineMobile } from 'react-icons/ai'
import { BiDesktop } from 'react-icons/bi'
import { FaDownload, FaTabletAlt } from 'react-icons/fa'
import SaveButton from './SaveButton'
import PagesButton from './PagesButton'
import NewPageButton from './NewPage'
import exportHTML from '@/utils/exportHTML'

export default function Toolbar({
  page,
  viewport,
  updateViewport,
  load,
  updateFullscreen,
  updateCurrent,
  name,
}) {
  function toggleSettings() {
    updateCurrent('settings')
  }

  function toggleLayers() {
    alert('todo')
  }

  return (
    <main className="w-full bg-slate-100 border-b border-slate-300 shadow-xl p-2 flex justify-between items-center">
      <div className="flex space-x-2">
        {/* <img src="/images/logo.png" alt="logo" className="h-10 inline-block" /> */}
        <PagesButton load={load} />
        <NewPageButton load={load} />
      </div>
      <div className="flex items-center space-x-2">
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
        {/* <button
          onClick={() => {
            toggleLayers()
          }}
          className="toolbar-button"
          data-tooltip-id="tooltip"
          data-tooltip-content="Layout"
        >
          <BsLayers />
        </button> */}
        <button
          onClick={() => {
            toggleSettings()
          }}
          className="toolbar-button"
          data-tooltip-id="tooltip"
          data-tooltip-content="Page Settings"
        >
          <HiOutlineCog />
        </button>
      </div>
      <div className="flex space-x-2">
        <SaveButton page={page} name={name} />

        <button
          onClick={() => {
            exportHTML(page)
          }}
          className="flex items-center toolbar-button-secondary"
          data-tooltip-id="tooltip"
          data-tooltip-content="Download 'index.html' File"
        >
          <FaDownload />
          <span className="hidden xl:inline-block">Download</span>
        </button>
      </div>
    </main>
  )
}
