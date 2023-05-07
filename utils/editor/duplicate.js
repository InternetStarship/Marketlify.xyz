import { cloneDeep } from 'lodash'
import { findById } from '../utility/findById'
import { findTypeById } from '../utility/findTypeById'
import { getIndexesById } from '../utility/getIndexesById'
import { generateUniqueId } from '../utility/generateUniqueId'

const duplicatedIds = new Set()

function duplicateContent(id, previousId, pageContent) {
  const previousContent = pageContent.find(content => content.id === previousId)
  if (previousContent) {
    pageContent.push({
      ...previousContent,
      id: id,
    })
  }

  return pageContent
}

function duplicateInnerContent(pageContent) {
  duplicatedIds.forEach(content => {
    const id = content.newId
    if (pageContent) {
      pageContent.push({
        ...content,
        id: id,
      })
    }
  })
}

function updateNestedIds(item, existingIds, pageContent = []) {
  if (item.hasOwnProperty('id')) {
    const newId = generateUniqueId(existingIds)
    existingIds.add(item)

    if (item?.type) {
      const content = pageContent.find(content => content.id === item.id)
      if (content)
        duplicatedIds.add({
          ...content,
          newId: newId,
        })
    }

    item.id = newId
  }

  if (item.hasOwnProperty('rows')) {
    item.rows.forEach(row => updateNestedIds(row, existingIds, pageContent))
  }

  if (item.hasOwnProperty('columns')) {
    item.columns.forEach(column => updateNestedIds(column, existingIds, pageContent))
  }

  if (item.hasOwnProperty('elements')) {
    item.elements.forEach(element => {
      updateNestedIds(element, existingIds, pageContent)
    })
  }
}

export function duplicate(callback, page, selectedId, baseExistingIds) {
  let existingIds = new Set(baseExistingIds)

  const element = findById(selectedId, page.data.styles.sections)
  const type = findTypeById(selectedId, page.data.styles.sections)
  const currentElement = getIndexesById(selectedId, page.data.styles.sections)

  let newItem
  const newId = generateUniqueId(existingIds)
  existingIds.add(newId)

  switch (type) {
    case 'section':
      newItem = { ...element, id: newId }
      updateNestedIds(newItem, existingIds, page.data.content)
      page.data.styles.sections.splice(currentElement.sectionIndex, 0, newItem)
      break

    case 'row':
      newItem = { ...element, id: newId }
      updateNestedIds(newItem, existingIds, page.data.content)
      page.data.styles.sections[currentElement.sectionIndex].rows.splice(currentElement.rowIndex, 0, newItem)
      break

    case 'column':
      newItem = { ...element, id: newId }
      updateNestedIds(newItem, existingIds, page.data.content)
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

      duplicateContent(newItem, selectedId, page.data.content)
      break
  }

  duplicateInnerContent(page.data.content)

  return callback(cloneDeep(page))
}
