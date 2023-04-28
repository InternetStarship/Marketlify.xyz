import { generateUniqueId } from './generateUniqueId'
import { cloneDeep } from 'lodash'
import defaults from '@/utils/defaults'

export function addSection(callback, width, existingIds, page) {
  const newId = generateUniqueId(existingIds)

  const newItem = {
    ...defaults.section,
    id: newId,
    style: {
      maxWidth: width,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  }

  page.data.styles.sections.push(newItem)

  return callback(cloneDeep(page))
}
