import { useState, useCallback } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import CodeMirror from '@uiw/react-codemirror'
import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'
import Popup from '@/components/Popup/Popup'

export default function CustomCode({ state }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [code, setCode] = useState('')
  const [type, setType] = useState('head')

  const onChange = useCallback(value => {
    if (type === 'head') {
      state.page.data.get().code.head = value
    } else if (type === 'body') {
      state.page.data.get().code.body = value
    } else if (type === 'css') {
      state.page.data.get().code.css = value
    }
    setCode(value)
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
            setModalOpen(true)
            setType('head')
            setCode(state.page.data.get().code.head)
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
            setModalOpen(true)
            setType('body')
            setCode(state.page.data.get().code.body)
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
            setModalOpen(true)
            setType('css')
            setCode(state.page.data.get().code.css)
          }}
          className="page-modal-close-button"
        >
          Edit CSS
        </button>

        {modalOpen && (
          <Popup title="Edit Head Code" closeOverride={() => setModalOpen(false)} open={modalOpen}>
            <div className="border rounded shadow overflow-hidden">
              <CodeMirror
                value={code}
                height="400px"
                extensions={type === 'css' ? [css()] : [html()]}
                onChange={onChange}
              />
            </div>
          </Popup>
        )}
      </div>
    </>
  )
}
