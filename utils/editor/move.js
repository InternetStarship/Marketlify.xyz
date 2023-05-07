import { findTypeById } from '../utility/findTypeById'
import { getIndexesById } from '../utility/getIndexesById'

export function move(state, directionText) {
  const direction = directionText === 'up' ? -1 : 1
  const type = findTypeById(state.active.selectedId.get(), state.page.data.get().styles.sections)
  const currentElement = getIndexesById(state.active.selectedId.get(), state.page.data.get().styles.sections)

  moveItem(state, type, currentElement.sectionIndex, direction, currentElement)

  state.active.hovering.set(false)
}

function moveItem(state, type, currentIndex, direction, currentElement) {
  const newIndex = currentIndex + direction
  if (newIndex >= 0) {
    switch (type) {
      case 'section':
        state.page.data.styles.sections.set(items => {
          return item(items, currentIndex, newIndex)
        })
        break

      case 'row':
        state.page.data.styles.sections[currentElement.sectionIndex].rowsv
        break

      case 'column':
        state.page.data.styles.sections[currentElement.sectionIndex].rows[
          currentElement.rowIndex
        ].columns.set(items => {
          return item(items, currentIndex, newIndex)
        })
        break

      case 'element':
        state.page.data.styles.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].columns[
          currentElement.columnIndex
        ].elements.set(items => {
          return item(items, currentIndex, newIndex)
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
