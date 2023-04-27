export function prettySize(text) {
  const bytes = Buffer.byteLength(text, 'utf8')

  const units = [
    { unit: 'B', size: 1 },
    { unit: 'KB', size: 1024 },
    { unit: 'MB', size: 1024 ** 2 },
  ]
  const appropriateUnit = units.reverse().find(u => bytes >= u.size) || units[0]
  const value = (bytes / appropriateUnit.size).toFixed(2)
  const prettyValue = value.replace(/\.00$/, '')

  return `${prettyValue} ${appropriateUnit.unit}`
}
