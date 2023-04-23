/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useState, useEffect } from 'react'
import _ from 'lodash'

export default function Settings({ updateCurrent, page, updatePage, pageData }) {
  const [tab, setTab] = useState('seo')
  const [seo, setSeo] = useState({
    title: '',
    description: '',
    url: '',
    image: '',
    favicon: '',
  })

  useEffect(() => {
    setSeo(page.seo)
  }, [])

  return (
    <>
      <div className="text-xl p-3 text-white bg-slate-800 flex items-center justify-between font-bold">
        <h3 className="capitalize">Page Settings</h3>
        <button
          onClick={() => {
            updateCurrent('')
          }}
        >
          <AiOutlineCloseCircle />
        </button>
      </div>
      <div className="flex justify-full bg-slate-200 border-b font-bold uppercase border-slate-300 text-slate-400">
        <div
          onClick={() => {
            setTab('seo')
          }}
          className={`flex-1 text-center p-3 cursor-pointer ${
            tab === 'seo' ? 'bg-slate-300 text-slate-700' : ''
          }`}
        >
          SEO
        </div>
        <div
          onClick={() => {
            setTab('styles')
          }}
          className={`flex-1 text-center p-3 cursor-pointer ${
            tab === 'styles' ? 'bg-slate-300 text-slate-700' : ''
          }`}
        >
          Styles
        </div>
      </div>

      {tab === 'styles' && <>styles</>}

      {tab === 'seo' && (
        <div className="text-sm p-3 px-0">
          <div className="sidebar-fieldset-full">
            <label className="sidebar-label">Title</label>
            <input
              className="sidebar-input-full"
              type="text"
              value={seo.title}
              onChange={e => {
                setSeo({ ...seo, title: e.target.value })
                page.seo = seo
                updatePage(_.cloneDeep(page))
              }}
            />
          </div>
          <div className="sidebar-fieldset-full">
            <label className="sidebar-label">Description</label>
            <textarea
              className="sidebar-input-full"
              type="text"
              value={seo.description}
              onChange={e => {
                setSeo({ ...seo, description: e.target.value })
                updatePage(_.cloneDeep(page))
              }}
            ></textarea>
          </div>
          <div className="sidebar-fieldset-full">
            <label className="sidebar-label">Share Image URL</label>
            <input
              className="sidebar-input-full"
              type="text"
              value={seo.image}
              onChange={e => {
                setSeo({ ...seo, image: e.target.value })
                page.seo = seo
                updatePage(_.cloneDeep(page))
              }}
            />
          </div>
          <div className="sidebar-fieldset-full">
            <label className="sidebar-label">Favicon URL</label>
            <input
              className="sidebar-input-full"
              type="text"
              value={seo.favicon}
              onChange={e => {
                setSeo({ ...seo, favicon: e.target.value })
                page.seo = seo
                updatePage(_.cloneDeep(page))
              }}
            />
          </div>
          <div className="sidebar-fieldset-full">
            <label className="sidebar-label">Canonical URL</label>
            <input
              className="sidebar-input-full"
              type="text"
              value={seo.url}
              onChange={e => {
                setSeo({ ...seo, url: e.target.value })
                page.seo = seo
                updatePage(_.cloneDeep(page))
              }}
            />
          </div>
        </div>
      )}
    </>
  )
}
