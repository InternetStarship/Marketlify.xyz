import { cloneDeep } from 'lodash'
import { findById } from './findById'
import { findTypeById } from './findTypeById'
import { getIndexesById } from './getIndexesById'
import { generateUniqueId } from './generateUniqueId'

export function duplicate(callback, page, selectedId, existingIds) {
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
      page.data.styles.sections[currentElement.sectionIndex].rows.splice(currentElement.rowIndex, 0, newItem)
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

  return callback(cloneDeep(page))
}
