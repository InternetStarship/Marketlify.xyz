import { getIndexesById } from '@/utils/getIndexesById'
import defaults from '@/utils/defaults'
import { generateUniqueId } from '@/utils/generateUniqueId'
import { cloneDeep } from 'lodash'

function createElement(type, newId) {
  const element = cloneDeep({
    ...defaults.elements[type],
    id: newId,
    type: type,
  })

  const data = {
    id: newId,
    type: type,
    content: '',
    ...(() => {
      switch (type) {
        case 'headline':
          return { content: 'Main Headline Content' }
        case 'subheadline':
          return { content: 'Sub Headline Example' }
        case 'paragraph':
          return {
            content:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Nullam id dolor id nibh ultricies vehicula ut id elit.',
          }
        case 'button':
          return { content: 'Button Text' }
        case 'list':
          return { content: 'List Item' }
        case 'label':
          return { content: 'Label Name' }
        case 'checkbox':
          return { content: 'Accept terms of service' }
        case 'radio':
          return { content: 'Radio option' }
        case 'select':
          return { options: ['Option 1', 'Option 2'] }
        case 'customHTML':
          return { html: '<p>Example HTML</p>' }
        default:
          return {}
      }
    })(),
  }

  return { element, data }
}

export function addElement(state, type) {
  const newId = generateUniqueId(state.active.existingIds.get())
  const currentElement = getIndexesById(state.active.selectedId.get(), state.page.data.get().styles.sections)

  const position = state.page.data
    .get()
    .styles.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].columns[
      currentElement.columnIndex
    ].elements.findIndex(element => element.id === state.active.selectedId.get())

  const { element, data } = createElement(type, newId)

  state.page.data.styles.sections[currentElement.sectionIndex].rows[currentElement.rowIndex].columns[
    currentElement.columnIndex
  ].elements.set(elements => {
    elements.splice(position + 1, 0, element)
    return elements
  })

  state.page.data.content.merge([data])
  state.active.addDropdown.set(false)
  state.active.hovering.set(false)
}
