import { FaTimes } from 'react-icons/fa'
import { IoColorPaletteOutline } from 'react-icons/io5'
import { HiOutlineSearchCircle } from 'react-icons/hi'
import { SketchPicker } from 'react-color'
import { updateStyles } from '@/utils/style/updateStyles'
import { getContrastColor } from '@/utils/utility/getContrastColor.js'
import { handleColorChange } from '@/utils/style/handleColorChange'
import { handleFontChange } from '@/utils/googleFonts/handleFontChange'
import { handleStyleChange } from '@/utils/style/handleStyleChange'
import { removeStyle } from '@/utils/style/removeStyle'
import { prettyLabel } from '@/utils/utility/prettyLabel'
import { Suspense, useState } from 'react'
import googleFonts from '@/utils/googleFonts/googleFonts'
import cssProperties from '@/utils/css/cssProperties'
import dynamic from 'next/dynamic'

const FontPicker = dynamic(() => import('font-picker-react'), {
  suspense: true,
  ssr: false,
})

export function renderStyleInputs(
  styles,
  setStyles,
  updatePage,
  page,
  selectedId,
  showColorPicker,
  setShowColorPicker,
  filteredFonts,
  setFilteredFonts
) {
  if (styles) {
    return Object.entries(styles).map(([key, value]) => {
      const singleItem = cssProperties.filter(item => item.name === key)[0]
      const options = singleItem?.options
      let selectBox = null
      if (options && options[0] !== 'value') {
        selectBox = (
          <select
            className="sidebar-input"
            name={key}
            id={key}
            value={value}
            onChange={() => {
              handleStyleChange(event, styles, setStyles, newStyles => {
                updateStyles(newStyles, selectedId, page, updatePage)
              })
            }}
          >
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
            {prettyLabel(key)}
            <div
              onClick={() => {
                removeStyle(key, styles, setStyles, selectedId, page, updatePage)
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
                        const filteredFontsNew = googleFonts.filter(font => {
                          return font.toLowerCase().includes(value.toLowerCase())
                        })
                        const uniqueFonts = [...new Set(filteredFontsNew)]
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
                                handleFontChange(font, styles, setStyles, newStyles => {
                                  updateStyles(newStyles, selectedId, page, updatePage)
                                })
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
                        handleFontChange(nextFont.family, styles, setStyles, newStyles => {
                          updateStyles(newStyles, selectedId, page, updatePage)
                        })
                      }}
                      families={googleFonts}
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
                        handleColorChange(value, key, styles, setStyles, newStyles => {
                          updateStyles(newStyles, selectedId, page, updatePage)
                        })
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
              onChange={() => {
                handleStyleChange(event, styles, setStyles, newStyles => {
                  updateStyles(newStyles, selectedId, page, updatePage)
                })
              }}
            />
          )}
        </div>
      )
    })
  }
}
