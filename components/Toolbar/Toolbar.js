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
import { AiOutlinePlusCircle } from 'react-icons/ai'
import SaveButton from './SaveButton'
import PagesButton from './PagesButton'
import exportHTML from '@/utils/exportHTML'

export default function Toolbar({ page, viewport, updateViewport, load }) {
  function toggleSettings() {
    alert('todo')
  }

  function toggleLayers() {
    alert('todo')
  }

  function preview() {
    alert('todo')
  }

  function newPage() {
    load({
      page: {
        backgroundColor: '#ffffff',
      },
      seo: {
        title: 'New Page',
        description: '',
        keywords: '',
        url: '',
        image: '',
        favicon: '',
      },
      code: {
        head: '',
        body: '',
      },
      sections: [],
    })
  }

  return (
    <main className="w-full bg-slate-100 border-b border-slate-300 shadow-xl p-2 flex justify-between items-center">
      <div className="font-bold text-2xl">
        <img src="/images/logo.png" alt="logo" className="h-10 inline-block" />
      </div>
      <div className="flex">
        <div className="flex items-center space-x-2">
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
            <FaTabletAlt />
          </button>
          <button
            onClick={() => {
              updateViewport('mobile')
            }}
            className={'toolbar-button' + (viewport === 'mobile' ? ' active' : '')}
          >
            <AiOutlineMobile />
          </button>
          <button
            onClick={() => {
              preview()
            }}
            className="toolbar-button"
          >
            <SlSizeFullscreen />
          </button>

          <button
            onClick={() => {
              toggleLayers()
            }}
            className="toolbar-button"
          >
            <BsLayers />
            <span className="hidden xl:inline-block">Layout</span>
          </button>
          <button
            onClick={() => {
              toggleSettings()
            }}
            className="toolbar-button"
          >
            <HiOutlineCog />
            <span className="hidden xl:inline-block">Settings</span>
          </button>

          <button
            onClick={() => {
              newPage()
            }}
            className="toolbar-button"
          >
            <AiOutlinePlusCircle />
            <span className="hidden xl:inline-block">New Page</span>
          </button>

          <PagesButton load={load} />
          <SaveButton page={page} name={'First Page'} />

          <button
            onClick={() => {
              exportHTML(page)
            }}
            className="flex items-center toolbar-button-secondary"
          >
            <FaDownload />
            <span className="hidden xl:inline-block">Download</span>
          </button>
        </div>
      </div>
    </main>
  )
}
