/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

import { FaArrowUp, FaArrowDown, FaPlus, FaCopy, FaTrash } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import findById from '@/utils/findById'
import findTypeById from '@/utils/findTypeById'
import getIndexesById from '@/utils/getIndexesById'
import defaults from '@/utils/defaults'

export default function HoverBar({ position, page, updatePage, selectedId, current, hoverType }) {
  const [updatedPosition, setUpdatedPosition] = useState(position)
  const [existingIds] = useState(new Set())

  useEffect(() => {
    page.sections.forEach(section => {
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
  }, [position])

  function generateUniqueId(existingIds) {
    let uniqueId

    do {
      uniqueId = Math.floor(Math.random() * 1000000)
    } while (existingIds.has(uniqueId))

    return uniqueId
  }

  function add() {
    const type = findTypeById(selectedId, page.sections)
    const currentElement = getIndexesById(selectedId, page.sections)

    page.sections.forEach(section => {
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

    let newItem

    switch (type) {
      case 'section':
        newItem = { ...defaults.section, id: generateUniqueId(existingIds) }
        page.sections.splice(currentElement.sectionIndex + 1, 0, newItem)
        break

      case 'row':
        newItem = { ...defaults.row, id: generateUniqueId(existingIds) }
        page.sections[currentElement.sectionIndex].rows.splice(currentElement.rowIndex + 1, 0, newItem)
        break

      case 'column':
        newItem = { ...defaults.column, id: generateUniqueId(existingIds) }
        page.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].columns.splice(
          currentElement.columnIndex + 1,
          0,
          newItem
        )
        break

      case 'element':
        newItem = { ...defaults.elements[0], id: generateUniqueId(existingIds) }
        page.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].columns[
          currentElement.columnIndex
        ].elements.splice(currentElement.elementIndex + 1, 0, newItem)
        break

      default:
        return
    }

    updatePage(page)
  }

  function move(direction) {
    const type = findTypeById(selectedId, page.sections)
    const currentElement = getIndexesById(selectedId, page.sections)

    switch (type) {
      case 'section':
        moveItem(page.sections, currentElement.sectionIndex, direction)
        break

      case 'row':
        moveItem(page.sections[currentElement.sectionIndex].rows, currentElement.rowIndex, direction)
        break

      case 'column':
        moveItem(
          page.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].columns,
          currentElement.columnIndex,
          direction
        )
        break

      case 'element':
        moveItem(
          page.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].columns[
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
    const obj = page

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
    const element = findById(selectedId, page.sections)
    const type = findTypeById(selectedId, page.sections)
    const currentElement = getIndexesById(selectedId, page.sections)

    let newItem

    switch (type) {
      case 'section':
        newItem = { ...element, id: generateUniqueId(existingIds) }
        page.sections.splice(currentElement.sectionIndex, 0, newItem)
        break

      case 'row':
        newItem = { ...element, id: generateUniqueId(existingIds) }
        page.sections[currentElement.sectionIndex].rows.splice(currentElement.rowIndex, 0, newItem)
        break

      case 'column':
        newItem = { ...element, id: generateUniqueId(existingIds) }
        page.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].columns.splice(
          currentElement.columnIndex,
          0,
          newItem
        )
        break

      case 'element':
        newItem = { ...element, id: generateUniqueId(existingIds) }
        page.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].columns[
          currentElement.columnIndex
        ].elements.splice(currentElement.elementIndex, 0, newItem)
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
              <div className="flex hoverBarLeft rounded-br p-1">
                <button
                  onClick={() => {
                    move(-1)
                  }}
                  className="p-1 text-white"
                >
                  <FaArrowUp />
                </button>
                <button
                  onClick={() => {
                    move(1)
                  }}
                  className="p-1 text-white"
                >
                  <FaArrowDown />
                </button>

                <div className="p-1 text-sm font-medium uppercase text-white">{hoverType}</div>
              </div>

              <div className="flex hoverBarRight rounded-bl p-1">
                <button
                  onClick={() => {
                    duplicate()
                  }}
                  className="p-1 text-white"
                >
                  <FaCopy />
                </button>
                <button
                  onClick={() => {
                    remove()
                  }}
                  className="p-1 text-white"
                >
                  <FaTrash />
                </button>
              </div>
            </div>

            <div id="hoverBarBottom">
              <div
                onClick={() => {
                  add()
                }}
              >
                <FaPlus />
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  )
}
