import { useState, useEffect, useCallback } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { FaRegTrashAlt } from 'react-icons/fa'
import { BiCopyAlt } from 'react-icons/bi'
import { css } from '@codemirror/lang-css'
import { debounce } from 'lodash'
import { findById } from '@/utils/findById'
import { findTypeById } from '@/utils/findTypeById'
import { duplicate } from '@/utils/duplicate'
import { remove } from '@/utils/remove'
import { renderPropertyInputs } from '@/utils/renderPropertyInputs'
import { renderStyleInputs } from '@/utils/renderStyleInputs'
import { updateCSS } from '@/utils/updateCSS'
import { buildCSS } from '@/utils/buildCSS'
import { addStyle } from '@/utils/addStyle'
import cssProperties from '@/utils/cssProperties'
import CodeMirror from '@uiw/react-codemirror'
import SearchStyles from './SearchStyles'

export default function Panel({ page, close, selectedId, updatePage, updateCurrent }) {
  const [styles, setStyles] = useState({})
  const [properties, setProperties] = useState({})
  const [selectedType, setSelectedType] = useState()
  const [allCSSProperties] = useState(cssProperties)
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

  const debouncedUpdateCSS = useCallback(
    debounce(value => {
      setCodeBox(value)
      updateCSS(value, codeBox, secondaryTab, selectedId, page, updatePage, setStyles)
    }, 1300),
    [codeBox, secondaryTab, selectedId, page, updatePage, setStyles]
  )

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
                addStyle(value, styles, setStyles, selectedId, page, updatePage)
              }}
              allCSSProperties={allCSSProperties}
              showCSS={showCSS}
              setShowCSS={() => {
                setShowCSS(!showCSS)
                if (showCSS) {
                  updateCSS(null, codeBox, secondaryTab, selectedId, page, updatePage, setStyles)
                }
              }}
            />
          </div>
          {!showCSS && (
            <div className="pb-8">
              {renderStyleInputs(
                styles,
                setStyles,
                updatePage,
                page,
                selectedId,
                showColorPicker,
                setShowColorPicker,
                filteredFonts,
                setFilteredFonts
              )}
            </div>
          )}
          {showCSS && (
            <>
              <div className="pb-8 px-3 pt-3">
                <div className="border rounded shadow overflow-hidden">
                  <CodeMirror
                    value={buildCSS(secondaryTab, styles)}
                    height="450px"
                    extensions={[css()]}
                    onChange={debouncedUpdateCSS}
                  />
                </div>
              </div>
            </>
          )}
        </>
      )}
      {mainTab === 'properties' && (
        <>
          <div className="pb-8 pt-3">
            {renderPropertyInputs(styles, properties, setProperties, updatePage, page, selectedId)}
          </div>
        </>
      )}
    </>
  )
}
