import { cloneDeep } from 'lodash'
import { findTypeById } from './findTypeById'
import { getIndexesById } from './getIndexesById'
import { moveCaretBack } from './moveCaretBack'
import { processCSSProperty } from '@/utils/processCSSProperty'
import { shouldAppendPX } from './shouldAppendPX'

export function handlePropertyChange(event, properties, setProperties, updatePage, page, selectedId) {
  const { name, value } = event.target
  const newProperties = { ...properties, [name]: processCSSProperty({ name, value }) }

  if (shouldAppendPX({ name, value })) {
    setTimeout(() => {
      moveCaretBack(2)
    }, 0)
  }

  if (selectedId) {
    const currentElement = getIndexesById(selectedId, page.data.styles.sections)
    const type = findTypeById(selectedId, page.data.styles.sections)

    if (type === 'section') {
      page.data.styles.sections[currentElement.sectionIndex].properties = newProperties
    } else if (type === 'row') {
      page.data.styles.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].properties =
        newProperties
    } else if (type === 'column') {
      page.data.styles.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].columns[
        currentElement.columnIndex
      ].properties = newProperties
    } else if (type === 'element') {
      page.data.styles.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].columns[
        currentElement.columnIndex
      ].elements[currentElement.elementIndex].properties = newProperties
    }
  }

  setProperties(newProperties)
  updatePage(cloneDeep(page))
}
