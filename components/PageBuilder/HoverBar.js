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

export default function HoverBar({ position, page, updatePage, selectedId }) {
  const [updatedPosition, setUpdatedPosition] = useState(position)

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
    const existingIds = new Set()

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
        page.sections.push(newItem)
        break

      case 'row':
        newItem = { ...defaults.row, id: generateUniqueId(existingIds) }
        page.sections[currentElement.sectionIndex].rows.push(newItem)
        break

      case 'column':
        newItem = { ...defaults.column, id: generateUniqueId(existingIds) }
        page.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].columns.push(newItem)
        break

      case 'element':
        newItem = { ...defaults.elements[0], id: generateUniqueId(existingIds) }
        page.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].columns[
          currentElement.columnIndex
        ].elements.push(newItem)
        break

      default:
        return
    }

    updatePage(page)
  }

  function moveUp() {
    alert('moveUp')
  }

  function moveDown() {
    alert('moveDown')
  }

  function remove() {
    alert('remove')
  }

  function duplicate() {
    alert('duplicate')
  }

  return (
    <main
      id="hoverBar"
      className="border-2 border-blue-500 fixed"
      style={{
        width: updatedPosition.width,
        height: updatedPosition.height,
        top: updatedPosition.top,
        left: updatedPosition.left,
        zIndex: 999999,
      }}
    >
      <div id="hoverBarTop">
        <div className="flex">
          <div
            onClick={() => {
              moveUp()
            }}
            className="bg-blue-500 p-1 rounded-sm text-white"
          >
            <FaArrowUp />
          </div>
          <div
            onClick={() => {
              moveDown()
            }}
            className="bg-blue-500 p-1 rounded-sm text-white"
          >
            <FaArrowDown />
          </div>
        </div>

        <div className="flex">
          <div
            onClick={() => {
              duplicate()
            }}
            className="bg-blue-500 p-1 rounded-sm text-white"
          >
            <FaCopy />
          </div>
          <div
            onClick={() => {
              remove()
            }}
            className="bg-blue-500 p-1 rounded-sm text-white"
          >
            <FaTrash />
          </div>
        </div>
      </div>

      <div id="hoverBarBottom">
        <div
          onClick={() => {
            add()
          }}
          className="bg-blue-500 p-1 rounded-full text-white"
        >
          <FaPlus />
        </div>
      </div>
    </main>
  )
}
