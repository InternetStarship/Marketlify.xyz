import { generateUniqueId } from './generateUniqueId'
import { cloneDeep } from 'lodash'
import defaults from '@/utils/defaults'

export function addSection(callback, width, existingIds, page, selectedId) {
  const newId = generateUniqueId(existingIds)
  const position = page.data.styles.sections.findIndex(section => section.id === selectedId)

  const sectionSchema = {
    ...defaults.section,
    id: newId,
    style: {
      maxWidth: width,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  }

  page.data.styles.sections.splice(position + 1, 0, sectionSchema)

  return callback(cloneDeep(page))
}
