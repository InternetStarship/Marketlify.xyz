/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

import { useState, useEffect, Suspense, useCallback } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { FaTimes, FaRegTrashAlt, FaCopy } from 'react-icons/fa'
import { BiCopyAlt } from 'react-icons/bi'
import _, { set } from 'lodash'
import findById from '@/utils/findById'
import findTypeById from '@/utils/findTypeById'
import getIndexesById from '@/utils/getIndexesById'
import generateUniqueId from '@/utils/generateUniqueId'
import { SketchPicker } from 'react-color'
import dynamic from 'next/dynamic'
import SearchStyles from './SearchStyles'
import CodeMirror from '@uiw/react-codemirror'
import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'
import { IoColorPaletteOutline } from 'react-icons/io5'
import { HiOutlineSearchCircle } from 'react-icons/hi'
import { getContrastColor } from '@/utils/getContrastColor.js'
const FontPicker = dynamic(() => import('font-picker-react'), {
  suspense: true,
  ssr: false,
})

export default function Panel({ page, close, selectedId, updatePage, updateCurrent }) {
  const [styles, setStyles] = useState({})
  const [properties, setProperties] = useState({})
  const [selectedType, setSelectedType] = useState()
  const [selectedStyle, setSelectedStyle] = useState()
  const [items, setItems] = useState([])
  const [mainTab, setMainTab] = useState('styles')
  const [secondaryTab, setSecondaryTab] = useState('default')
  const [existingIds] = useState(new Set())
  const [showCSS, setShowCSS] = useState(false)
  const [codeBox, setCodeBox] = useState('')
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [allFonts, setAllFonts] = useState([])
  const [filteredFonts, setFilteredFonts] = useState([])
  const [selectedFont, setSelectedFont] = useState('')

  useEffect(() => {
    page.data.styles.sections?.forEach(section => {
      existingIds.add(section.id)
      section.rows.forEach(row => {
        existingIds.add(row.id)
        row.columns.forEach(column => {
          existingIds.add(column.id)
          column.elements.forEach(element => {
            existingIds.add(element.id)
          })
        })
      })
    })

    getFontFamilies()
  }, [])

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

  const handleColorChange = (color, type) => {
    let newStyles = {
      ...styles,
      [type]: color.hex,
    }
    if (color.rgb.a) {
      newStyles = {
        ...styles,
        [type]: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`,
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

  function getFontFamilies() {
    fetch('/api/google-fonts')
      .then(response => response.json())
      .then(data => {
        setAllFonts(data)
      })
      .catch(error => console.error('Error fetching data:', error))
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

            {key === 'fontFamily' && (
              <>
                <div
                  className={`text-xl mr-2 ${
                    showColorPicker === key ? 'text-blue-600' : 'text-slate-400'
                  } hover:text-slate-800 cursor-pointer`}
                  onClick={() => {
                    if (showColorPicker === key) {
                      setShowColorPicker(null)
                    } else {
                      setShowColorPicker(key)
                    }
                    setFilteredFonts([])
                  }}
                >
                  <HiOutlineSearchCircle />
                </div>
                {showColorPicker === key && (
                  <div className="relative">
                    <div
                      className="absolute left-0 top-0 bg-white p-3 border border-slate-300 shadow-sm rounded"
                      style={{ zIndex: 99999, left: '0', top: '-10px', width: 200 }}
                    >
                      <input
                        defaultValue=""
                        type="text"
                        className="sidebar-input full"
                        placeholder="Search fonts..."
                        onChange={e => {
                          const value = e.target.value
                          const filteredFonts = allFonts.filter(font => {
                            return font.toLowerCase().includes(value.toLowerCase())
                          })
                          const uniqueFonts = [...new Set(filteredFonts)]
                          setFilteredFonts(uniqueFonts)
                        }}
                      />
                      {filteredFonts.length > 0 && (
                        <div className="py-1 text-xs text-slate-500">
                          {filteredFonts.map(font => {
                            return (
                              <div
                                key={font}
                                className="p-2 rounded cursor-pointer hover:text-orange-800 hover:bg-orange-100"
                                onClick={() => {
                                  handleFontChange(font)
                                  setShowColorPicker(null)
                                }}
                              >
                                {font}
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                )}
                <div style={{ width: 245 }}>
                  {showColorPicker !== key && (
                    <Suspense fallback={`Loading...`}>
                      <FontPicker
                        apiKey="AIzaSyDmA_8khp5uXnodcvRmyyaNdmLnI_2gvQk"
                        activeFontFamily={value}
                        onChange={nextFont => {
                          handleFontChange(nextFont.family)
                        }}
                        families={allFonts}
                        limit={100}
                      />
                    </Suspense>
                  )}
                </div>
              </>
            )}

            {selectBox && selectBox}

            {key.toLowerCase().includes('color') && (
              <>
                <div
                  className={`text-xl mr-2 ${
                    showColorPicker === key ? 'text-blue-600' : 'text-slate-400'
                  } hover:text-slate-800 cursor-pointer`}
                  onClick={() => {
                    if (showColorPicker === key) {
                      setShowColorPicker(null)
                    } else {
                      setShowColorPicker(key)
                    }
                  }}
                >
                  <IoColorPaletteOutline />
                </div>
                {showColorPicker === key && (
                  <div className="relative">
                    <div className="absolute left-0 top-0" style={{ zIndex: 99999, left: '0', top: '18px' }}>
                      <SketchPicker
                        color={value}
                        onChange={value => {
                          handleColorChange(value, key)
                        }}
                      />
                    </div>
                  </div>
                )}
              </>
            )}
            {!selectBox && key !== 'fontFamily' && (
              <input
                className="sidebar-input"
                style={{
                  background: key.toLowerCase().includes('color') ? value : '#fff',
                  color: key.toLowerCase().includes('color') ? getContrastColor(value) : '#222',
                  boxShadow: key.toLowerCase().includes('color') ? '0 0 0 1px #fff inset' : 'none',
                }}
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

  function remove() {
    const type = findTypeById(selectedId, page.data.styles.sections)
    const currentElement = getIndexesById(selectedId, page.data.styles.sections)
    const updatedPage = JSON.parse(JSON.stringify(page))

    switch (type) {
      case 'section':
        updatedPage.data.styles.sections.splice(currentElement.sectionIndex, 1)
        break

      case 'row':
        updatedPage.data.styles.sections[currentElement.sectionIndex].rows.splice(currentElement.rowIndex, 1)
        break

      case 'column':
        updatedPage.data.styles.sections[currentElement.sectionIndex].rows[
          currentElement.rowIndex
        ].columns.splice(currentElement.columnIndex, 1)
        break

      case 'element':
        updatedPage.data.styles.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].columns[
          currentElement.columnIndex
        ].elements.splice(currentElement.elementIndex, 1)

        break
    }

    updatePage(_.cloneDeep(updatedPage))
    updateCurrent('')
  }

  function duplicate() {
    const element = findById(selectedId, page.data.styles.sections)
    const type = findTypeById(selectedId, page.data.styles.sections)
    const currentElement = getIndexesById(selectedId, page.data.styles.sections)

    let newItem
    const newId = generateUniqueId(existingIds)

    switch (type) {
      case 'section':
        newItem = { ...element, id: newId }
        page.data.styles.sections.splice(currentElement.sectionIndex, 0, newItem)
        break

      case 'row':
        newItem = { ...element, id: newId }
        page.data.styles.sections[currentElement.sectionIndex].rows.splice(
          currentElement.rowIndex,
          0,
          newItem
        )
        break

      case 'column':
        newItem = { ...element, id: newId }
        page.data.styles.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].columns.splice(
          currentElement.columnIndex,
          0,
          newItem
        )
        break

      case 'element':
        newItem = { ...element, id: newId }
        page.data.styles.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].columns[
          currentElement.columnIndex
        ].elements.splice(currentElement.elementIndex, 0, newItem)

        const previousContent = page.data.content.find(content => content.id === selectedId)
        page.data.content.push({
          id: newId,
          content: previousContent.content,
          type: previousContent.type,
        })
        break
    }

    updatePage(_.cloneDeep(page))
    updateCurrent('')
  }

  const toKebabCase = str => str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()

  function buildCSS(type) {
    const cssProps = []

    Object.entries(styles).forEach(([key, value]) => {
      const cssKey = toKebabCase(key)
      cssProps.push(`${cssKey}: ${value};`)
    })

    let selector = ''
    switch (type) {
      case 'default':
        selector = '#element'
        break
      case 'hover':
        selector = '#element:hover'
        break
      case 'mobile':
        selector = '@media (max-width: 480px) {\n  #element'
        break
      default:
        return ''
    }

    return (
      `${selector} {\n` +
      cssProps.map(prop => `  ${prop}`).join('\n') +
      (type === 'mobile' ? '\n}' : '') +
      '\n}'
    )
  }

  function updateCSS() {
    const cssProps = codeBox
      .match(/{([^}]*)}/)[1]
      .trim()
      .split(';')

    const styleObj = {}
    cssProps.forEach(prop => {
      if (prop.trim() !== '') {
        const [key, value] = prop.split(':').map(item => item.trim())
        const camelCaseKey = key.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase())
        styleObj[camelCaseKey] = value
      }
    })

    setStyles(styleObj)
    handleSave(styleObj)
  }

  const updateCodeBox = useCallback((value, viewUpdate) => {
    setCodeBox(value)
  }, [])

  return (
    <>
      {selectedId && (
        <div className="text-xl py-4 px-3 text-slate-800 flex items-center justify-between font-bold">
          <h3 className="capitalize">{selectedType}</h3>

          <div className="space-x-3 flex items-center">
            <button onClick={duplicate} data-tooltip-id="tooltip" data-tooltip-content="Duplicate">
              <BiCopyAlt />
            </button>
            <button onClick={remove} data-tooltip-id="tooltip" data-tooltip-content="Delete">
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
              showCSS={showCSS}
              setShowCSS={() => {
                if (showCSS) {
                  updateCSS()
                }
                setShowCSS(!showCSS)
              }}
            />
          </div>
          {!showCSS && <div className="pb-8">{renderInputs()}</div>}
          {showCSS && (
            <>
              <div className="pb-8 px-3 pt-3">
                <div className="border rounded shadow overflow-hidden">
                  <CodeMirror
                    value={buildCSS(secondaryTab)}
                    height="250px"
                    extensions={[css()]}
                    onChange={updateCodeBox}
                  />
                </div>
              </div>
            </>
          )}
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
