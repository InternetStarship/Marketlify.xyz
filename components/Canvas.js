/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

import Element from './builder/Element'
import { useState, useEffect } from 'react'

export default function Canvas({ page, edit, viewport, updated }) {
  const [data, setData] = useState(page)

  useEffect(() => {
    setData(page)
  }, [updated])

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

        {data.sections.map(section => (
          <div className="section" key={section.id} style={section.style}>
            {section.rows.map(row => (
              <div className="row" key={row.id} style={row.style}>
                {row.columns.map(column => (
                  <div className="column" key={column.id}>
                    {column.elements.map(element => (
                      <div
                        className="element"
                        key={element.id}
                        style={element.style}
                        onClick={() => edit(element)}
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
    </main>
  )
}
