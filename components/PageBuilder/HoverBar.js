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
import { IoText, IoImageOutline } from 'react-icons/io5'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import { RxButton } from 'react-icons/rx'
import { TbColumns1, TbColumns2, TbColumns3, TbColumnInsertLeft, TbContainer } from 'react-icons/tb'

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

  function generateUniqueId(existingIds) {
    let uniqueId

    do {
      uniqueId = Math.floor(Math.random() * 1000000)
    } while (existingIds.has(uniqueId))

    return uniqueId
  }

  function add() {
    const type = findTypeById(selectedId, page.styles.sections)
    const currentElement = getIndexesById(selectedId, page.styles.sections)

    page.styles.sections.forEach(section => {
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
    const newId = generateUniqueId(existingIds)

    switch (type) {
      case 'section':
        newItem = { ...defaults.section, id: newId }
        page.styles.sections.splice(currentElement.sectionIndex + 1, 0, newItem)

        break

      case 'row':
        newItem = { ...defaults.row, id: newId }
        page.styles.sections[currentElement.sectionIndex].rows.splice(currentElement.rowIndex + 1, 0, newItem)

        break

      case 'column':
        newItem = { ...defaults.column, id: newId }
        page.styles.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].columns.splice(
          currentElement.columnIndex + 1,
          0,
          newItem
        )

        break

      case 'element':
        newItem = { ...defaults.elements[0], id: newId }
        page.styles.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].columns[
          currentElement.columnIndex
        ].elements.splice(currentElement.elementIndex + 1, 0, newItem)

        page.content.push({
          id: newId,
          content: 'Example Content',
          type: 'headline',
        })
        break

      default:
        return
    }

    updatePage(page)
  }

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

  function addElement(type) {
    const newId = generateUniqueId(existingIds)
    const currentElement = getIndexesById(selectedId, page.styles.sections)

    const newItem = { ...defaults.elements[0], id: newId, type: type }

    page.styles.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].columns[
      currentElement.columnIndex
    ].elements.push(newItem)

    page.content.push({
      id: newId,
      content: 'Example Content',
      src: 'https://placekitten.com/300/300',
      type: type,
    })

    updatePage(page)
  }

  function addSection(width) {
    const newId = generateUniqueId(existingIds)

    const newItem = {
      ...defaults.section,
      id: newId,
      style: {
        maxWidth: width,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    }

    page.styles.sections.push(newItem)
    updatePage(page)
  }

  function addRow(totalColumns) {
    const newId = generateUniqueId(existingIds)
    const initialColumn = { ...defaults.column, id: generateUniqueId(existingIds) }
    const columns = Array.from({ length: totalColumns }, () => ({ ...initialColumn }))

    const newItem = {
      ...defaults.row,
      id: newId,
      columns: columns,
    }

    const { sectionIndex } = getIndexesById(selectedId, page.styles.sections)
    page.styles.sections[sectionIndex].rows.push(newItem)
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

            <div
              className="relative"
              id="hoverBarBottom"
              onClick={() => {
                setPopup(true)
              }}
              data-tooltip-id="tooltip"
              data-tooltip-content={`Add New ${hoverType}`}
            >
              <FaPlus />

              {popup && (
                <div className={`blocks-popup ${hoverType}Theme`}>
                  {hoverType === 'section' && (
                    <>
                      <div
                        onClick={() => {
                          addSection('1650px')
                        }}
                        className="block"
                      >
                        <TbContainer />
                        <span>Full</span>
                      </div>
                      <div
                        onClick={() => {
                          addSection('1280px')
                        }}
                        className="block"
                      >
                        <TbContainer />
                        <span>Extra Large</span>
                      </div>
                      <div
                        onClick={() => {
                          addSection('1080px')
                        }}
                        className="block"
                      >
                        <TbContainer />
                        <span>Large</span>
                      </div>
                      <div
                        onClick={() => {
                          addSection('960px')
                        }}
                        className="block"
                      >
                        <TbContainer />
                        <span>Medium</span>
                      </div>
                      <div
                        onClick={() => {
                          addSection('760px')
                        }}
                        className="block"
                      >
                        <TbContainer />
                        <span>Small</span>
                      </div>
                      <div
                        onClick={() => {
                          addSection('480px')
                        }}
                        className="block"
                      >
                        <TbContainer />
                        <span>Extra Small</span>
                      </div>
                    </>
                  )}
                  {hoverType === 'row' && (
                    <>
                      <div
                        onClick={() => {
                          addRow(1)
                        }}
                        className="block"
                      >
                        <TbColumns1 />
                        <span>1 Column</span>
                      </div>
                      <div
                        onClick={() => {
                          addRow(2)
                        }}
                        className="block"
                      >
                        <TbColumns2 />
                        <span>2 Columns</span>
                      </div>
                      <div
                        onClick={() => {
                          addRow(3)
                        }}
                        className="block"
                      >
                        <TbColumns3 />
                        <span>3 Columns</span>
                      </div>
                      <div
                        onClick={() => {
                          addRow(4)
                        }}
                        className="block"
                      >
                        <TbColumnInsertLeft />
                        <span>4 Columns</span>
                      </div>
                      <div
                        onClick={() => {
                          addRow(5)
                        }}
                        className="block"
                      >
                        <TbColumnInsertLeft />
                        <span>5 Columns</span>
                      </div>
                      <div
                        onClick={() => {
                          addRow(6)
                        }}
                        className="block"
                      >
                        <TbColumnInsertLeft />
                        <span>6 Columns</span>
                      </div>
                    </>
                  )}
                  {hoverType === 'column' && (
                    <>
                      <div className="block">
                        <TbColumnInsertLeft />
                        <span>Add 1 Column</span>
                      </div>
                    </>
                  )}
                  {hoverType === 'element' && (
                    <>
                      <div
                        onClick={() => {
                          addElement('headline')
                        }}
                        className="block"
                      >
                        <IoText />
                        <span>Headline</span>
                      </div>
                      <div
                        onClick={() => {
                          addElement('sub-headline')
                        }}
                        className="block"
                      >
                        <IoText />
                        <span>Sub Headline</span>
                      </div>
                      <div
                        onClick={() => {
                          addElement('paragraph')
                        }}
                        className="block"
                      >
                        <IoText />
                        <span>Paragraph</span>
                      </div>
                      <div
                        onClick={() => {
                          addElement('list')
                        }}
                        className="block"
                      >
                        <AiOutlineUnorderedList />
                        <span>List</span>
                      </div>
                      <div
                        onClick={() => {
                          addElement('image')
                        }}
                        className="block"
                      >
                        <IoImageOutline />
                        <span>Image</span>
                      </div>
                      <div
                        onClick={() => {
                          addElement('button')
                        }}
                        className="block"
                      >
                        <RxButton />
                        <span>Button</span>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </main>
        </div>
      )}
    </>
  )
}
