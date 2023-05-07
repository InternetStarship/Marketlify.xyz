import { getIndexesById } from '@/utils/getIndexesById'
import defaults from '@/utils/defaults'
import { cloneDeep } from 'lodash'
import { generateUniqueId } from '@/utils/generateUniqueId'

export function addElement(state, type, existingIds) {
  const newId = generateUniqueId(existingIds)
  const currentElement = getIndexesById(state.active.selectedId.get(), state.page.data.get().styles.sections)

  const position = state.page.data
    .get()
    .styles.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].columns[
      currentElement.columnIndex
    ].elements.findIndex(element => element.id === state.active.selectedId.get())

  const newPosition = position + 1
  state.page.data.styles.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].columns[
    currentElement.columnIndex
  ].elements.merge({
    [newPosition]: {
      ...defaults.elements[type],
      id: newId,
      type: type,
    },
  })

  console.log(
    state.page.data.styles.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].columns[
      currentElement.columnIndex
    ].elements.get()
  )

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
    case 'customHTML':
      data = {
        html: '<p>Example HTML</p>',
      }
      break
  }

  data = { ...data, id: newId, type: type }

  state.page.data.content.merge([data])

  console.log(state.page.data.content.get())
}
