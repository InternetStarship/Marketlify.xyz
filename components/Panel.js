/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

import { useState, useEffect } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import _ from 'lodash'

export default function Panel({ page, close, selectedId, updatePage }) {
  const [styles, setStyles] = useState({})
  const [selectedType, setSelectedType] = useState()

  useEffect(() => {
    if (styles) {
      const currentElement = findById(selectedId, page.sections)
      currentElement.style = _.cloneDeep(styles)

      updatePage(page)
    }
  }, [styles])

  useEffect(() => {
    const currentElement = findById(selectedId, page.sections)
    if (currentElement) {
      setStyles(currentElement.style)
      setSelectedType(currentElement.type)
    }
  }, [selectedId])

  const handleChange = event => {
    const { name, value } = event.target
    setStyles({ ...styles, [name]: value })
  }

  const renderInputs = () => {
    const makeLabelPretty = key => {
      return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
    }

    if (styles) {
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
  }

  function findById(id, obj = sections) {
    if (Array.isArray(obj)) {
      for (const item of obj) {
        const result = findById(id, item)
        if (result) return _.cloneDeep(result)
      }
    } else if (typeof obj === 'object') {
      if (obj.id === id) return _.cloneDeep(obj)

      for (const key in obj) {
        const result = findById(id, obj[key])
        if (result) return _.cloneDeep(result)
      }
    }

    return null
  }

  return (
    <>
      <div className="text-lg flex items-center justify-between font-bold mb-6">
        <h3>Editing {selectedType}</h3>
        <button className="text-slate-500" onClick={close}>
          <AiOutlineCloseCircle />
        </button>
      </div>
      {renderInputs()}
    </>
  )
}
