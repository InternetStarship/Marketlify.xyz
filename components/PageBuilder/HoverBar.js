/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

import { FaArrowUp, FaArrowDown, FaPlus, FaCopy, FaCog, FaTrash } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import findById from '@/utils/findById'
import findTypeById from '@/utils/findTypeById'
import getIndexesById from '@/utils/getIndexesById'
import AddDropdown from './AddDropdown'

export default function HoverBar({ position, page, updatePage, selectedId, current, hoverType }) {
  const [updatedPosition, setUpdatedPosition] = useState(position)
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
    setUpdatedPosition(position)
    setPopup(false)
  }, [position])

  function move(direction) {
    const type = findTypeById(selectedId, page.styles.sections)
    const currentElement = getIndexesById(selectedId, page.styles.sections)

    switch (type) {
      case 'section':
        moveItem(page.styles.sections, currentElement.sectionIndex, direction)
        break

      case 'row':
        moveItem(page.styles.sections[currentElement.sectionIndex].rows, currentElement.rowIndex, direction)
        break

      case 'column':
        moveItem(
          page.styles.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].columns,
          currentElement.columnIndex,
          direction
        )
        break

      case 'element':
        moveItem(
          page.styles.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].columns[
            currentElement.columnIndex
          ].elements,
          currentElement.elementIndex,
          direction
        )
        break
    }

    updatePage(page)
  }

  function moveItem(array, currentIndex, direction) {
    const newIndex = currentIndex + direction
    if (newIndex >= 0 && newIndex < array.length) {
      const item = array.splice(currentIndex, 1)[0]
      array.splice(newIndex, 0, item)
    }
  }

  function remove() {
    const id = selectedId
    const obj = page.styles

    for (let i = 0; i < obj.sections.length; i++) {
      if (obj.sections[i].id === id) {
        obj.sections.splice(i, 1)
        break
      }
      if (obj.sections[i].rows) {
        for (let j = 0; j < obj.sections[i].rows.length; j++) {
          if (obj.sections[i].rows[j].id === id) {
            obj.sections[i].rows.splice(j, 1)
            break
          }
          if (obj.sections[i].rows[j].columns) {
            for (let k = 0; k < obj.sections[i].rows[j].columns.length; k++) {
              if (obj.sections[i].rows[j].columns[k].id === id) {
                obj.sections[i].rows[j].columns.splice(k, 1)
                break
              }
              if (obj.sections[i].rows[j].columns[k].elements) {
                for (let l = 0; l < obj.sections[i].rows[j].columns[k].elements.length; l++) {
                  if (obj.sections[i].rows[j].columns[k].elements[l].id === id) {
                    obj.sections[i].rows[j].columns[k].elements.splice(l, 1)
                    break
                  }
                }
              }
            }
          }
        }
      }
    }

    updatePage(page)
  }

  function duplicate() {
    const element = findById(selectedId, page.styles.sections)
    const type = findTypeById(selectedId, page.styles.sections)
    const currentElement = getIndexesById(selectedId, page.styles.sections)

    let newItem
    const newId = generateUniqueId(existingIds)

    switch (type) {
      case 'section':
        newItem = { ...element, id: newId }
        page.styles.sections.splice(currentElement.sectionIndex, 0, newItem)
        break

      case 'row':
        newItem = { ...element, id: newId }
        page.styles.sections[currentElement.sectionIndex].rows.splice(currentElement.rowIndex, 0, newItem)
        break

      case 'column':
        newItem = { ...element, id: newId }
        page.styles.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].columns.splice(
          currentElement.columnIndex,
          0,
          newItem
        )
        break

      case 'element':
        newItem = { ...element, id: newId }
        page.styles.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].columns[
          currentElement.columnIndex
        ].elements.splice(currentElement.elementIndex, 0, newItem)

        // page.content.push({
        //   id: newId,
        //   content: content.content,
        //   type: content.type,
        // })
        break
    }

    updatePage(page)
  }

  return (
    <>
      {current !== '' && <div className="w-full h-full absolute z-20"></div>}
      {current === '' && (
        <div className={'hoverTheme-' + hoverType}>
          <main
            id="hoverBar"
            className="border-2 fixed"
            style={{
              width: updatedPosition.width,
              height: updatedPosition.height,
              top: updatedPosition.top,
              left: updatedPosition.left,
              zIndex: 999999,
            }}
          >
            <div id="hoverBarTop">
              <div className="flex hoverBarLeft rounded-br ">
                <button
                  onClick={() => {
                    move(-1)
                  }}
                  className="p-2 text-white"
                  data-tooltip-id="tooltip"
                  data-tooltip-content="Move Up"
                >
                  <FaArrowUp />
                </button>
                <button
                  onClick={() => {
                    move(1)
                  }}
                  className="p-2 text-white"
                  data-tooltip-id="tooltip"
                  data-tooltip-content="Move Down"
                >
                  <FaArrowDown />
                </button>

                <div className="p-2 px-2.5 text-base font-bold uppercase text-white">{hoverType}</div>
              </div>

              <div className="flex hoverBarRight rounded-bl">
                <div
                  className="p-2 text-white"
                  data-tooltip-id="tooltip"
                  data-tooltip-content={`Edit ${hoverType}`}
                >
                  <FaCog />
                </div>
                <button
                  onClick={() => {
                    duplicate()
                  }}
                  className="p-2 text-white"
                  data-tooltip-id="tooltip"
                  data-tooltip-content="Duplicate"
                >
                  <FaCopy />
                </button>
                <button
                  onClick={() => {
                    remove()
                  }}
                  className="p-2 text-white"
                  data-tooltip-id="tooltip"
                  data-tooltip-content="Remove"
                >
                  <FaTrash />
                </button>
              </div>
            </div>

            <AddDropdown
              popup={popup}
              hoverType={hoverType}
              setPopup={setPopup}
              updatePage={updatePage}
              page={page}
              selectedId={selectedId}
              existingIds={existingIds}
              id="hoverBarBottom"
            >
              <FaPlus />
            </AddDropdown>
          </main>
        </div>
      )}
    </>
  )
}
