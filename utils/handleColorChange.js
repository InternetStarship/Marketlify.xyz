export function handleColorChange(color, type, styles, setStyles, handleSave) {
  let newStyles = {
    ...styles,
    [type]: color.hex,
  }
  if (color.rgb.a) {
    newStyles = {
      ...styles,
      [type]: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`,
    }
  }

  setStyles(newStyles)
  handleSave(newStyles)
}
