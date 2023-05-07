export function handleFontChange(font, styles, setStyles, handleSave) {
  const newStyles = { ...styles, ['fontFamily']: font }
  setStyles(newStyles)
  handleSave(newStyles)
}
