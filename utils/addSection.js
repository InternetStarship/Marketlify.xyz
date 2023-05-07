import { generateUniqueId } from './generateUniqueId'
import defaults from '@/utils/defaults'

export function addSection(state, width, existingIds) {
  const newId = generateUniqueId(existingIds)
  const position = state.page.data
    .get()
    .styles.sections.findIndex(section => section.id === state.active.selectedId.get())

  const newPosition = position + 1
  state.page.data.styles.sections.merge({
    [newPosition]: {
      ...defaults.section,
      id: newId,
      style: {
        maxWidth: width,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
  })

  // setPopup(false)
  // updateHovering(false)
}
