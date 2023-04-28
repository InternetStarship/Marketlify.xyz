import { generateUniqueId } from './generateUniqueId'
import { getIndexesById } from './getIndexesById'
import { cloneDeep } from 'lodash'
import defaults from '@/utils/defaults'

export function addRow(callback, totalColumns, existingIds, selectedId, page) {
  const newId = generateUniqueId(existingIds)
  const columns = Array.from({ length: totalColumns }, () => {
    const newColumn = cloneDeep(defaults.column)
    newColumn.id = generateUniqueId(existingIds)
    return newColumn
  })
  const { sectionIndex } = getIndexesById(selectedId, page.data.styles.sections)

  const position = page.data.styles.sections[sectionIndex].rows.findIndex(row => row.id === selectedId)

  const rowSchema = {
    ...defaults.row,
    id: newId,
    columns: columns,
  }

  page.data.styles.sections[sectionIndex].rows.splice(position + 1, 0, rowSchema)

  callback(cloneDeep(page))
}
