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
  const moveLayer = (dragIndex, hoverIndex, type) => {
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
        const sectionIndexForRow = // find section index;
          moveArrayItem(updatedPage.styles.sections[sectionIndexForRow].rows, dragIndex, hoverIndex)
        break
      case 'column':
        const {
          sectionIndex: sectionIndexForColumn,
          rowIndex: rowIndexForColumn,
        } = // find section and row index;
          moveArrayItem(
            updatedPage.styles.sections[sectionIndexForColumn].rows[rowIndexForColumn].columns,
            dragIndex,
            hoverIndex
          )
        break
      case 'element':
        let sectionIndexForElement, rowIndexForElement, columnIndexForElement

        // Find section, row, and column index
        for (let sIndex = 0; sIndex < updatedPage.styles.sections.length; sIndex++) {
          const section = updatedPage.styles.sections[sIndex]
          for (let rIndex = 0; rIndex < section.rows.length; rIndex++) {
            const row = section.rows[rIndex]
            for (let cIndex = 0; cIndex < row.columns.length; cIndex++) {
              const column = row.columns[cIndex]
              const elementIndex = column.elements.findIndex(element => element.id === layer.id)
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
          {page.styles.sections.map((section, index) => (
            <DraggableLayer
              key={section.id}
              index={index}
              layer={section}
              type="section"
              moveLayer={moveLayer}
            />
          ))}
        </DndProvider>
      </div>
    </div>
  )
}
