/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

import { useState, useEffect } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'

export default function Panel({ page, close, selectedId, updatePage }) {
  const [styles, setStyles] = useState({
    color: '#6A9FB5',
    fontFamily: 'sans-serif',
    fontSize: '48px',
    fontWeight: 400,
    fontStyle: 'normal',
    textDecoration: 'none',
    textAlign: 'left',
    lineHeight: 1.5,
    letterSpacing: 0, // test
  })

  useEffect(() => {
    const currentElement = findById(selectedId, page.sections)
    currentElement.style = styles
    updatePage(page)
  }, [styles])

  const handleChange = event => {
    const { name, value } = event.target
    setStyles({ ...styles, [name]: value })
  }

  const renderInputs = () => {
    const makeLabelPretty = key => {
      return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
    }

    return Object.entries(styles).map(([key, value]) => (
      <div key={key} className="sidebar-fieldset">
        <label className="sidebar-label" htmlFor={key}>
          {makeLabelPretty(key)}:
        </label>
        <input
          className="sidebar-input"
          type="text"
          id={key}
          name={key}
          value={value}
          onChange={handleChange}
        />
      </div>
    ))
  }

  function findById(id, obj = sections) {
    if (Array.isArray(obj)) {
      for (const item of obj) {
        const result = findById(id, item)
        if (result) return result
      }
    } else if (typeof obj === 'object') {
      if (obj.id === id) return obj

      for (const key in obj) {
        const result = findById(id, obj[key])
        if (result) return result
      }
    }

    return null
  }

  return (
    <>
      <div className="text-lg flex items-center justify-between font-bold mb-6">
        <h3>Editing [page type]</h3>
        <button className="text-slate-500" onClick={close}>
          <AiOutlineCloseCircle />
        </button>
      </div>
      {renderInputs()}
    </>
  )
}
