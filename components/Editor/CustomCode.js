import { useState, useCallback } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import CodeMirror from '@uiw/react-codemirror'
import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'
import Popup from '@/components/Popup/Popup'
import cloneDeep from 'lodash/cloneDeep'

export default function CustomCode({ state }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [code, setCode] = useState('')
  const [type, setType] = useState('head')

  const updateCode = useCallback((value, type) => {
    if (type === 'head') {
      state.page.data.code.head.set(value)
    } else if (type === 'body') {
      state.page.data.code.body.set(value)
    } else if (type === 'css') {
      state.page.data.code.css.set(value)
    }
    setCode(value)

    const page = JSON.stringify(cloneDeep(state.page.get()))
    localStorage.setItem(`marketlify_v4_page_${state.page.id.get()}`, page)
  }, [])

  return (
    <>
      <div className="text-xl py-4 px-3 text-slate-800 flex items-center justify-between font-bold">
        <h3 className="capitalize">Custom Code</h3>
        <button
          onClick={() => {
            state.active.current.set('')
          }}
        >
          <AiOutlineCloseCircle />
        </button>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold mb-1">Head Code</h3>
        <p className="text-sm text-slate-500 mb-3">
          The head code is loaded first before the page and is placed inside of the <code>head</code> HTML
          element. Usually best for fonts, etc.
        </p>
        <button
          onClick={() => {
            setType('head')
            setCode(cloneDeep(state.page.data.code.head.get()))
            setModalOpen(true)
          }}
          className="page-modal-close-button"
        >
          Edit Head Code
        </button>

        <h3 className="text-lg font-bold mb-1 mt-6">Body Code</h3>
        <p className="text-sm text-slate-500 mb-3">
          The body code is loaded whith the page and is placed inside of the <code>body</code> HTML element.
          Usually best for tracking codes, JS scripts, etc.
        </p>
        <button
          onClick={() => {
            setType('body')
            setCode(cloneDeep(state.page.data.code.body.get()))
            setModalOpen(true)
          }}
          className="page-modal-close-button"
        >
          Edit Body Code
        </button>

        <h3 className="text-lg font-bold mb-1 mt-6">Custom CSS</h3>
        <p className="text-sm text-slate-500 mb-3">
          The CSS is placed inside of <code>style</code> html element inside of the <code>head</code> on your
          page.
        </p>
        <button
          onClick={() => {
            setType('css')
            setCode(cloneDeep(state.page.data.code.css.get()))
            setModalOpen(true)
          }}
          className="page-modal-close-button"
        >
          Edit CSS
        </button>

        {modalOpen && (
          <Popup title={`Edit ${type} Code`} closeOverride={() => setModalOpen(false)} open={modalOpen}>
            <div className="border rounded shadow overflow-hidden">
              <CodeMirror
                value={code}
                height="400px"
                extensions={type === 'css' ? [css()] : [html()]}
                onChange={value => {
                  updateCode(value, type)
                }}
              />
            </div>
          </Popup>
        )}
      </div>
    </>
  )
}
