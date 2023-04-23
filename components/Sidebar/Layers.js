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

    const findSection = sectionId => updatedPage.styles.sections.find(section => section.id === sectionId)
    const findRow = (section, rowId) => section.rows.find(row => row.id === rowId)
    const findColumn = (row, columnId) => row.columns.find(column => column.id === columnId)

    switch (type) {
      case 'section':
        moveArrayItem(updatedPage.styles.sections, dragIndex, hoverIndex)
        break

      case 'row':
        {
          const dragSection = findSection(dragLayer.sectionId)
          const hoverSection = findSection(hoverLayer.sectionId)

          moveArrayItem(dragSection.rows, dragIndex, hoverIndex)

          if (dragLayer.sectionId !== hoverLayer.sectionId) {
            const row = dragSection.rows.splice(dragIndex, 1)[0]
            hoverSection.rows.splice(hoverIndex, 0, row)
          }
        }
        break

      case 'column':
        {
          const dragSection = findSection(dragLayer.sectionId)
          const hoverSection = findSection(hoverLayer.sectionId)

          const dragRow = findRow(dragSection, dragLayer.rowId)
          const hoverRow = findRow(hoverSection, hoverLayer.rowId)

          moveArrayItem(dragRow.columns, dragIndex, hoverIndex)

          if (dragLayer.rowId !== hoverLayer.rowId) {
            const column = dragRow.columns.splice(dragIndex, 1)[0]
            hoverRow.columns.splice(hoverIndex, 0, column)
          }
        }
        break

      case 'element':
        {
          const dragSection = findSection(dragLayer.sectionId)
          const hoverSection = findSection(hoverLayer.sectionId)

          const dragRow = findRow(dragSection, dragLayer.rowId)
          const hoverRow = findRow(hoverSection, hoverLayer.rowId)

          const dragColumn = findColumn(dragRow, dragLayer.columnId)
          const hoverColumn = findColumn(hoverRow, hoverLayer.columnId)

          moveArrayItem(dragColumn.elements, dragIndex, hoverIndex)

          if (dragLayer.columnId !== hoverLayer.columnId) {
            const element = dragColumn.elements.splice(dragIndex, 1)[0]
            hoverColumn.elements.splice(hoverIndex, 0, element)
          }
        }
        break

      default:
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
