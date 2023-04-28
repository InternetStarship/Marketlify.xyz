import { cloneDeep } from 'lodash'
import { findById } from './findById'
import { findTypeById } from './findTypeById'
import { getIndexesById } from './getIndexesById'
import { generateUniqueId } from './generateUniqueId'

function updateContent(item, selectedId, pageContent) {
  const previousContent = pageContent.find(content => content.id === selectedId)
  if (previousContent) {
    pageContent.push({
      id: item.id,
      content: previousContent.content,
      type: previousContent.type,
    })
  }
}

function updateNestedIds(item, existingIds, pageContent) {
  if (item.hasOwnProperty('id')) {
    const oldId = item.id
    const newId = generateUniqueId(existingIds)
    existingIds.add(item)
    item.id = newId

    if (item.hasOwnProperty('elements')) {
      console.log('hey', pageContent)
      updateContent(item, oldId, pageContent)
    }
  }

  if (item.hasOwnProperty('rows')) {
    item.rows.forEach(row => updateNestedIds(row, existingIds, pageContent))
  }

  if (item.hasOwnProperty('columns')) {
    item.columns.forEach(column => updateNestedIds(column, existingIds, pageContent))
  }

  if (item.hasOwnProperty('elements')) {
    item.elements.forEach(element => updateNestedIds(element, existingIds, pageContent))
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

      updateContent(newItem, selectedId, page.data.content)

      break
  }

  console.log(page)
  return callback(cloneDeep(page))
}
