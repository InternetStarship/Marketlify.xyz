import { useState, useEffect } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { cloneDeep } from 'lodash'
import Panel from '../Panel/Panel'

export default function Settings({ state }) {
  const [tab, setTab] = useState('seo')
  const [seo, setSeo] = useState({})

  useEffect(() => {
    setSeo(state.page.data.get().seo)
  }, [])

  const quickSave = () => {
    const page = JSON.stringify(cloneDeep(state.page.get()))
    localStorage.setItem(`marketlify_v4_page_${state.page.id.get()}`, page)
  }

  return (
    <>
      <div className="text-xl py-4 px-3 text-slate-800 flex items-center justify-between font-bold">
        <h3 className="capitalize">Page Settings</h3>
        <button
          onClick={() => {
            state.active.current.set('')
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

      {tab === 'styles' && <Panel state={state} />}

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
                state.page.data.seo.title.set(e.target.value)
                quickSave()
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
                state.page.data.seo.description.set(e.target.value)
                quickSave()
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
                state.page.data.seo.image.set(e.target.value)
                quickSave()
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
                state.page.data.seo.favicon.set(e.target.value)
                quickSave()
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
                state.page.data.seo.url.set(e.target.value)
                quickSave()
              }}
            />
          </div>
        </div>
      )}
    </>
  )
}
