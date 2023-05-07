export function moveLayer(callback, page, dragLayer, hoverLayer, dragIndex, hoverIndex, type) {
  const updatedPage = { ...page }

  const findSection = sectionId => updatedPage.data.styles.sections.find(section => section.id === sectionId)
  const findRow = (section, rowId) => section.rows.find(row => row.id === rowId)
  const findColumn = (row, columnId) => row.columns.find(column => column.id === columnId)

  switch (type) {
    case 'section':
      moveArrayItem(updatedPage.data.styles.sections, dragIndex, hoverIndex)
      break

    case 'row':
      {
        const dragSection = findSection(dragLayer.sectionId)
        const hoverSection = findSection(hoverLayer.sectionId)

        moveArrayItem(dragSection.rows, dragIndex, hoverIndex)

        if (dragLayer.sectionId !== hoverLayer.sectionId) {
          const row = dragSection.rows.splice(dragIndex, 1)[0]
          hoverSection.rows.splice(hoverIndex, 0, row)
        }
      }
      break

    case 'column':
      {
        const dragSection = findSection(dragLayer.sectionId)
        const hoverSection = findSection(hoverLayer.sectionId)

        const dragRow = findRow(dragSection, dragLayer.rowId)
        const hoverRow = findRow(hoverSection, hoverLayer.rowId)

        moveArrayItem(dragRow.columns, dragIndex, hoverIndex)

        if (dragLayer.rowId !== hoverLayer.rowId) {
          const column = dragRow.columns.splice(dragIndex, 1)[0]
          hoverRow.columns.splice(hoverIndex, 0, column)
        }
      }
      break

    case 'element':
      {
        const dragSection = findSection(dragLayer.sectionId)
        const hoverSection = findSection(hoverLayer.sectionId)

        const dragRow = findRow(dragSection, dragLayer.rowId)
        const hoverRow = findRow(hoverSection, hoverLayer.rowId)

        const dragColumn = findColumn(dragRow, dragLayer.columnId)
        const hoverColumn = findColumn(hoverRow, hoverLayer.columnId)

        moveArrayItem(dragColumn.elements, dragIndex, hoverIndex)

        if (dragLayer.columnId !== hoverLayer.columnId) {
          const element = dragColumn.elements.splice(dragIndex, 1)[0]
          hoverColumn.elements.splice(hoverIndex, 0, element)
        }
      }
      break

    default:
      break
  }

  const debouncedUpdatePage = debounce(callback, 100)

  debouncedUpdatePage(updatedPage)
}

const moveArrayItem = (arr, fromIndex, toIndex) => {
  const item = arr[fromIndex]
  arr.splice(fromIndex, 1)
  arr.splice(toIndex, 0, item)
}

function debounce(func, wait) {
  let timeout
  return function (...args) {
    const context = this
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(context, args), wait)
  }
}
