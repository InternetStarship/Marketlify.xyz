import { buildCSS } from './buildCSS'

export function updateCSS(
  value = null,
  codeBox = null,
  secondaryTab = null,
  selectedId,
  page,
  updatePage,
  setStyles
) {
  let codes = codeBox
  if (!codes) {
    codes = buildCSS(secondaryTab)
  }
  if (value) {
    codes = value
  }
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

  setStyles(styleObj)
  updateStyles(styleObj, selectedId, page, updatePage)
}
