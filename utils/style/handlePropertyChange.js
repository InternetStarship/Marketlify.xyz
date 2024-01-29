import { findTypeById } from '../utility/findTypeById'
import { getIndexesById } from '../utility/getIndexesById'
import { moveCaretBack } from '../utility/moveCaretBack'
import { processCSSProperty } from '@/utils/css/processCSSProperty'
import { shouldAppendPX } from '../utility/shouldAppendPX'

export function handlePropertyChange(event, properties, setProperties, state, selectedId) {
  const { name, value } = event.target
  const newProperties = { ...properties, [name]: processCSSProperty({ name, value }) }

  // if (shouldAppendPX({ name, value })) {
  //   setTimeout(() => {
  //     moveCaretBack(2)
  //   }, 0)
  // }

  if (selectedId) {
    const currentElement = getIndexesById(selectedId, state.page.data.styles.sections.get())
    const type = findTypeById(selectedId, state.page.data.styles.sections.get())

    if (type === 'section') {
      state.page.data.styles.sections[currentElement.sectionIndex].properties.set(newProperties)
    } else if (type === 'row') {
      state.page.data.styles.sections[currentElement.sectionIndex].rows[
        currentElement.rowIndex
      ].properties.set(newProperties)
    } else if (type === 'column') {
      state.page.data.styles.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].columns[
        currentElement.columnIndex
      ].properties.set(newProperties)
    } else if (type === 'element') {
      state.page.data.styles.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].columns[
        currentElement.columnIndex
      ].elements[currentElement.elementIndex].properties.set(newProperties)
    }
  }

  setProperties(newProperties)
}
