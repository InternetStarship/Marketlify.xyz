import { useState, useEffect } from 'react'
import { FaCog, FaTrashAlt } from 'react-icons/fa'
import { BiCodeAlt } from 'react-icons/bi'
import { BsLayoutTextWindowReverse } from 'react-icons/bs'
import { cloneDeep } from 'lodash'
import { buildGoogleFonts } from '@/utils/buildGoogleFonts'
import { hover } from '@/utils/hover'
import TextEditor from './TextEditor'
import Element from './Element'
import Empty from './Empty'
import HoverBar from './HoverBar'

export default function Canvas({ state }) {
  const [hovering, setHovering] = useState(false)
  const [position, setPosition] = useState({})
  const [hoverType, setHoverType] = useState('')
  const [editingText, setEditingText] = useState(null)
  const [existingIds] = useState(new Set())

  useEffect(() => {
    state.page.data.get().styles.sections?.forEach(section => {
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
    setEditingText(null)
    buildGoogleFonts(state.page.data.get())
  }, [])

  const updateOnHover = data => {
    if (data.element) {
      setHoverType(data.type)
      setHovering(true)
    }
    if (data.positions) {
      setPosition(data.positions)
    }
    state.active.selectedId.set(data.id)
  }

  return (
    <main id="canvasContainer" className={`${state.active.fullscreen.get() ? 'fullscreen' : ''} w-full`}>
      {state.active.fullscreen.get() && (
        <div
          id="fullscreenClose"
          onClick={() => {
            state.active.fullscreen.set(false)
          }}
        >
          Close Fullscreen
        </div>
      )}

      <div id="mainCanvas" className={state.active.viewport.get()}>
        <div className="top-bar">
          <div className="url-bar">
            <input
              type="text"
              value={state.page.name.get()}
              onChange={e => {
                state.page.name.set(e.target.value)
              }}
              className="w-full"
            />
          </div>
          <div className="flex space-x-3">
            <button
              data-tooltip-id="tooltip"
              data-tooltip-content="Page Structure"
              onClick={() => {
                state.active.current.set('layers')
                state.active.selectedId.set(null)
              }}
            >
              <BsLayoutTextWindowReverse />
            </button>
            <button
              data-tooltip-id="tooltip"
              data-tooltip-content="Page Settings"
              onClick={() => {
                state.active.current.set('settings')
                state.active.selectedId.set(null)
              }}
            >
              <FaCog />
            </button>
            <button
              data-tooltip-id="tooltip"
              data-tooltip-content="Custom Code"
              onClick={() => {
                state.active.current.set('custom-code')
                state.active.selectedId.set(null)
              }}
            >
              <BiCodeAlt />
            </button>
            <button
              data-tooltip-id="tooltip"
              data-tooltip-content="Delete Page"
              onClick={() => {
                const confirm = window.confirm('Are you sure you want to delete this page?')
                if (confirm) {
                  const id = state.page.data.get().id
                  const key = `marketlify_v3_page_${id}`

                  localStorage.removeItem(key)

                  const funnelKey = `marketlify_v3_funnel_${state.funnel.get().id}`
                  const updatedPages = state.funnel.get().pages.filter(pageId => pageId !== id)
                  state.funnel.get().pages = updatedPages

                  localStorage.setItem(funnelKey, JSON.stringify(state.funnel.get()))

                  state.funnel.set(cloneDeep(state.funnel.get()))
                  state.page.data.set(null)
                }
              }}
            >
              <FaTrashAlt />
            </button>
          </div>
        </div>

        <div
          id="canvasWrapper"
          onMouseLeave={e => {
            e.stopPropagation()
            setHovering(false)
          }}
          style={cloneDeep(state.page.data.styles.body.get())}
        >
          {state.active.current.get() !== '' && (
            <div
              className="w-full h-full hover:bg-slate-900 opacity-25 absolute z-20"
              onMouseOver={e => {
                e.preventDefault()
                e.stopPropagation()
              }}
              onClick={e => {
                state.active.selectedId.set(null)
                state.active.current.set('')
              }}
            ></div>
          )}

          {hovering && !editingText && (
            <HoverBar
              state={state}
              position={position}
              page={state.page.data.get()}
              updatePage={state.page.data.set}
              selectedId={state.active.selectedId.get()}
              current={state.active.current.get()}
              hoverType={hoverType}
              updateHovering={setHovering}
            />
          )}

          {state.page.data.styles.sections.get().length == 0 && (
            <div
              className="element"
              id={'marketlify-' + 'empty-000'}
              onMouseOver={e => {
                e.stopPropagation()
                hover(
                  data => {
                    updateOnHover(data)
                  },
                  'marketlify-' + 'empty-000',
                  true,
                  'section'
                )
              }}
            >
              <Empty message="Add Section" />
            </div>
          )}

          {state.page.data.styles.sections.get()?.map((section, sectionIndex) => (
            <div
              className="section"
              id={'marketlify-' + section.id}
              key={section.id}
              style={cloneDeep(section.styles)}
              onClick={e => {
                e.stopPropagation()
                state.active.selectedId.set(section.id)
                state.active.current.set('editing')
              }}
              onMouseOver={e => {
                e.stopPropagation()
                hover(
                  data => {
                    updateOnHover(data)
                  },
                  'marketlify-' + section.id,
                  false,
                  'section',
                  state.page.data.get().styles.sections
                )
              }}
            >
              {section.rows.length === 0 && (
                <div key={sectionIndex} className="p-3">
                  <div
                    className="element"
                    id={'marketlify-' + 'empty-' + section.id}
                    onMouseOver={e => {
                      e.stopPropagation()
                      hover(
                        data => {
                          updateOnHover(data)
                        },
                        'marketlify-' + 'empty-' + section.id,
                        true,
                        'row',
                        state.page.data.get().styles.sections
                      )
                    }}
                  >
                    <Empty message="Add Row" />
                  </div>
                </div>
              )}
              {section.rows?.map((row, rowIndex) => (
                <div
                  className="row"
                  id={'marketlify-' + row.id}
                  key={`${sectionIndex}-${rowIndex}`}
                  style={cloneDeep(row.style)}
                  onClick={e => {
                    e.stopPropagation()
                    state.active.selectedId.set(row.id)
                    state.active.current.set('editing')
                  }}
                  onMouseOver={e => {
                    e.stopPropagation()
                    hover(
                      data => {
                        updateOnHover(data)
                      },
                      'marketlify-' + row.id,
                      false,
                      'row',
                      state.page.data.get().styles.sections
                    )
                  }}
                >
                  {row.columns?.map((column, colIndex) => (
                    <div
                      key={`${sectionIndex}-${rowIndex}-${colIndex}`}
                      className="column"
                      style={cloneDeep(column.style)}
                      id={'marketlify-' + column.id}
                    >
                      {column.elements.length === 0 && (
                        <div className="p-3">
                          <div
                            className="element"
                            id={'marketlify-' + 'empty-' + column.id}
                            onMouseOver={e => {
                              e.stopPropagation()
                              e.preventDefault()
                              hover(
                                data => {
                                  updateOnHover(data)
                                },
                                'marketlify-' + 'empty-' + column.id,
                                true,
                                'element',
                                state.page.data.get().styles.sections
                              )
                            }}
                          >
                            <Empty message="Add Element" className="element" />
                          </div>
                        </div>
                      )}

                      {column.elements?.map((element, elementIndex) => (
                        <div
                          className={`element ${element.type === 'divider' ? 'dividerFix' : ''}`}
                          id={'marketlify-' + element.id}
                          key={element.id}
                          onClick={e => {
                            e.stopPropagation()
                            if (
                              element.type === 'headline' ||
                              element.type === 'subheadline' ||
                              element.type === 'paragraph'
                            ) {
                              setEditingText(element.id)
                            } else {
                              setEditingText(null)
                              state.active.selectedId.set(element.id)
                              state.active.current.set('editing')
                            }
                          }}
                          onMouseOver={e => {
                            e.stopPropagation()
                            hover(
                              data => {
                                updateOnHover(data)
                              },
                              'marketlify-' + element.id,
                              false,
                              'element',
                              state.page.data.get().styles.sections
                            )
                          }}
                        >
                          {editingText === element.id && (
                            <TextEditor
                              element={element}
                              data={data}
                              style={cloneDeep(element.style)}
                              updateContent={value => {
                                data.content.filter(content => content.id === element.id)[0].content = value
                                state.page.data.set(data)
                              }}
                              closeEditor={() => {
                                setTimeout(() => {
                                  setEditingText(null)
                                }, 50)
                              }}
                              edit={() => {
                                state.active.selectedId.set(element.id)
                                state.active.current.set('editing')
                                setTimeout(() => {
                                  setEditingText(null)
                                }, 50)
                              }}
                              updateStyle={style => {
                                element.style = style
                                state.page.data.set(data)
                              }}
                            />
                          )}
                          {editingText && editingText !== element.id && (
                            <Element element={element} state={state} style={cloneDeep(element.style)} />
                          )}

                          {!editingText && (
                            <Element element={element} state={state} style={cloneDeep(element.style)} />
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
