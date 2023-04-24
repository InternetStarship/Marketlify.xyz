/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

import Popup from '@/components/Popup'
import { useState } from 'react'

export default function CustomCode({ page, updatePage }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [code, setCode] = useState('')
  const [type, setType] = useState('head')

  return (
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
          setCode(page.data.code.head)
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
          setCode(page.data.code.body)
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
          setCode(page.data.code.css)
        }}
        className="page-modal-close-button"
      >
        Edit CSS
      </button>

      {modalOpen && (
        <Popup title="Edit Head Code" closeOverride={() => setModalOpen(false)} open={modalOpen}>
          <textarea
            className="w-full border"
            onChange={e => {
              if (type === 'head') {
                page.data.code.head = e.target.value
              } else if (type === 'body') {
                page.data.code.body = e.target.value
              } else if (type === 'css') {
                page.data.code.css = e.target.value
              }
              setCode(e.target.value)
            }}
          >
            {code}
          </textarea>
        </Popup>
      )}
    </div>
  )
}
