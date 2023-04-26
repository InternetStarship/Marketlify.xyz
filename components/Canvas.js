/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

import Element from './PageBuilder/Element'
import Empty from './PageBuilder/Empty'
import HoverBar from './PageBuilder/HoverBar'
import { useState, useEffect } from 'react'
import findTypeById from '@/utils/findTypeById'
import { FaCog, FaTrashAlt } from 'react-icons/fa'
import { BiCodeAlt } from 'react-icons/bi'
import { FiLayers } from 'react-icons/fi'
import TextEditor from './PageBuilder/TextEditor'
import _ from 'lodash'
import buildGoogleFonts from '@/utils/buildGoogleFonts'

export default function Canvas({
  funnel,
  page,
  edit,
  viewport,
  updated,
  updatePage,
  selectedId,
  updateSelectedId,
  current,
  fullscreen,
  updateFullscreen,
  name,
  updateName,
  updateCurrent,
  updateFunnel,
}) {
  const [data, setData] = useState(page)
  const [hovering, setHovering] = useState(false)
  const [position, setPosition] = useState({})
  const [hoverType, setHoverType] = useState('')
  const [editingText, setEditingText] = useState(false)
  const [existingIds] = useState(new Set())

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
    setEditingText(false)
    buildGoogleFonts(page)
  }, [])

  useEffect(() => {
    setData(page)
  }, [updated])

  function hover(elementId, isEmpty = false, type = '') {
    let element = document.getElementById(elementId)
    if (type === '') {
      type = findTypeById(parseInt(elementId.replace('marketlify-', '')), data.data.styles.sections)
    }

    if (element) {
      setHoverType(type)
      setHovering(true)

      setPosition({
        top: `${element.offsetTop}px`,
        left: `${element.offsetLeft}px`,
        width: `${element.offsetWidth}px`,
        height: `${element.offsetHeight}px`,
      })

      const elementRect = element.getBoundingClientRect()
      const width = elementRect.width

      if (width < 280) {
        document.querySelectorAll('.hoverSmallHidden').forEach(element => {
          element.style.display = 'none'
        })
      } else {
        document.querySelectorAll('.hoverSmallHidden').forEach(element => {
          element.style.display = 'flex'
        })
      }

      if (document.querySelector('.hoverBarRight')) {
        if (isEmpty) {
          document.querySelector('.hoverBarRight').style.display = 'none'
          document.querySelector('.hoverBarLeft').style.display = 'none'
        } else {
          document.querySelector('.hoverBarRight').style.display = 'flex'
          document.querySelector('.hoverBarLeft').style.display = 'flex'
        }
      }

      if (isEmpty) {
        const selected_id = parseInt(element.id.replace('marketlify-empty-', ''))
        updateSelectedId(selected_id)
      } else {
        updateSelectedId(parseInt(elementId.replace('marketlify-', '')))
      }
    }
  }

  return (
    <main id="canvasContainer" className={fullscreen ? 'fullscreen' : ''}>
      {fullscreen && (
        <div id="fullscreenClose" onClick={updateFullscreen}>
          Close Fullscreen
        </div>
      )}

      <div id="mainCanvas" className={viewport}>
        <div className="top-bar">
          <div className="traffic-lights hidden md:flex mr-3">
            <div className="traffic-light traffic-light-close"></div>
            <div className="traffic-light traffic-light-minimize"></div>
            <div className="traffic-light traffic-light-maximize"></div>
          </div>
          <div className="url-bar">
            <input
              type="text"
              value={name}
              onChange={e => {
                updateName(e.target.value)
              }}
              className="w-full"
            />
          </div>
          <div className="flex space-x-3">
            <button
              data-tooltip-id="tooltip"
              data-tooltip-content="Page Layers"
              onClick={() => {
                updateCurrent('layers')
                updateSelectedId(null)
              }}
            >
              <FiLayers />
            </button>
            <button
              data-tooltip-id="tooltip"
              data-tooltip-content="Page Settings"
              onClick={() => {
                updateCurrent('settings')
                updateSelectedId(null)
              }}
            >
              <FaCog />
            </button>
            <button
              data-tooltip-id="tooltip"
              data-tooltip-content="Custom Code"
              onClick={() => {
                updateCurrent('custom-code')
                updateSelectedId(null)
              }}
            >
              <BiCodeAlt />
            </button>
            <button
              data-tooltip-id="tooltip"
              data-tooltip-content="Page Settings"
              onClick={() => {
                const confirm = window.confirm('Are you sure you want to delete this page?')
                if (confirm) {
                  const id = page.id
                  const key = `marketlify_v3_page_${id}`

                  localStorage.removeItem(key)

                  const funnelKey = `marketlify_v3_funnel_${funnel.id}`
                  const updatedPages = funnel.pages.filter(pageId => pageId !== id)
                  funnel.pages = updatedPages

                  localStorage.setItem(funnelKey, JSON.stringify(funnel))

                  updateFunnel(_.cloneDeep(funnel))
                  updatePage(null)
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
          style={data.data.styles.body}
        >
          {current !== '' && (
            <div
              className="w-full h-full hover:bg-slate-900 opacity-25 absolute z-20"
              onMouseOver={e => {
                e.preventDefault()
                e.stopPropagation()
              }}
              onClick={e => {
                edit(null)
                updateCurrent('')
              }}
            ></div>
          )}

          {hovering && !editingText && (
            <HoverBar
              position={position}
              page={page}
              updatePage={updatePage}
              selectedId={selectedId}
              current={current}
              hoverType={hoverType}
              updateHovering={setHovering}
            />
          )}

          {data.data.styles.sections.length == 0 && (
            <div
              className="element"
              id={'marketlify-' + 'empty-000'}
              onMouseOver={e => {
                e.stopPropagation()
                hover('marketlify-' + 'empty-000', true, 'section')
              }}
            >
              <Empty message="Add Section" />
            </div>
          )}

          {data.data.styles.sections?.map((section, sectionIndex) => (
            <div
              className="section"
              id={'marketlify-' + section.id}
              key={section.id}
              style={section.style}
              onClick={e => {
                e.stopPropagation()
                edit(section)
              }}
              onMouseOver={e => {
                e.stopPropagation()
                hover('marketlify-' + section.id)
              }}
            >
              {section.rows.length === 0 && (
                <div key={sectionIndex} className="p-3">
                  <div
                    className="element"
                    id={'marketlify-' + 'empty-' + section.id}
                    onMouseOver={e => {
                      e.stopPropagation()
                      hover('marketlify-' + 'empty-' + section.id, true, 'row')
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
                  style={row.style}
                  onClick={e => {
                    e.stopPropagation()
                    edit(row)
                  }}
                  onMouseOver={e => {
                    e.stopPropagation()
                    hover('marketlify-' + row.id)
                  }}
                >
                  {row.columns?.map((column, colIndex) => (
                    <div
                      key={`${sectionIndex}-${rowIndex}-${colIndex}`}
                      className="column"
                      style={column.style}
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
                              hover('marketlify-' + 'empty-' + column.id, true, 'element')
                            }}
                          >
                            <Empty message="Add Element" className="element" />
                          </div>
                        </div>
                      )}

                      {column.elements?.map((element, elementIndex) => (
                        <div
                          className="element"
                          id={'marketlify-' + element.id}
                          key={element.id}
                          onClick={e => {
                            e.stopPropagation()
                            if (
                              element.type === 'headline' ||
                              element.type === 'subheadline' ||
                              element.type === 'paragraph'
                            ) {
                              setEditingText(true)
                            } else {
                              setEditingText(false)
                              edit(element)
                            }
                          }}
                          onMouseOver={e => {
                            e.stopPropagation()
                            hover('marketlify-' + element.id)
                          }}
                        >
                          {editingText && (
                            <>
                              {(element.type === 'headline' ||
                                element.type === 'subheadline' ||
                                element.type === 'paragraph') && (
                                <TextEditor
                                  element={element}
                                  data={data}
                                  style={element.style}
                                  updateContent={value => {
                                    data.data.content.filter(
                                      content => content.id === element.id
                                    )[0].content = value
                                    updatePage(data)
                                  }}
                                  closeEditor={() => {
                                    setTimeout(() => {
                                      setEditingText(false)
                                    }, 50)
                                  }}
                                  edit={() => {
                                    edit(element)
                                    setTimeout(() => {
                                      setEditingText(false)
                                    }, 50)
                                  }}
                                  updateStyle={style => {
                                    element.style = style
                                    updatePage(data)
                                  }}
                                />
                              )}

                              {element.type !== 'headline' &&
                                element.type !== 'subheadline' &&
                                element.type !== 'paragraph' && (
                                  <Element element={element} data={data} style={element.style} />
                                )}
                            </>
                          )}
                          {!editingText && <Element element={element} data={data} style={element.style} />}
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
