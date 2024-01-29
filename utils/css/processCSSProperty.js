import numericCSSProperties from './numericCSSProperties'

export function processCSSProperty(obj) {
  if (!obj || typeof obj.name !== 'string' || typeof obj.value === 'undefined') {
    return null
  }

  if (numericCSSProperties.includes(obj.name)) {
    return obj.value
  }

  const numericValue = parseFloat(obj.value)
  if (!isNaN(numericValue) && numericValue.toString() === obj.value) {
    return obj.value
  }

  return obj.value
}
