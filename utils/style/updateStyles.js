import { cloneDeep } from 'lodash'
import { findTypeById } from '../utility/findTypeById'
import { getIndexesById } from '../utility/getIndexesById'

export function updateStyles(newStyles, selectedId, state) {
  if (selectedId) {
    const currentElement = getIndexesById(selectedId, state.page.data.styles.sections.get())
    const type = findTypeById(selectedId, state.page.data.styles.sections.get())

    if (type === 'section') {
      state.page.data.styles.sections[currentElement.sectionIndex].style.set(newStyles)
    } else if (type === 'row') {
      state.page.data.styles.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].style.set(
        newStyles,
      )
    } else if (type === 'column') {
      state.page.data.styles.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].columns[
        currentElement.columnIndex
      ].style.set(newStyles)
    } else if (type === 'element') {
      state.page.data.styles.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].columns[
        currentElement.columnIndex
      ].elements[currentElement.elementIndex].style.set(newStyles)
    }
  } else {
    state.page.data.styles.body = newStyles
  }
}
