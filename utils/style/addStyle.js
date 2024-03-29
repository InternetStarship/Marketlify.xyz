import { cloneDeep } from 'lodash'
import { camelCaseToTitleCase } from '../utility/camelCaseToTitleCase'
import { updateStyles } from '@/utils/style/updateStyles'

export function addStyle(selectedStyle, styles, setStyles, selectedId, state, updatePage) {
  const newStyles = cloneDeep(styles)
  if (!newStyles[selectedStyle]) {
    newStyles[selectedStyle] = ''
  }
  setStyles(newStyles)
  updateStyles(newStyles, selectedId, state, updatePage)
  setTimeout(() => {
    document.querySelector('.clear-icon').click()
    document.querySelectorAll('#sidebar .sidebar-fieldset').forEach(el => {
      const name = camelCaseToTitleCase(selectedStyle)
      const text = el.innerText.toLowerCase()
      if (text.includes(name.toLowerCase())) {
        if (el.querySelector('input')) {
          el.querySelector('input').focus()
        }
      }
    })
  }, 100)
}
