/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

import Element from './PageBuilder/Element'
import Empty from './PageBuilder/Empty'
import HoverBar from './PageBuilder/HoverBar'
import { useState, useEffect } from 'react'
import findTypeById from '@/utils/findTypeById'

export default function Canvas({
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
}) {
  const [data, setData] = useState(page)
  const [hovering, setHovering] = useState(false)
  const [position, setPosition] = useState({})
  const [hoverType, setHoverType] = useState('')
  const [existingIds] = useState(new Set())
  const [popup, setPopup] = useState(false)

  useEffect(() => {
    page.styles.sections?.forEach(section => {
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
    setData(page)
  }, [updated])

  function hover(elementId, isEmpty = false, type = '') {
    let element = document.getElementById(elementId)
    if (type === '') {
      type = findTypeById(parseInt(elementId.replace('marketlify-', '')), data.styles.sections)
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
          <div className="traffic-lights">
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
        </div>

        <div
          id="canvasWrapper"
          onMouseLeave={e => {
            e.stopPropagation()
            setHovering(false)
          }}
        >
          {hovering && (
            <HoverBar
              position={position}
              page={page}
              updatePage={updatePage}
              selectedId={selectedId}
              current={current}
              hoverType={hoverType}
            />
          )}

          {data.styles.sections?.map((section, sectionIndex) => (
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
                          style={element.style}
                          onClick={e => {
                            e.stopPropagation()
                            edit(element)
                          }}
                          onMouseOver={e => {
                            e.stopPropagation()
                            hover('marketlify-' + element.id)
                          }}
                        >
                          <Element element={element} data={data} />
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
