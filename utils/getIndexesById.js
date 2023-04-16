/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

function getIndexesById(id, sections) {
  for (let sectionIndex = 0; sectionIndex < sections.length; sectionIndex++) {
    const section = sections[sectionIndex]
    if (section.id === id) {
      return { sectionIndex, rowIndex: -1, columnIndex: -1, elementIndex: -1 }
    }

    const rows = section.rows
    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
      const row = rows[rowIndex]
      if (row.id === id) {
        return { sectionIndex, rowIndex, columnIndex: -1, elementIndex: -1 }
      }

      const columns = row.columns
      for (let columnIndex = 0; columnIndex < columns.length; columnIndex++) {
        const column = columns[columnIndex]
        if (column.id === id) {
          return { sectionIndex, rowIndex, columnIndex, elementIndex: -1 }
        }

        const elements = column.elements
        for (let elementIndex = 0; elementIndex < elements.length; elementIndex++) {
          const element = elements[elementIndex]
          if (element.id === id) {
            return { sectionIndex, rowIndex, columnIndex, elementIndex }
          }
        }
      }
    }
  }

  return null
}

export default getIndexesById
