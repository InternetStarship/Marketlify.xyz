export function camelCaseToTitleCase(camelCaseStr) {
  let titleCaseStr = camelCaseStr.replace(/([A-Z])/g, ' $1').toLowerCase()
  titleCaseStr = titleCaseStr.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
  return titleCaseStr
}
