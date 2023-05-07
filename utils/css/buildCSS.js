import { toKebabCase } from '../utility/toKebabCase'

export function buildCSS(type, styles) {
  const cssProps = []

  Object.entries(styles).forEach(([key, value]) => {
    const cssKey = toKebabCase(key)
    cssProps.push(`${cssKey}: ${value};`)
  })

  let selector = ''
  switch (type) {
    case 'default':
      selector = '#element'
      break
    case 'hover':
      selector = '#element:hover'
      break
    case 'mobile':
      selector = '@media (max-width: 480px) {\n  #element'
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
