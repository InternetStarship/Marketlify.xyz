/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

import { FaArrowUp, FaArrowDown, FaPlus, FaCopy, FaTrash } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import findById from '@/utils/findById'
import findTypeById from '@/utils/findTypeById'
import getIndexesById from '@/utils/getIndexesById'
import AddDropdown from './AddDropdown'
import _ from 'lodash'
import generateUniqueId from '@/utils/generateUniqueId'

export default function HoverBar({
  position,
  page,
  updatePage,
  selectedId,
  current,
  hoverType,
  updateHovering,
}) {
  const [updatedPosition, setUpdatedPosition] = useState(position)
  const [existingIds] = useState(new Set())
  const [popup, setPopup] = useState(false)

  useEffect(() => {
    page.data.styles.sections?.forEach(section => {
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
    const type = findTypeById(selectedId, page.data.styles.sections)
    const currentElement = getIndexesById(selectedId, page.data.styles.sections)

    switch (type) {
      case 'section':
        moveItem(page.data.styles.sections, currentElement.sectionIndex, direction)
        break

      case 'row':
        moveItem(
          page.data.styles.sections[currentElement.sectionIndex].rows,
          currentElement.rowIndex,
          direction
        )
        break

      case 'column':
        moveItem(
          page.data.styles.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].columns,
          currentElement.columnIndex,
          direction
        )
        break

      case 'element':
        moveItem(
          page.data.styles.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].columns[
            currentElement.columnIndex
          ].elements,
          currentElement.elementIndex,
          direction
        )
        break
    }

    updatePage(page)
    updateHovering(false)
  }

  function moveItem(array, currentIndex, direction) {
    const newIndex = currentIndex + direction
    if (newIndex >= 0 && newIndex < array.length) {
      const item = array.splice(currentIndex, 1)[0]
      array.splice(newIndex, 0, item)
    }
  }

  function remove() {
    const type = findTypeById(selectedId, page.data.styles.sections)
    const currentElement = getIndexesById(selectedId, page.data.styles.sections)
    const updatedPage = JSON.parse(JSON.stringify(page))

    switch (type) {
      case 'section':
        updatedPage.data.styles.sections.splice(currentElement.sectionIndex, 1)
        break

      case 'row':
        updatedPage.data.styles.sections[currentElement.sectionIndex].rows.splice(currentElement.rowIndex, 1)
        break

      case 'column':
        updatedPage.data.styles.sections[currentElement.sectionIndex].rows[
          currentElement.rowIndex
        ].columns.splice(currentElement.columnIndex, 1)
        break

      case 'element':
        updatedPage.data.styles.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].columns[
          currentElement.columnIndex
        ].elements.splice(currentElement.elementIndex, 1)

        break
    }

    updatePage(_.cloneDeep(updatedPage))
    updateHovering(false)
  }

  function duplicate() {
    const element = findById(selectedId, page.data.styles.sections)
    const type = findTypeById(selectedId, page.data.styles.sections)
    const currentElement = getIndexesById(selectedId, page.data.styles.sections)

    let newItem
    const newId = generateUniqueId(existingIds)

    switch (type) {
      case 'section':
        newItem = { ...element, id: newId }
        page.data.styles.sections.splice(currentElement.sectionIndex, 0, newItem)
        break

      case 'row':
        newItem = { ...element, id: newId }
        page.data.styles.sections[currentElement.sectionIndex].rows.splice(
          currentElement.rowIndex,
          0,
          newItem
        )
        break

      case 'column':
        newItem = { ...element, id: newId }
        page.data.styles.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].columns.splice(
          currentElement.columnIndex,
          0,
          newItem
        )
        break

      case 'element':
        newItem = { ...element, id: newId }
        page.data.styles.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].columns[
          currentElement.columnIndex
        ].elements.splice(currentElement.elementIndex, 0, newItem)

        const previousContent = page.data.content.find(content => content.id === selectedId)
        page.data.content.push({
          id: newId,
          content: previousContent.content,
          type: previousContent.type,
        })
        break
    }

    updatePage(_.cloneDeep(page))
    updateHovering(false)
  }

  return (
    <>
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
            <div id="hoverBarTop" className="hoverSmallHidden">
              <div className="flex items-center hoverBarLeft rounded-br">
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

                {hoverType !== 'element' && (
                  <div className="py-0 px-2.5 text-sm font-bold uppercase text-white">{hoverType}</div>
                )}
              </div>

              <div className="flex hoverBarRight rounded-bl space-x-1">
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
              updateHovering={updateHovering}
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
