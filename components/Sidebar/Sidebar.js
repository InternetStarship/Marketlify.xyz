/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

import Panel from './Panel'
import Settings from './Settings'
import Layers from './Layers'
import CustomCode from './CustomCode'
import { useState, useEffect } from 'react'
import { RiFileAddLine } from 'react-icons/ri'
import { toast } from 'react-toastify'
import generateUUID from '@/utils/generateUUID'
import moment from 'moment'
import _ from 'lodash'

export default function Sidebar({
  current,
  page,
  funnel,
  close,
  selectedId,
  updatePage,
  updateCurrent,
  updateFunnel,
  updateUndoHistory,
}) {
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

  function getPage(id) {
    const key = `marketlify_v3_page_${id}`
    const data = localStorage.getItem(key)
    if (data === null) return null
    let output = JSON.parse(data)
    return output
  }

  function createPage() {
    const id = generateUUID()
    const pageName = `Page ${funnel.pages.length + 1}`
    const pageData = {
      id: id,
      name: pageName,
      size: 0,
      created_at: moment().format('MMMM Do YYYY, h:mm:ss a'),
      data: {
        seo: {
          title: pageName,
          description: '',
          url: '',
          image: '',
          favicon: '',
        },
        code: {
          head: '',
          body: '',
          css: '',
        },
        styles: {
          body: {
            backgroundColor: '#ffffff',
          },
          sections: [],
        },
        content: [],
      },
    }

    const key = `marketlify_v3_page_${id}`
    localStorage.setItem(key, JSON.stringify(pageData))
    updatePage(pageData)

    funnel.pages.push(id)
    const funnelKey = `marketlify_v3_funnel_${funnel.id}`
    localStorage.setItem(funnelKey, JSON.stringify(funnel))
    updateFunnel(_.cloneDeep(funnel))
    toast('Page has been added to funnel.')
    updateUndoHistory([pageData])
  }

  function updateFunnelName() {
    const funnelKey = `marketlify_v3_funnel_${funnel.id}`
    funnel.name = document.querySelector('#sidebar h2').innerText.trim()
    localStorage.setItem(funnelKey, JSON.stringify(funnel))
    toast('Funnel name has been updated.')
  }

  return (
    <main id="sidebar">
      {selected === 'editing' && (
        <Panel
          page={page}
          close={close}
          selectedId={selectedId}
          updatePage={updatePage}
          updateCurrent={updateCurrent}
        />
      )}
      {selected === 'settings' && (
        <Settings updateCurrent={updateCurrent} page={page} updatePage={updatePage} />
      )}
      {selected === 'custom-code' && <CustomCode page={page} updateCurrent={updateCurrent} />}
      {selected === 'layers' && <Layers updateCurrent={updateCurrent} page={page} updatePage={updatePage} />}
      {selected === '' && funnel && (
        <div className="p-6">
          <h4 className="text-xs uppercase tracking-wider text-slate-400 font-medium mb-1">Funnel</h4>
          <h2
            className="text-xl font-bold pb-6 text-slate-900 pr-12"
            onBlur={() => {
              updateFunnelName()
            }}
            contentEditable="true"
            suppressContentEditableWarning={true}
          >
            {funnel.name}
          </h2>

          <h4 className="text-xs uppercase tracking-wider text-slate-400 font-medium mb-1">Pages</h4>
          <div className="overflow-hidden">
            {funnel.pages.map((id, index) => (
              <div
                key={index}
                onClick={() => {
                  const thepage = getPage(id)
                  updatePage(thepage)
                  updateUndoHistory([_.cloneDeep(thepage)])

                  toast('Page has been loaded.')
                }}
                className={`font-medium rounded-md truncate p-2 cursor-pointer hover:bg-orange-100 hover:text-orange-900 ${
                  page && id === page.id
                    ? 'bg-orange-100 text-orange-900 hover:bg-orange-100 hover:text-orange-900'
                    : 'text-slate-900'
                }`}
              >
                {getPageName(id)}
              </div>
            ))}
          </div>
          <button
            onClick={() => {
              createPage()
            }}
            className="page-modal-close-button flex items-center text-sm mt-3"
          >
            <RiFileAddLine className="mr-2" /> <span>Add Page</span>
          </button>
        </div>
      )}
    </main>
  )
}
