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

  const newItem = {
    ...defaults.row,
    id: newId,
    columns: columns,
  }

  const { sectionIndex } = getIndexesById(selectedId, page.data.styles.sections)
  page.data.styles.sections[sectionIndex].rows.push(newItem)

  callback(cloneDeep(page))
}
