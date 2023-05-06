import { generateUniqueId } from './generateUniqueId'
import { cloneDeep } from 'lodash'
import defaults from '@/utils/defaults'

export function addSection(state, width, existingIds) {
  const newId = generateUniqueId(existingIds)
  const position = state.page.data
    .get()
    .styles.sections.findIndex(section => section.id === state.active.selectedId.get())

  const sectionSchema = {
    ...defaults.section,
    id: newId,
    style: {
      maxWidth: width,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  }

  // state.page.data.styles.sections.splice(position + 1, 0, sectionSchema)
  state.page.data.styles.sections.set([
    ...state.page.data.styles.sections.get().splice(position + 1, 0, sectionSchema),
  ])

  setPopup(false)
  updatePage(page)
  updateHovering(false)
}
