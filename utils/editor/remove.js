import { cloneDeep } from 'lodash'
import { findTypeById } from '../utility/findTypeById'
import { getIndexesById } from '../utility/getIndexesById'

export function remove(callback, page, selectedId) {
  const confirm = window.confirm('Are you sure you want to delete this?')
  if (!confirm) return

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

  return callback(cloneDeep(updatedPage))
}
