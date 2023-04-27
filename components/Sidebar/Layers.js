import { AiOutlineCloseCircle } from 'react-icons/ai'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import DraggableLayer from './DraggableLayer'

export default function Layers({ page, updatePage, updateCurrent }) {
  const debouncedUpdatePage = debounce(updatePage, 100)

  const moveLayer = (dragLayer, hoverLayer, dragIndex, hoverIndex, type) => {
    const updatedPage = { ...page }

    const moveArrayItem = (arr, fromIndex, toIndex) => {
      const item = arr[fromIndex]
      arr.splice(fromIndex, 1)
      arr.splice(toIndex, 0, item)
    }

    const findSection = sectionId =>
      updatedPage.data.styles.sections.find(section => section.id === sectionId)
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

    debouncedUpdatePage(updatedPage)
  }

  function debounce(func, wait) {
    let timeout
    return function (...args) {
      const context = this
      clearTimeout(timeout)
      timeout = setTimeout(() => func.apply(context, args), wait)
    }
  }

  return (
    <div>
      <div className="text-xl pt-4 pb-2 px-3 text-slate-800 flex items-center justify-between font-bold">
        <h3 className="capitalize">Page Structure</h3>
        <button
          onClick={() => {
            updateCurrent('')
          }}
        >
          <AiOutlineCloseCircle />
        </button>
      </div>
      <div className="p-3 overflow-x-hidden" style={{ height: `calc(100vh - 118px)` }}>
        <DndProvider backend={HTML5Backend}>
          {page.data.styles.sections.map((section, sectionIndex) => (
            <div className="relative">
              <DraggableLayer
                key={section.id}
                index={sectionIndex}
                id={section.id}
                type="section"
                moveLayer={moveLayer}
              >
                {section.rows.map((row, rowIndex) => (
                  <div className="relative">
                    <DraggableLayer
                      key={row.id}
                      index={rowIndex}
                      id={row.id}
                      type="row"
                      moveLayer={moveLayer}
                      sectionId={section.id}
                    >
                      {row.columns.map((column, columnIndex) => (
                        <div className="relative">
                          <DraggableLayer
                            key={column.id}
                            index={columnIndex}
                            id={column.id}
                            type="column"
                            moveLayer={moveLayer}
                            sectionId={section.id}
                            rowId={row.id}
                          >
                            {column.elements.map((element, elementIndex) => (
                              <div className="relative">
                                <DraggableLayer
                                  key={element.id}
                                  index={elementIndex}
                                  id={element.id}
                                  type="element"
                                  content={page.data.content}
                                  moveLayer={moveLayer}
                                  sectionId={section.id}
                                  rowId={row.id}
                                  columnId={column.id}
                                />
                              </div>
                            ))}
                          </DraggableLayer>
                        </div>
                      ))}
                    </DraggableLayer>
                  </div>
                ))}
              </DraggableLayer>
            </div>
          ))}
        </DndProvider>
      </div>
    </div>
  )
}
