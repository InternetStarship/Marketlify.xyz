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

  const quickSave = (styleObj, selectedId, data, updatePage) => {
    const page = JSON.stringify(data)
    localStorage.setItem(`marketlify_v4_page_${state.page.id.get()}`, page)
  }

  const debouncedUpdateCSS = useCallback(
    debounce(value => {
      console.log('debounced')
      setCodeBox(value)
      updateCSS(value, value, secondaryTab, state.active.selectedId.get(), state, quickSave)
    }, 200),
    [codeBox, secondaryTab, state.active.selectedId.get(), state.page.data.get(), quickSave],
  )

  return (
    <>
      {state.active.selectedId.get() && (
        <div className="flex items-center justify-between px-3 py-4 text-xl font-bold text-slate-800">
          <h3 className="capitalize">{selectedType}</h3>

          <div className="flex items-center space-x-3">
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
        <div className="flex items-center justify-evenly overflow-hidden rounded border border-slate-300 font-bold text-slate-700">
          <div
            onClick={() => {
              setMainTab('styles')
            }}
            className={`w-full cursor-pointer border-r border-slate-300 p-2 text-center text-sm hover:bg-orange-100 hover:text-orange-800 ${
              mainTab === 'styles' ? 'bg-slate-100' : ''
            }`}
          >
            Styles
          </div>
          <div
            onClick={() => {
              setMainTab('properties')
            }}
            className={`w-full cursor-pointer p-2 text-center text-sm hover:bg-orange-100 hover:text-orange-800 ${
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
            <div className="flex items-center justify-evenly overflow-hidden rounded border border-slate-300 font-bold text-slate-700">
              <div
                onClick={() => {
                  setSecondaryTab('default')
                }}
                className="w-full cursor-pointer border-r border-slate-300 bg-slate-100 p-2 text-center text-xs hover:bg-orange-100 hover:text-orange-800"
              >
                Default
              </div>
              <div
                onClick={() => {
                  setSecondaryTab('hover')
                }}
                className="w-full cursor-pointer p-2 text-center text-xs hover:bg-orange-100 hover:text-orange-800"
              >
                Hover
              </div>
              <div
                onClick={() => {
                  setSecondaryTab('mobile')
                }}
                className="w-full cursor-pointer p-2 text-center text-xs hover:bg-orange-100 hover:text-orange-800"
              >
                Mobile
              </div>
            </div>
          </div>
          <div className="relative px-3 py-3 pb-2 text-sm text-slate-700" style={{ zIndex: 99999999 }}>
            <SearchStyles
              onChange={value => {
                addStyle(
                  value,
                  styles,
                  setStyles,
                  state.active.selectedId.get(),
                  state.page.data.get(),
                  quickSave,
                )
              }}
              allCSSProperties={allCSSProperties}
              showCSS={showCSS}
              codeBox={codeBox}
              setStyles={setStyles}
              setShowCSS={() => {
                setShowCSS(!showCSS)
              }}
            />
          </div>
          {!showCSS && (
            <div className="pb-8">
              {renderStyleInputs(
                styles,
                setStyles,
                quickSave,
                state,
                state.active.selectedId.get(),
                showColorPicker,
                setShowColorPicker,
                filteredFonts,
                setFilteredFonts,
              )}
            </div>
          )}
          {showCSS && (
            <>
              <div className="px-3 pb-8 pt-3">
                <div className="overflow-hidden rounded border shadow">
                  <CodeMirror
                    value={buildCSS(secondaryTab, styles, properties)}
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
            {renderPropertyInputs(styles, properties, setProperties, state, state.active.selectedId.get())}
          </div>
        </>
      )}
    </>
  )
}
