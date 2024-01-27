import { generateUniqueId } from '../utility/generateUniqueId'
import { getIndexesById } from '../utility/getIndexesById'
import { cloneDeep } from 'lodash'
import defaults from '@/utils/defaults'

function createColumns(totalColumns, existingIds) {
  return Array.from({ length: totalColumns }, () => {
    const newColumn = cloneDeep(defaults.column)
    newColumn.id = generateUniqueId(existingIds)
    return newColumn
  })
}

export function addRow(state, totalColumns) {
  const newId = generateUniqueId(state.active.existingIds.get())
  const columns = createColumns(totalColumns, state.active.existingIds.get())

  const { sectionIndex } = getIndexesById(
    state.active.selectedId.get(),
    state.page.data.get().styles.sections
  )
  const position = state.page.data
    .get()
    .styles.sections[sectionIndex].rows.findIndex(row => row.id === state.active.selectedId.get())

  const newRow = cloneDeep({
    ...defaults.row,
    id: newId,
    columns: columns,
    style: {
      padding: '10px',
    },
  })

  state.page.data.styles.sections[sectionIndex].rows.set(rows => {
    rows.splice(position + 1, 0, newRow)
    return rows
  })

  state.active.addDropdown.set(false)
  state.active.hovering.set(false)

  state.active.current.set('')
  const page = JSON.stringify(cloneDeep(state.page.get()))
  localStorage.setItem(`marketlify_v4_page_${state.page.id.get()}`, page)
}
