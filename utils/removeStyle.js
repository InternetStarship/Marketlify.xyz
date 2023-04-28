export function removeStyle(key, styles, setStyles, selectedId, page, updatePage) {
  const newStyles = cloneDeep(styles)
  delete newStyles[key]
  setStyles(newStyles)
  updateStyles(newStyles, selectedId, page, updatePage)
}
