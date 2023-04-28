import dynamic from 'next/dynamic'
import { useState, useEffect, Suspense, useCallback } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { FaTimes, FaRegTrashAlt } from 'react-icons/fa'
import { IoColorPaletteOutline } from 'react-icons/io5'
import { HiOutlineSearchCircle } from 'react-icons/hi'
import { BiCopyAlt } from 'react-icons/bi'
import { SketchPicker } from 'react-color'
import { css } from '@codemirror/lang-css'
import { cloneDeep, debounce } from 'lodash'
import { findById } from '@/utils/findById'
import { findTypeById } from '@/utils/findTypeById'
import { getIndexesById } from '@/utils/getIndexesById'
import { getContrastColor } from '@/utils/getContrastColor.js'
import { duplicate } from '@/utils/duplicate'
import { remove } from '@/utils/remove'
import { camelCaseToTitleCase } from '@/utils/camelCaseToTitleCase'
import cssProperties from '@/utils/cssProperties'
import googleFonts from '@/utils/googleFonts'
import CodeMirror from '@uiw/react-codemirror'
import SearchStyles from './SearchStyles'

const FontPicker = dynamic(() => import('font-picker-react'), {
  suspense: true,
  ssr: false,
})

export default function Panel({ page, close, selectedId, updatePage, updateCurrent }) {
  const [styles, setStyles] = useState({})
  const [properties, setProperties] = useState({})
  const [selectedType, setSelectedType] = useState()
  const [allCSSProperties] = useState(cssProperties)
  const [allFonts] = useState(googleFonts)
  const [mainTab, setMainTab] = useState('styles')
  const [secondaryTab, setSecondaryTab] = useState('default')
  const [existingIds] = useState(new Set())
  const [showCSS, setShowCSS] = useState(false)
  const [codeBox, setCodeBox] = useState('')
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [filteredFonts, setFilteredFonts] = useState([])

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

    updatePage(cloneDeep(page))
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

    updatePage(cloneDeep(page))
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
        const singleItem = allCSSProperties.filter(item => item.name === key)[0]
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
                    showColorPicker === key ? 'text-blue-600' : 'text-slate-300'
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
                      className="absolute left-0 top-0"
                      style={{ zIndex: 99999, left: '0', top: '-19px', width: 125 }}
                    >
                      <input
                        defaultValue=""
                        type="text"
                        className="sidebar-input full"
                        placeholder="Search fonts..."
                        style={{ width: 125 }}
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
                        <div
                          className="p-1 text-xs text-slate-500 bg-white rounded shadow overflow-y-auto"
                          style={{ maxHeight: 200 }}
                        >
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
                <div style={{ width: 245, height: 38 }}>
                  {showColorPicker !== key && (
                    <Suspense fallback={`Loading...`}>
                      <FontPicker
                        apiKey="AIzaSyDmA_8khp5uXnodcvRmyyaNdmLnI_2gvQk"
                        activeFontFamily={value}
                        onChange={nextFont => {
                          handleFontChange(nextFont.family)
                        }}
                        families={allFonts}
                        limit={50}
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
                    showColorPicker === key ? 'text-blue-600' : 'text-slate-300'
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
    const newStyles = cloneDeep(styles)
    if (!newStyles[selectedStyle]) {
      newStyles[selectedStyle] = ''
    }
    setStyles(newStyles)
    handleSave(newStyles)
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
    const newStyles = cloneDeep(styles)
    delete newStyles[key]
    setStyles(newStyles)
    handleSave(newStyles)
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

  function updateCSS(value = null) {
    let codes = codeBox
    if (!codes) {
      codes = buildCSS(secondaryTab)
    }
    if (value) {
      codes = value
    }
    const cssProps = codes
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
    updateCSS(value)
  }, [])

  const debouncedUpdateCodeBox = debounce(updateCodeBox, 1300)

  return (
    <>
      {selectedId && (
        <div className="text-xl py-4 px-3 text-slate-800 flex items-center justify-between font-bold">
          <h3 className="capitalize">{selectedType}</h3>

          <div className="space-x-3 flex items-center">
            <button
              onClick={() => {
                duplicate(
                  page => {
                    updatePage(page)
                    updateCurrent('')
                  },
                  page,
                  selectedId,
                  existingIds
                )
              }}
              data-tooltip-id="tooltip"
              data-tooltip-content="Duplicate"
            >
              <BiCopyAlt />
            </button>
            <button
              onClick={() => {
                remove(
                  page => {
                    updatePage(page)
                    updateCurrent('')
                  },
                  page,
                  selectedId
                )
              }}
              data-tooltip-id="tooltip"
              data-tooltip-content="Delete"
            >
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
                addStyle(value)
              }}
              allCSSProperties={allCSSProperties}
              showCSS={showCSS}
              setShowCSS={() => {
                setShowCSS(!showCSS)
                if (showCSS) {
                  updateCSS()
                }
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
                    height="450px"
                    extensions={[css()]}
                    onChange={debouncedUpdateCodeBox}
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
