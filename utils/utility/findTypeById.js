export function findTypeById(id, sections) {
  for (const section of sections) {
    if (section.id === id) {
      return 'section'
    }

    const rows = section.rows
    for (const row of rows) {
      if (row.id === id) {
        return 'row'
      }

      const columns = row.columns
      for (const column of columns) {
        if (column.id === id) {
          return 'column'
        }

        const elements = column.elements
        for (const element of elements) {
          if (element.id === id) {
            return 'element'
          }
        }
      }
    }
  }

  return null
}
