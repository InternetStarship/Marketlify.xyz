import { cloneDeep } from 'lodash'
import { updateStyles } from './updateStyles'

export function removeStyle(key, styles, setStyles, selectedId, state, updatePage) {
  const newStyles = cloneDeep(styles)
  delete newStyles[key]
  setStyles(newStyles)
  updateStyles(newStyles, selectedId, state, updatePage)
}
