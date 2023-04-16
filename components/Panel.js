/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

import { useState, useEffect } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import _ from 'lodash'
import findById from '@/utils/findById'
import findTypeById from '@/utils/findTypeById'
import getIndexesById from '@/utils/getIndexesById'

export default function Panel({ page, close, selectedId, updatePage }) {
  const [styles, setStyles] = useState({})
  const [selectedType, setSelectedType] = useState()

  useEffect(() => {
    const currentElement = findById(selectedId, page.sections)
    const type = findTypeById(selectedId, page.sections)
    if (currentElement) {
      setStyles(currentElement.style)
      setSelectedType(type)
    }
  }, [selectedId])

  const handleChange = event => {
    const { name, value } = event.target
    const newStyles = { ...styles, [name]: value }
    setStyles(newStyles)
    handleSave(newStyles)
  }

  const handleSave = newStyles => {
    const currentElement = getIndexesById(selectedId, page.sections)
    const type = findTypeById(selectedId, page.sections)

    if (type === 'section') {
      page.sections[currentElement.sectionIndex].style = newStyles
    } else if (type === 'row') {
      page.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].style = newStyles
    } else if (type === 'column') {
      page.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].columns[
        currentElement.columnIndex
      ].style = newStyles
    } else if (type === 'element') {
      page.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].columns[
        currentElement.columnIndex
      ].elements[currentElement.elementIndex].style = newStyles
    }

    updatePage(_.cloneDeep(page))
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

  return (
    <>
      <div className="text-xl flex items-center justify-between font-bold mb-4">
        <h3 className="capitalize">Editing {selectedType}</h3>
        <button className="text-slate-500" onClick={close}>
          <AiOutlineCloseCircle />
        </button>
      </div>
      {renderInputs()}
    </>
  )
}
