/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

import Element from './PageBuilder/Element'
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
}) {
  const [data, setData] = useState(page)
  const [hovering, setHovering] = useState(false)
  const [position, setPosition] = useState({})
  const [hoverType, setHoverType] = useState('')

  useEffect(() => {
    setData(page)
  }, [updated])

  function hover(elementId) {
    const element = document.getElementById(elementId)
    const type = findTypeById(parseInt(elementId.replace('marketlify-', '')), data.sections)
    setHoverType(type)
    setHovering(true)

    setPosition({
      top: `${element.offsetTop}px`,
      left: `${element.offsetLeft}px`,
      width: `${element.offsetWidth}px`,
      height: `${element.offsetHeight}px`,
    })

    updateSelectedId(parseInt(elementId.replace('marketlify-', '')))
  }

  return (
    <main id="canvasContainer">
      <div id="mainCanvas" className={viewport}>
        <div className="top-bar">
          <div className="traffic-lights">
            <div className="traffic-light traffic-light-close"></div>
            <div className="traffic-light traffic-light-minimize"></div>
            <div className="traffic-light traffic-light-maximize"></div>
          </div>
          <div className="url-bar">
            <a href="http://www.wynterfunnels.com" target="_blank">
              https://www.wynterfunnels.com
            </a>
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

          {data.sections.map(section => (
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
              {section.rows.map(row => (
                <div
                  className="row"
                  id={'marketlify-' + row.id}
                  key={row.id}
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
                  {row.columns.map(column => (
                    <div className="column" id={'marketlify-' + column.id} key={column.id}>
                      {column.elements.map(element => (
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
                          <Element element={element} />
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
