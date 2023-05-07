import { generateUniqueId } from './generateUniqueId'
import { getIndexesById } from './getIndexesById'
import { cloneDeep } from 'lodash'
import defaults from '@/utils/defaults'

export function addRow(state, totalColumns) {
  const newId = generateUniqueId(state.active.existingIds.get())
  const columns = Array.from({ length: totalColumns }, () => {
    const newColumn = cloneDeep(defaults.column)
    newColumn.id = generateUniqueId(state.active.existingIds.get())
    return newColumn
  })
  const { sectionIndex } = getIndexesById(
    state.active.selectedId.get(),
    state.page.data.get().styles.sections
  )
  const position = state.page.data
    .get()
    .styles.sections[sectionIndex].rows.findIndex(row => row.id === state.active.selectedId.get())
  const newPosition = position + 1

  state.page.data.styles.sections[sectionIndex].rows.merge({
    [newPosition]: {
      ...defaults.row,
      id: newId,
      columns: columns,
    },
  })

  state.active.addDropdown.set(false)
  state.active.hovering.set(false)
}
