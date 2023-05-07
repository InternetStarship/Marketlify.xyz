import { generateUniqueId } from './generateUniqueId'
import defaults from '@/utils/defaults'
import { cloneDeep } from 'lodash'

export function addSection(state, width) {
  const newId = generateUniqueId(state.active.existingIds.get())
  const position = state.page.data
    .get()
    .styles.sections.findIndex(section => section.id === state.active.selectedId.get())

  state.page.data.styles.sections.set(sections => {
    sections.splice(
      position + 1,
      0,
      cloneDeep({
        ...defaults.section,
        id: newId,
        style: {
          maxWidth: width,
          marginLeft: 'auto',
          marginRight: 'auto',
          padding: '20px',
        },
      })
    )

    return sections
  })

  state.active.addDropdown.set(false)
  state.active.hovering.set(false)
}
