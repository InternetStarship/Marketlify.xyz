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

  function getIndexesById(id, sections) {
    for (let sectionIndex = 0; sectionIndex < sections.length; sectionIndex++) {
      const section = sections[sectionIndex]
      if (section.id === id) {
        return { sectionIndex, rowIndex: -1, columnIndex: -1, elementIndex: -1 }
      }

      const rows = section.rows
      for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
        const row = rows[rowIndex]
        if (row.id === id) {
          return { sectionIndex, rowIndex, columnIndex: -1, elementIndex: -1 }
        }

        const columns = row.columns
        for (let columnIndex = 0; columnIndex < columns.length; columnIndex++) {
          const column = columns[columnIndex]
          if (column.id === id) {
            return { sectionIndex, rowIndex, columnIndex, elementIndex: -1 }
          }

          const elements = column.elements
          for (let elementIndex = 0; elementIndex < elements.length; elementIndex++) {
            const element = elements[elementIndex]
            if (element.id === id) {
              return { sectionIndex, rowIndex, columnIndex, elementIndex }
            }
          }
        }
      }
    }

    return null
  }

  function findTypeById(id, sections) {
    for (const section of sections) {
      if (section.id === id) {
        return 'section'
      }

      const rows = section.rows
      for (const row of rows) {
        if (row.id === id) {
          return 'row'
        }

        const columns = row.columns
        for (const column of columns) {
          if (column.id === id) {
            return 'column'
          }

          const elements = column.elements
          for (const element of elements) {
            if (element.id === id) {
              return 'element'
            }
          }
        }
      }
    }

    return null
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
