/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

import { useState, useEffect, Suspense } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { FaTimes } from 'react-icons/fa'
import _ from 'lodash'
import findById from '@/utils/findById'
import findTypeById from '@/utils/findTypeById'
import getIndexesById from '@/utils/getIndexesById'
import { ChromePicker } from 'react-color'
import dynamic from 'next/dynamic'
import SearchStyles from './SearchStyles'

export default function Panel({ page, close, selectedId, updatePage }) {
  const [styles, setStyles] = useState({})
  const [selectedType, setSelectedType] = useState()
  const [selectedStyle, setSelectedStyle] = useState()

  useEffect(() => {
    const currentElement = findById(selectedId, page.data.styles.sections)
    const type = findTypeById(selectedId, page.data.styles.sections)
    if (currentElement) {
      setStyles(currentElement.style)
      setSelectedType(type)
    }
  }, [selectedId])

  useEffect(() => {
    if (!selectedId) {
      setStyles(page.data.styles.body)
      setSelectedType('body')
    }
  }, [])

  const handleChange = event => {
    const { name, value } = event.target
    const newStyles = { ...styles, [name]: value }
    setStyles(newStyles)
    handleSave(newStyles)
  }

  const handleColorChange = color => {
    let newStyles = {
      ...styles,
      color: color.hex,
    }
    if (color.rgb.a) {
      newStyles = {
        ...styles,
        color: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`,
      }
    }

    setStyles(newStyles)
    handleSave(newStyles)
  }

  const handleFontChange = font => {
    const newStyles = { ...styles, ['fontFamily']: font }
    setStyles(newStyles)
    handleSave(newStyles)
  }

  const handleSave = newStyles => {
    if (selectedId) {
      const currentElement = getIndexesById(selectedId, page.data.styles.sections)
      const type = findTypeById(selectedId, page.data.styles.sections)

      if (type === 'section') {
        page.data.styles.sections[currentElement.sectionIndex].style = newStyles
      } else if (type === 'row') {
        page.data.styles.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].style = newStyles
      } else if (type === 'column') {
        page.data.styles.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].columns[
          currentElement.columnIndex
        ].style = newStyles
      } else if (type === 'element') {
        page.data.styles.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].columns[
          currentElement.columnIndex
        ].elements[currentElement.elementIndex].style = newStyles
      }
    } else {
      page.data.styles.body = newStyles
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
            {makeLabelPretty(key)}
            <div
              onClick={() => {
                removeStyle(key)
              }}
            >
              <FaTimes />
            </div>
          </label>

          {/* {(key.includes('color') || key.includes('Color')) && (
            <div className="absolute right-0 top-0" style={{ zIndex: 99999 }}>
              <ChromePicker color={value} onChange={handleColorChange} />
            </div>
          )} */}

          {/* {key === 'fontFamily' && (
            <Suspense fallback={`Loading...`}>
              <FontPicker
                apiKey="AIzaSyDmA_8khp5uXnodcvRmyyaNdmLnI_2gvQk"
                activeFontFamily={'Roboto'}
                onChange={nextFont => {
                  handleFontChange(nextFont.family)
                }}
              />
            </Suspense>
          )} */}

          {key !== 'fontFamily' && (
            <input
              className="sidebar-input"
              type="text"
              id={key}
              name={key}
              value={value}
              onChange={handleChange}
            />
          )}
        </div>
      ))
    }
  }

  function addStyle(selectedStyle) {
    const newStyles = _.cloneDeep(styles)
    if (!newStyles[selectedStyle]) {
      newStyles[selectedStyle] = ''
    }
    setStyles(newStyles)
    handleSave(newStyles)
    setSelectedStyle('')
    setTimeout(() => {
      document.querySelector('.clear-icon').click()
      document.querySelectorAll('#sidebar .sidebar-fieldset').forEach(el => {
        const name = camelCaseToTitleCase(selectedStyle)
        const text = el.innerText.toLowerCase()
        if (text.includes(name.toLowerCase())) {
          el.scrollIntoView({ behavior: 'smooth' })
          el.querySelector('input').focus()
        }
      })
    }, 100)
  }

  function removeStyle(key) {
    const newStyles = _.cloneDeep(styles)
    delete newStyles[key]
    setStyles(newStyles)
    handleSave(newStyles)
  }

  function camelCaseToTitleCase(camelCaseStr) {
    let titleCaseStr = camelCaseStr.replace(/([A-Z])/g, ' $1').toLowerCase()
    titleCaseStr = titleCaseStr.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())

    return titleCaseStr
  }

  return (
    <>
      {selectedId && (
        <div className="text-xl py-4 px-3 text-slate-800 flex items-center justify-between font-bold">
          <h3 className="capitalize">{selectedType}</h3>
          <button onClick={close}>
            <AiOutlineCloseCircle />
          </button>
        </div>
      )}
      <div className="px-3">
        <div className="border border-slate-300 rounded text-slate-700 items-center font-bold flex justify-evenly overflow-hidden">
          <div className="text-sm p-2 cursor-pointer w-full text-center hover:bg-orange-100 hover:text-orange-800 bg-slate-100 border-r border-slate-300">
            Styles
          </div>
          <div className="text-sm p-2 cursor-pointer w-full text-center hover:bg-orange-100 hover:text-orange-800">
            Properties
          </div>
        </div>
      </div>
      <div className="text-sm py-3 px-3 pb-2 text-slate-700 relative" style={{ zIndex: 99999999 }}>
        <SearchStyles
          onChange={value => {
            setSelectedStyle(value)
            addStyle(value)
          }}
        />
      </div>
      <div>{renderInputs()}</div>
    </>
  )
}
