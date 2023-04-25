/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

import { useState, useEffect, Suspense } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { FaTimes, FaRegTrashAlt, FaCopy } from 'react-icons/fa'
import { BiCopyAlt } from 'react-icons/bi'
import _, { set } from 'lodash'
import findById from '@/utils/findById'
import findTypeById from '@/utils/findTypeById'
import getIndexesById from '@/utils/getIndexesById'
import { ChromePicker } from 'react-color'
import dynamic from 'next/dynamic'
import SearchStyles from './SearchStyles'

export default function Panel({ page, close, selectedId, updatePage }) {
  const [styles, setStyles] = useState({})
  const [properties, setProperties] = useState({})
  const [selectedType, setSelectedType] = useState()
  const [selectedStyle, setSelectedStyle] = useState()
  const [items, setItems] = useState([])
  const [mainTab, setMainTab] = useState('styles')
  const [secondaryTab, setSecondaryTab] = useState('default')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/css-properties')
        if (!response.ok) {
          console.error('Failed to fetch data')
        }
        const data = await response.json()
        setItems(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const currentElement = findById(selectedId, page.data.styles.sections)
    const type = findTypeById(selectedId, page.data.styles.sections)
    if (currentElement) {
      setStyles(currentElement.style)
      setProperties(currentElement.properties)
      setSelectedType(type)
    }
  }, [selectedId])

  useEffect(() => {
    if (!selectedId) {
      setStyles(page.data.styles.body)
      setProperties({})
      setSelectedType('body')
    }
  }, [])

  const handlePropertyChange = event => {
    const { name, value } = event.target
    const newProperties = { ...properties, [name]: processCssProperty({ name, value }) }

    if (shouldAppendPX({ name, value })) {
      setTimeout(() => {
        moveCaretBackTwoChars()
      }, 0)
    }

    setProperties(newProperties)
    handlePropertiesSave(newProperties)
  }

  const handleChange = event => {
    const { name, value } = event.target
    const newStyles = { ...styles, [name]: processCssProperty({ name, value }) }

    if (shouldAppendPX({ name, value })) {
      setTimeout(() => {
        moveCaretBackTwoChars()
      }, 0)
    }

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

  const handlePropertiesSave = newProperties => {
    if (selectedId) {
      const currentElement = getIndexesById(selectedId, page.data.styles.sections)
      const type = findTypeById(selectedId, page.data.styles.sections)

      if (type === 'section') {
        page.data.styles.sections[currentElement.sectionIndex].properties = newProperties
      } else if (type === 'row') {
        page.data.styles.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].properties =
          newProperties
      } else if (type === 'column') {
        page.data.styles.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].columns[
          currentElement.columnIndex
        ].properties = newProperties
      } else if (type === 'element') {
        page.data.styles.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].columns[
          currentElement.columnIndex
        ].elements[currentElement.elementIndex].properties = newProperties
      }
    }

    updatePage(_.cloneDeep(page))
  }

  const numericCSSProperties = [
    'animation-iteration-count',
    'border-image-slice',
    'border-image-width',
    'column-count',
    'counter-increment',
    'counter-reset',
    'flex',
    'flex-grow',
    'flex-shrink',
    'font-size-adjust',
    'font-weight',
    'line-height',
    'nav-index',
    'opacity',
    'order',
    'orphans',
    'tab-size',
    'widows',
    'z-index',
  ]

  function moveCaretBackTwoChars() {
    const activeElement = document.activeElement

    if (activeElement.tagName.toLowerCase() === 'input') {
      const currentPosition = activeElement.selectionStart
      const newPosition = Math.max(0, currentPosition - 2)
      activeElement.setSelectionRange(newPosition, newPosition)
    }
  }

  function processCssProperty(obj) {
    if (!obj || typeof obj.name !== 'string' || typeof obj.value === 'undefined') {
      return null
    }

    if (numericCSSProperties.includes(obj.name)) {
      return obj.value
    }

    const numericValue = parseFloat(obj.value)
    if (!isNaN(numericValue) && numericValue.toString() === obj.value) {
      return `${obj.value}px`
    }

    return obj.value
  }

  function shouldAppendPX(obj) {
    if (numericCSSProperties.includes(obj.name)) {
      return false
    }

    const numericValue = parseFloat(obj.value)
    if (!isNaN(numericValue) && numericValue.toString() === obj.value) {
      return true
    }

    return false
  }

  const renderInputs = () => {
    const makeLabelPretty = key => {
      return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
    }

    if (styles) {
      return Object.entries(styles).map(([key, value]) => {
        const singleItem = items.filter(item => item.name === key)[0]
        const options = singleItem?.options
        let selectBox = null
        if (options && options[0] !== 'value') {
          selectBox = (
            <select className="sidebar-input" name={key} id={key} value={value} onChange={handleChange}>
              {options.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )
        }

        return (
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

            {selectBox && selectBox}

            {!selectBox && (
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
        )
      })
    }
  }

  const renderPropertyInputs = () => {
    const makeLabelPretty = key => {
      return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
    }

    if (styles) {
      return Object.entries(properties).map(([key, value]) => {
        return (
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

            <input
              className="sidebar-input"
              type="text"
              id={key}
              name={key}
              value={value}
              onChange={handlePropertyChange}
            />
          </div>
        )
      })
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
          if (el.querySelector('input')) {
            el.querySelector('input').focus()
          }
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

          <div className="space-x-3 flex items-center">
            <button onClick={close} data-tooltip-id="tooltip" data-tooltip-content="Duplicate">
              <BiCopyAlt />
            </button>
            <button onClick={close} data-tooltip-id="tooltip" data-tooltip-content="Delete">
              <FaRegTrashAlt />
            </button>
            <button onClick={close}>
              <AiOutlineCloseCircle />
            </button>
          </div>
        </div>
      )}
      <div className="px-3">
        <div className="border border-slate-300 rounded text-slate-700 items-center font-bold flex justify-evenly overflow-hidden">
          <div
            onClick={() => {
              setMainTab('styles')
            }}
            className={`text-sm p-2 cursor-pointer w-full text-center hover:bg-orange-100 hover:text-orange-800 border-r border-slate-300 ${
              mainTab === 'styles' ? 'bg-slate-100' : ''
            }`}
          >
            Styles
          </div>
          <div
            onClick={() => {
              setMainTab('properties')
            }}
            className={`text-sm p-2 cursor-pointer w-full text-center hover:bg-orange-100 hover:text-orange-800 ${
              mainTab === 'properties' ? 'bg-slate-100' : ''
            }`}
          >
            Properties
          </div>
        </div>
      </div>

      {mainTab === 'styles' && (
        <>
          <div className="px-3 pt-3">
            <div className="border border-slate-300 rounded text-slate-700 items-center font-bold flex justify-evenly overflow-hidden">
              <div
                onClick={() => {
                  setSecondaryTab('default')
                }}
                className="text-xs p-2 cursor-pointer w-full text-center hover:bg-orange-100 hover:text-orange-800 bg-slate-100 border-r border-slate-300"
              >
                Default
              </div>
              <div
                onClick={() => {
                  setSecondaryTab('hover')
                }}
                className="text-xs p-2 cursor-pointer w-full text-center hover:bg-orange-100 hover:text-orange-800"
              >
                Hover
              </div>
              <div
                onClick={() => {
                  setSecondaryTab('mobile')
                }}
                className="text-xs p-2 cursor-pointer w-full text-center hover:bg-orange-100 hover:text-orange-800"
              >
                Mobile
              </div>
            </div>
          </div>
          <div className="text-sm py-3 px-3 pb-2 text-slate-700 relative" style={{ zIndex: 99999999 }}>
            <SearchStyles
              onChange={value => {
                setSelectedStyle(value)
                addStyle(value)
              }}
              items={items}
            />
          </div>
          <div className="pb-8">{renderInputs()}</div>
        </>
      )}
      {mainTab === 'properties' && (
        <>
          <div className="pb-8 pt-3">{renderPropertyInputs()}</div>
        </>
      )}
    </>
  )
}
