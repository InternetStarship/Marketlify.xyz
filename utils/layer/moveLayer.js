// TODO: moveOutside not working
export function moveLayer(state, dragLayer, hoverLayer, dragIndex, hoverIndex, type) {
  const findSection = sectionId =>
    state.page.data.styles.sections.get().findIndex(section => section.id === sectionId)
  const findRow = (section, rowId) => section.rows.get().findIndex(row => row.id === rowId)
  const findColumn = (row, columnId) => row.columns.get().findIndex(column => column.id === columnId)

  switch (type) {
    case 'section':
      moveInside(state.page.data.styles.sections, dragIndex, hoverIndex)
      break

    case 'row':
      {
        const dragSectionIndex = findSection(dragLayer.sectionId)
        const hoverSectionIndex = findSection(hoverLayer.sectionId)

        if (dragSectionIndex !== hoverSectionIndex) {
          moveOutside(
            state.page.data.styles.sections.at(dragSectionIndex).rows,
            state.page.data.styles.sections.at(hoverSectionIndex).rows,
            dragIndex,
            hoverIndex
          )
        } else {
          moveInside(state.page.data.styles.sections.at(dragSectionIndex).rows, dragIndex, hoverIndex)
        }
      }
      break

    case 'column':
      {
        const dragSectionIndex = findSection(dragLayer.sectionId)
        const hoverSectionIndex = findSection(hoverLayer.sectionId)
        const dragRowIndex = findRow(state.page.data.styles.sections.at(dragSectionIndex), dragLayer.rowId)
        const hoverRowIndex = findRow(state.page.data.styles.sections.at(hoverSectionIndex), hoverLayer.rowId)

        if (dragSectionIndex !== hoverSectionIndex || dragRowIndex !== hoverRowIndex) {
          moveOutside(
            state.page.data.styles.sections.at(dragSectionIndex).rows.at(dragRowIndex).columns,
            state.page.data.styles.sections.at(hoverSectionIndex).rows.at(hoverRowIndex).columns,
            dragIndex,
            hoverIndex
          )
        } else {
          moveInside(
            state.page.data.styles.sections.at(dragSectionIndex).rows.at(dragRowIndex).columns,
            dragIndex,
            hoverIndex
          )
        }
      }
      break

    case 'element':
      {
        const dragSectionIndex = findSection(dragLayer.sectionId)
        const hoverSectionIndex = findSection(hoverLayer.sectionId)
        const dragRowIndex = findRow(state.page.data.styles.sections.at(dragSectionIndex), dragLayer.rowId)
        const hoverRowIndex = findRow(state.page.data.styles.sections.at(hoverSectionIndex), hoverLayer.rowId)
        const dragColumnIndex = findColumn(
          state.page.data.styles.sections.at(dragSectionIndex).rows.at(dragRowIndex),
          dragLayer.columnId
        )
        const hoverColumnIndex = findColumn(
          state.page.data.styles.sections.at(hoverSectionIndex).rows.at(hoverRowIndex),
          hoverLayer.columnId
        )

        if (
          dragSectionIndex !== hoverSectionIndex ||
          dragRowIndex !== hoverRowIndex ||
          dragColumnIndex !== hoverColumnIndex
        ) {
          moveOutside(
            state.page.data.styles.sections
              .at(dragSectionIndex)
              .rows.at(dragRowIndex)
              .columns.at(dragColumnIndex).elements,
            state.page.data.styles.sections
              .at(hoverSectionIndex)
              .rows.at(hoverRowIndex)
              .columns.at(hoverColumnIndex).elements,
            dragIndex,
            hoverIndex
          )
        } else {
          moveInside(
            state.page.data.styles.sections
              .at(dragSectionIndex)
              .rows.at(dragRowIndex)
              .columns.at(dragColumnIndex).elements,
            dragIndex,
            hoverIndex
          )
        }
      }
      break

    default:
      break
  }
}

const moveInside = (arr, fromIndex, toIndex) => {
  arr.set(items => {
    const item = items.splice(fromIndex, 1)[0]
    items.splice(toIndex, 0, item)
    return items
  })
}

const moveOutside = (dragArr, hoverArr, fromIndex, toIndex) => {
  let itemToMove

  dragArr.set(items => {
    itemToMove = items.splice(fromIndex, 1)[0]
    return items
  })

  hoverArr.set(items => {
    items.splice(toIndex, 0, itemToMove)
    return items
  })
}
