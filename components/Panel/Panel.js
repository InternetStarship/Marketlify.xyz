import { useState, useEffect, useCallback } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { FaRegTrashAlt } from 'react-icons/fa'
import { BiCopyAlt } from 'react-icons/bi'
import { debounce } from 'lodash'
import { findById } from '@/utils/utility/findById'
import { findTypeById } from '@/utils/utility/findTypeById'
import { duplicate } from '@/utils/editor/duplicate'
import { remove } from '@/utils/editor/remove'
import { renderPropertyInputs } from '@/utils/panel/renderPropertyInputs'
import { renderStyleInputs } from '@/utils/panel/renderStyleInputs'
import { updateCSS } from '@/utils/css/updateCSS'
import { buildCSS } from '@/utils/css/buildCSS'
import { addStyle } from '@/utils/style/addStyle'
import cssProperties from '@/utils/css/cssProperties'
import CodeMirror from '@uiw/react-codemirror'
import { css } from '@codemirror/lang-css'
import SearchStyles from './SearchStyles'

export default function Panel({ state }) {
  const [styles, setStyles] = useState({})
  const [properties, setProperties] = useState({})
  const [selectedType, setSelectedType] = useState()
  const [allCSSProperties] = useState(cssProperties)
  const [mainTab, setMainTab] = useState('styles')
  const [secondaryTab, setSecondaryTab] = useState('default')
  const [showCSS, setShowCSS] = useState(false)
  const [codeBox, setCodeBox] = useState('')
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [filteredFonts, setFilteredFonts] = useState([])

  useEffect(() => {
    const currentElement = findById(state.active.selectedId.get(), state.page.data.get().styles.sections)
    const type = findTypeById(state.active.selectedId.get(), state.page.data.get().styles.sections)
    if (currentElement) {
      setStyles(currentElement.style)
      setProperties(currentElement.properties)
      setSelectedType(type)
    }
  }, [state.active.selectedId.get()])

  useEffect(() => {
    if (!state.active.selectedId.get()) {
      setStyles(state.page.data.get().styles.body)
      setProperties({})
      setSelectedType('body')
    }
  }, [])

  const debouncedUpdateCSS = useCallback(
    debounce(value => {
      setCodeBox(value)
      updateCSS(
        value,
        codeBox,
        secondaryTab,
        state.active.selectedId.get(),
        state.page.data.get(),
        state.page.data.set,
        setStyles
      )
    }, 1300),
    [
      codeBox,
      secondaryTab,
      state.active.selectedId.get(),
      state.page.data.get(),
      state.page.data.set,
      setStyles,
    ]
  )

  return (
    <>
      {state.active.selectedId.get() && (
        <div className="text-xl py-4 px-3 text-slate-800 flex items-center justify-between font-bold">
          <h3 className="capitalize">{selectedType}</h3>

          <div className="space-x-3 flex items-center">
            <button
              onClick={() => {
                duplicate(state)
              }}
              data-tooltip-id="tooltip"
              data-tooltip-content="Duplicate"
            >
              <BiCopyAlt />
            </button>
            <button
              onClick={() => {
                remove(state)
              }}
              data-tooltip-id="tooltip"
              data-tooltip-content="Delete"
            >
              <FaRegTrashAlt />
            </button>
            <button
              onClick={() => {
                state.active.current.set('')
              }}
            >
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
                addStyle(
                  value,
                  styles,
                  setStyles,
                  state.active.selectedId.get(),
                  state.page.data.get(),
                  state.page.data.set
                )
              }}
              allCSSProperties={allCSSProperties}
              showCSS={showCSS}
              setShowCSS={() => {
                setShowCSS(!showCSS)
                if (showCSS) {
                  updateCSS(
                    null,
                    codeBox,
                    secondaryTab,
                    state.active.selectedId.get(),
                    state.page.data.get(),
                    state.page.data.set,
                    setStyles
                  )
                }
              }}
            />
          </div>
          {!showCSS && (
            <div className="pb-8">
              {renderStyleInputs(
                styles,
                setStyles,
                state.page.data.set,
                state.page.data.get(),
                state.active.selectedId.get(),
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
            {renderPropertyInputs(
              styles,
              properties,
              setProperties,
              state.page.data.set,
              state.page.data.get(),
              state.active.selectedId.get()
            )}
          </div>
        </>
      )}
    </>
  )
}
