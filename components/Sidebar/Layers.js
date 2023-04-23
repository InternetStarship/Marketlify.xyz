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
  const moveLayer = (dragIndex, hoverIndex, type, id) => {
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
      case 'row':
        let sectionIndexForRow

        for (let sIndex = 0; sIndex < updatedPage.styles.sections.length; sIndex++) {
          const section = updatedPage.styles.sections[sIndex]
          const rowIndex = section.rows.findIndex(row => row.id === id)
          if (rowIndex !== -1) {
            sectionIndexForRow = sIndex
            break
          }
        }

        moveArrayItem(updatedPage.styles.sections[sectionIndexForRow].rows, dragIndex, hoverIndex)
        break
      case 'column':
        let sectionIndexForColumn, rowIndexForColumn

        for (let sIndex = 0; sIndex < updatedPage.styles.sections.length; sIndex++) {
          const section = updatedPage.styles.sections[sIndex]
          for (let rIndex = 0; rIndex < section.rows.length; rIndex++) {
            const row = section.rows[rIndex]
            const columnIndex = row.columns.findIndex(column => column.id === id)
            if (columnIndex !== -1) {
              sectionIndexForColumn = sIndex
              rowIndexForColumn = rIndex
              break
            }
          }
          if (sectionIndexForColumn !== undefined) break
        }

        moveArrayItem(
          updatedPage.styles.sections[sectionIndexForColumn].rows[rowIndexForColumn].columns,
          dragIndex,
          hoverIndex
        )
        break

      case 'element':
        let sectionIndexForElement, rowIndexForElement, columnIndexForElement

        for (let sIndex = 0; sIndex < updatedPage.styles.sections.length; sIndex++) {
          const section = updatedPage.styles.sections[sIndex]
          for (let rIndex = 0; rIndex < section.rows.length; rIndex++) {
            const row = section.rows[rIndex]
            for (let cIndex = 0; cIndex < row.columns.length; cIndex++) {
              const column = row.columns[cIndex]
              const elementIndex = column.elements.findIndex(element => element.id === id)
              if (elementIndex !== -1) {
                sectionIndexForElement = sIndex
                rowIndexForElement = rIndex
                columnIndexForElement = cIndex
                break
              }
            }
            if (sectionIndexForElement !== undefined) break
          }
          if (sectionIndexForElement !== undefined) break
        }

        moveArrayItem(
          updatedPage.styles.sections[sectionIndexForElement].rows[rowIndexForElement].columns[
            columnIndexForElement
          ].elements,
          dragIndex,
          hoverIndex
        )
        break
    }

    updatePage(updatedPage)
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
                <DraggableLayer key={row.id} index={rowIndex} id={row.id} type="row" moveLayer={moveLayer}>
                  {row.columns.map((column, columnIndex) => (
                    <DraggableLayer
                      key={column.id}
                      index={columnIndex}
                      id={column.id}
                      type="column"
                      moveLayer={moveLayer}
                    >
                      {column.elements.map((element, elementIndex) => (
                        <DraggableLayer
                          key={element.id}
                          index={elementIndex}
                          id={element.id}
                          type="element"
                          moveLayer={moveLayer}
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
