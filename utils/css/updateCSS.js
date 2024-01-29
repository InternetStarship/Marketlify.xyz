import { buildCSS } from './buildCSS'
import { updateStyles } from '@/utils/style/updateStyles'

export function updateCSS(value = null, codeBox = null, secondaryTab = null, selectedId, state, updatePage) {
  let codes = codeBox
  const cssProps = codes
    .match(/{([^}]*)}/)[1]
    .trim()
    .split(';')

  const styleObj = {}
  cssProps.forEach(prop => {
    if (prop.trim() !== '') {
      const [key, value] = prop.split(':').map(item => item.trim())
      const camelCaseKey = key.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase())
      styleObj[camelCaseKey] = value
    }
  })

  if (!codes) {
    console.log(secondaryTab, 'updateCSS secondaryTab')
    codes = buildCSS(secondaryTab, styleObj)
  }
  if (value) {
    codes = value
  }

  // setStyles(styleObj)
  updateStyles(styleObj, selectedId, state, updatePage)
}
