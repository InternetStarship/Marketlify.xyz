import { cloneDeep } from 'lodash'
import { findTypeById } from '../utility/findTypeById'
import { getIndexesById } from '../utility/getIndexesById'

export function updateStyles(newStyles, selectedId, page, updatePage) {
  if (selectedId) {
    const currentElement = getIndexesById(selectedId, page.data.styles.sections)
    const type = findTypeById(selectedId, page.data.styles.sections)

    if (type === 'section') {
      page.data.styles.sections[currentElement.sectionIndex].style = newStyles
    } else if (type === 'row') {
      page.data.styles.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].style = newStyles
    } else if (type === 'column') {
      page.data.styles.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].columns[
        currentElement.columnIndex
      ].style = newStyles
    } else if (type === 'element') {
      page.data.styles.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].columns[
        currentElement.columnIndex
      ].elements[currentElement.elementIndex].style = newStyles
    }
  } else {
    page.data.styles.body = newStyles
  }

  updatePage(cloneDeep(page))
}
