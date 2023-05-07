import numericCSSProperties from '../css/numericCSSProperties'

export function shouldAppendPX(obj) {
  if (numericCSSProperties.includes(obj.name)) {
    return false
  }

  const numericValue = parseFloat(obj.value)
  if (!isNaN(numericValue) && numericValue.toString() === obj.value) {
    return true
  }

  return false
}
