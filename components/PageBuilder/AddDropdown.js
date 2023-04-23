/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

import { IoText, IoImageOutline } from 'react-icons/io5'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import { RxButton } from 'react-icons/rx'
import { TbColumns1, TbColumns2, TbColumns3, TbColumnInsertLeft, TbContainer } from 'react-icons/tb'
import getIndexesById from '@/utils/getIndexesById'
import defaults from '@/utils/defaults'
import _ from 'lodash'
import generateUniqueId from '@/utils/generateUniqueId'

export default function AddDropdown({
  children,
  existingIds,
  hoverType,
  popup,
  selectedId,
  page,
  updatePage,
  setPopup,
  id,
  updateHovering,
}) {
  function addElement(type) {
    const newId = generateUniqueId(existingIds)
    const currentElement = getIndexesById(selectedId, page.styles.sections)

    const newItem = _.cloneDeep(defaults.elements[type])
    newItem.id = newId
    newItem.type = type

    page.styles.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].columns[
      currentElement.columnIndex
    ].elements.push(newItem)

    let data = {}

    switch (type) {
      case 'headline':
        data = {
          content: 'Main Headline Content',
        }
        break
      case 'subheadline':
        data = {
          content: 'Sub Headline Example',
        }
        break
      case 'paragraph':
        data = {
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Nullam id dolor id nibh ultricies vehicula ut id elit.',
        }
        break
      case 'image':
        data = {
          src: 'https://placekitten.com/300/300',
        }
        break
      case 'button':
        data = {
          content: 'Example Content',
          url: 'https://example.com',
        }
        break
    }

    data = { ...data, id: newId, type: type }

    page.content.push(data)

    setPopup(false)
    updatePage(_.cloneDeep(page))
    updateHovering(false)
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
    setPopup(false)
    updatePage(_.cloneDeep(page))
    updateHovering(false)
  }

  function addRow(totalColumns) {
    const newId = generateUniqueId(existingIds)
    const columns = Array.from({ length: totalColumns }, () => {
      const newColumn = _.cloneDeep(defaults.column)
      newColumn.id = generateUniqueId(existingIds)
      return newColumn
    })

    const newItem = {
      ...defaults.row,
      id: newId,
      columns: columns,
    }

    const { sectionIndex } = getIndexesById(selectedId, page.styles.sections)
    page.styles.sections[sectionIndex].rows.push(newItem)
    setPopup(false)
    updatePage(_.cloneDeep(page))
    updateHovering(false)
  }

  return (
    <div
      className="relative"
      id={id}
      onClick={() => {
        setPopup(true)
      }}
      data-tooltip-id="tooltip"
      data-tooltip-content={`Add ${hoverType}`}
    >
      {children}

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
                  addElement('subheadline')
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
  )
}
