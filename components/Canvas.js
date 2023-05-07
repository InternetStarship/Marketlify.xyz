import { useEffect } from 'react'
import CanvasFullscreenButton from './CanvasFullscreenButton'
import CanvasTopBar from './CanvasTopBar'
import { cloneDeep } from 'lodash'
import { buildGoogleFonts } from '@/utils/buildGoogleFonts'
import { hover } from '@/utils/hover'
import TextEditor from './TextEditor'
import Element from './Element'
import Empty from './Empty'
import HoverBar from './HoverBar'

export default function Canvas({ state }) {
  useEffect(() => {
    state.active.editingTextId.set(null)
    buildGoogleFonts(state.page.data.get())
  }, [])

  const updateOnHover = data => {
    if (data.element) {
      state.active.hoverType.set(data.type)
      state.active.hovering.set(true)
    }
    if (data.positions) {
      state.active.position.set(data.positions)
    }
    state.active.selectedId.set(data.id)
  }

  return (
    <main id="canvasContainer" className={`${state.active.fullscreen.get() ? 'fullscreen' : ''} w-full`}>
      <CanvasFullscreenButton state={state} />

      <div id="mainCanvas" className={state.active.viewport.get()}>
        <CanvasTopBar state={state} />

        <div
          id="canvasWrapper"
          onMouseLeave={e => {
            e.stopPropagation()
            state.active.hovering.set(false)
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

          {state.active.hovering.get() && !state.active.editingTextId.get() && <HoverBar state={state} />}

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
                              state.active.editingTextId.set(element.id)
                            } else {
                              state.active.editingTextId.set(null)
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
                          {state.active.editingTextId.get() === element.id && (
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
                                  state.active.editingTextId.set(null)
                                }, 50)
                              }}
                              edit={() => {
                                state.active.selectedId.set(element.id)
                                state.active.current.set('editing')
                                setTimeout(() => {
                                  state.active.editingTextId.set(null)
                                }, 50)
                              }}
                              updateStyle={style => {
                                element.style = style
                                state.page.data.set(data)
                              }}
                            />
                          )}
                          {state.active.editingTextId.get() &&
                            state.active.editingTextId.get() !== element.id && (
                              <Element element={element} state={state} style={cloneDeep(element.style)} />
                            )}

                          {!state.active.editingTextId.get() && (
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
