import { toKebabCase } from '../utility/toKebabCase'

export function buildCSS(type, styles, properties) {
  const cssProps = []

  Object.entries(styles).forEach(([key, value]) => {
    cssProps.push(`${toKebabCase(key)}: ${value};`)
  })

  let selector = ''
  let elementID = 'element'
  if (properties && properties?.id) {
    elementID = properties.id
  }

  switch (type) {
    case 'default':
      selector = `#${elementID}`
      break
    case 'hover':
      selector = `#${elementID}:hover`
      break
    case 'mobile':
      selector = `@media (max-width: 480px) {\n  #${elementID}`
      break
    default:
      return ''
  }

  return (
    `${selector} {\n` +
    cssProps.map(prop => `  ${prop}`).join('\n') +
    (type === 'mobile' ? '\n}' : '') +
    '\n}'
  )
}
