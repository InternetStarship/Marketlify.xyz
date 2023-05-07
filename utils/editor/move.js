import { findTypeById } from '../utility/findTypeById'
import { getIndexesById } from '../utility/getIndexesById'

export function move(state, directionText) {
  const direction = directionText === 'up' ? -1 : 1
  const type = findTypeById(state.active.selectedId.get(), state.page.data.get().styles.sections)
  const currentElement = getIndexesById(state.active.selectedId.get(), state.page.data.get().styles.sections)

  moveItem(state, type, direction, currentElement)
  state.active.hovering.set(false)
}

function moveItem(state, type, direction, currentElement) {
  if (currentElement.sectionIndex >= 0) {
    switch (type) {
      case 'section':
        state.page.data.styles.sections.set(items => {
          return item(items, currentElement.sectionIndex, currentElement.sectionIndex + direction)
        })
        break

      case 'row':
        state.page.data.styles.sections[currentElement.sectionIndex].rows.set(items => {
          return item(items, currentElement.rowIndex, currentElement.rowIndex + direction)
        })
        break

      case 'column':
        state.page.data.styles.sections[currentElement.sectionIndex].rows[
          currentElement.rowIndex
        ].columns.set(items => {
          return item(items, currentElement.columnIndex, currentElement.columnIndex + direction)
        })
        break

      case 'element':
        state.page.data.styles.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].columns[
          currentElement.columnIndex
        ].elements.set(items => {
          return item(items, currentElement.elementIndex, currentElement.elementIndex + direction)
        })

        break
    }
  }
}

function item(items, currentIndex, newIndex) {
  if (newIndex < items.length) {
    const item = items.splice(currentIndex, 1)[0]
    items.splice(newIndex, 0, item)
    return items
  }
}
