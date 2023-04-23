/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */
import React from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import DraggableLayer from './DraggableLayer'

export default function Layers({ page, updatePage, updateCurrent }) {
  const debouncedUpdatePage = debounce(updatePage, 200)

  const moveLayer = (dragLayer, hoverLayer, dragIndex, hoverIndex, type) => {
    const updatedPage = { ...page }

    const moveArrayItem = (arr, fromIndex, toIndex) => {
      const item = arr[fromIndex]
      arr.splice(fromIndex, 1)
      arr.splice(toIndex, 0, item)
    }

    switch (type) {
      case 'section':
        moveArrayItem(updatedPage.styles.sections, dragIndex, hoverIndex)
        break
    }

    debouncedUpdatePage(updatedPage)
  }

  function debounce(func, wait) {
    let timeout
    return function (...args) {
      const context = this
      clearTimeout(timeout)
      timeout = setTimeout(() => func.apply(context, args), wait)
    }
  }

  return (
    <div>
      <div className="text-xl p-3 text-white bg-slate-800 flex items-center justify-between font-bold">
        <h3 className="capitalize">Page Layers</h3>
        <button
          onClick={() => {
            updateCurrent('')
          }}
        >
          <AiOutlineCloseCircle />
        </button>
      </div>
      <div className="p-3">
        <DndProvider backend={HTML5Backend}>
          {page.styles.sections.map((section, sectionIndex) => (
            <DraggableLayer
              key={section.id}
              index={sectionIndex}
              id={section.id}
              type="section"
              moveLayer={moveLayer}
            >
              {section.rows.map((row, rowIndex) => (
                <DraggableLayer
                  key={row.id}
                  index={rowIndex}
                  id={row.id}
                  type="row"
                  moveLayer={moveLayer}
                  sectionId={section.id}
                >
                  {row.columns.map((column, columnIndex) => (
                    <DraggableLayer
                      key={column.id}
                      index={columnIndex}
                      id={column.id}
                      type="column"
                      moveLayer={moveLayer}
                      sectionId={section.id}
                      rowId={row.id}
                    >
                      {column.elements.map((element, elementIndex) => (
                        <DraggableLayer
                          key={element.id}
                          index={elementIndex}
                          id={element.id}
                          type="element"
                          moveLayer={moveLayer}
                          sectionId={section.id}
                          rowId={row.id}
                          columnId={column.id}
                        />
                      ))}
                    </DraggableLayer>
                  ))}
                </DraggableLayer>
              ))}
            </DraggableLayer>
          ))}
        </DndProvider>
      </div>
    </div>
  )
}
