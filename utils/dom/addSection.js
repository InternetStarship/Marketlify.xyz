import { generateUniqueId } from '../utility/generateUniqueId'
import defaults from '@/utils/defaults'
import { cloneDeep } from 'lodash'

function createSection(newId, width) {
  return cloneDeep({
    ...defaults.section,
    id: newId,
    style: {
      maxWidth: width,
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: '10px',
    },
  })
}

export function addSection(state, width) {
  const newId = generateUniqueId(state.active.existingIds.get())
  const position = state.page.data
    .get()
    .styles.sections.findIndex(section => section.id === state.active.selectedId.get())

  const newSection = createSection(newId, width)

  state.page.data.styles.sections.set(sections => {
    sections.splice(position + 1, 0, newSection)
    return sections
  })

  state.active.addDropdown.set(false)
  state.active.hovering.set(false)
}
