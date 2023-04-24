/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

import Panel from './Panel'
import Settings from './Settings'
import Layers from './Layers'
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
          footer: '',
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
        <Panel page={page} close={close} selectedId={selectedId} updatePage={updatePage} />
      )}
      {selected === 'settings' && (
        <Settings updateCurrent={updateCurrent} page={page} updatePage={updatePage} />
      )}
      {selected === 'layers' && <Layers updateCurrent={updateCurrent} page={page} updatePage={updatePage} />}
      {selected === '' && funnel && (
        <div className="p-6">
          <h2
            className="text-xl font-bold pb-3 text-slate-900 pr-12"
            onBlur={() => {
              updateFunnelName()
            }}
            contentEditable="true"
            suppressContentEditableWarning={true}
          >
            {funnel.name}
          </h2>
          <div className="border border-slate-300 rounded overflow-hidden shadow">
            {funnel.pages.map((id, index) => (
              <div
                key={index}
                onClick={() => {
                  updatePage(getPage(id))
                  toast('Page has been loaded.')
                }}
                className={`font-medium text-slate-600 truncate p-2 cursor-pointer hover:bg-slate-100 hover:text-slate-900 ${
                  page && id === page.id
                    ? 'bg-orange-100 text-orange-900 hover:bg-orange-100 hover:text-orange-900'
                    : ''
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
            className="toolbar-button mt-2"
          >
            <RiFileAddLine /> <span>Add Page</span>
          </button>
        </div>
      )}
    </main>
  )
}
