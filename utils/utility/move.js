import { cloneDeep } from 'lodash'
import { findTypeById } from './findTypeById'
import { getIndexesById } from './getIndexesById'

export function move(callback, direction, page, selectedId) {
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

  callback(cloneDeep(page))
}

function moveItem(array, currentIndex, direction) {
  const newIndex = currentIndex + direction
  if (newIndex >= 0 && newIndex < array.length) {
    const item = array.splice(currentIndex, 1)[0]
    array.splice(newIndex, 0, item)
  }
}
