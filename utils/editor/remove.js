import { findTypeById } from '../utility/findTypeById'
import { getIndexesById } from '../utility/getIndexesById'
import { cloneDeep } from 'lodash'

export function remove(state) {
  const type = findTypeById(state.active.selectedId.get(), state.page.data.get().styles.sections)

  const confirm = window.confirm(`Are you sure you want to delete this ${type}?`)
  if (!confirm) return

  const currentElement = getIndexesById(state.active.selectedId.get(), state.page.data.get().styles.sections)

  switch (type) {
    case 'section':
      state.page.data.styles.sections.set(items => {
        items.splice(currentElement.sectionIndex, 1)
        return items
      })
      break

    case 'row':
      state.page.data.styles.sections[currentElement.sectionIndex].rows.set(items => {
        items.splice(currentElement.rowIndex, 1)
        return items
      })
      break

    case 'column':
      state.page.data.styles.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].columns.set(
        items => {
          items.splice(currentElement.columnIndex, 1)
          return items
        },
      )
      break

    case 'element':
      state.page.data.styles.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].columns[
        currentElement.columnIndex
      ].elements.set(items => {
        items.splice(currentElement.elementIndex, 1)
        return items
      })

      break
  }

  state.active.selectedId.set('')
  state.active.current.set('')
  state.active.hovering.set(false)

  const page = JSON.stringify(cloneDeep(state.page.get()))
  localStorage.setItem(`marketlify_v4_page_${state.page.id.get()}`, page)
}
