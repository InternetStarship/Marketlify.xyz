import { getIndexesById } from '@/utils/getIndexesById'
import defaults from '@/utils/defaults'
import { cloneDeep } from 'lodash'
import { generateUniqueId } from '@/utils/generateUniqueId'

export function addElement(callback, type, existingIds, selectedId, page) {
  const newId = generateUniqueId(existingIds)
  const currentElement = getIndexesById(selectedId, page.data.styles.sections)

  const newItem = cloneDeep(defaults.elements[type])
  newItem.id = newId
  newItem.type = type

  page.data.styles.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].columns[
    currentElement.columnIndex
  ].elements.push(newItem)

  let data = {}

  switch (type) {
    case 'headline':
      data = {
        content: 'Main Headline Content',
      }
      break
    case 'subheadline':
      data = {
        content: 'Sub Headline Example',
      }
      break
    case 'paragraph':
      data = {
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Nullam id dolor id nibh ultricies vehicula ut id elit.',
      }
      break
    case 'button':
      data = {
        content: 'Example Content',
      }
      break
    case 'list':
      data = {
        content: 'Example Content',
      }
      break
    case 'label':
      data = {
        content: 'Label Name',
      }
      break
    case 'checkbox':
      data = {
        content: 'Accept terms of service',
      }
      break
    case 'radio':
      data = {
        content: 'Radio option',
      }
      break
    case 'select':
      data = {
        options: ['Option 1', 'Option 2'],
      }
      break
  }

  data = { ...data, id: newId, type: type }

  page.data.content.push(data)

  return callback(cloneDeep(page))
}
