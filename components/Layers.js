import { AiOutlineCloseCircle } from 'react-icons/ai'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { moveLayer } from '@/utils/moveLayer'
import DraggableLayer from './DraggableLayer'

export default function Layers({ state }) {
  return (
    <div>
      <div className="text-xl pt-4 pb-2 px-3 text-slate-800 flex items-center justify-between font-bold">
        <h3 className="capitalize">Page Structure</h3>
        <button
          onClick={() => {
            state.active.current.set('')
          }}
        >
          <AiOutlineCloseCircle />
        </button>
      </div>
      <div className="p-3 overflow-x-hidden" style={{ height: `calc(100vh - 118px)` }}>
        <DndProvider backend={HTML5Backend}>
          {state.page.data.get().data.styles.sections.map((section, sectionIndex) => (
            <div className="relative">
              <DraggableLayer
                key={section.id}
                index={sectionIndex}
                id={section.id}
                type="section"
                moveLayer={(dragLayer, hoverLayer, dragIndex, hoverIndex, type) => {
                  moveLayer(
                    value => {
                      state.page.data.set(value)
                    },
                    state.page.data.get(),
                    dragLayer,
                    hoverLayer,
                    dragIndex,
                    hoverIndex,
                    type
                  )
                }}
              >
                {section.rows.map((row, rowIndex) => (
                  <div className="relative">
                    <DraggableLayer
                      key={row.id}
                      index={rowIndex}
                      id={row.id}
                      type="row"
                      moveLayer={(dragLayer, hoverLayer, dragIndex, hoverIndex, type) => {
                        moveLayer(
                          value => {
                            state.page.data.set(value)
                          },
                          state.page.data.get(),
                          dragLayer,
                          hoverLayer,
                          dragIndex,
                          hoverIndex,
                          type
                        )
                      }}
                      sectionId={section.id}
                    >
                      {row.columns.map((column, columnIndex) => (
                        <div className="relative">
                          <DraggableLayer
                            key={column.id}
                            index={columnIndex}
                            id={column.id}
                            type="column"
                            moveLayer={(dragLayer, hoverLayer, dragIndex, hoverIndex, type) => {
                              moveLayer(
                                value => {
                                  state.page.data.set(value)
                                },
                                state.page.data.get(),
                                dragLayer,
                                hoverLayer,
                                dragIndex,
                                hoverIndex,
                                type
                              )
                            }}
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
                                  content={tate.page.content.get().data.content}
                                  moveLayer={(dragLayer, hoverLayer, dragIndex, hoverIndex, type) => {
                                    moveLayer(
                                      value => {
                                        state.page.data.set(value)
                                      },
                                      state.page.data.get(),
                                      dragLayer,
                                      hoverLayer,
                                      dragIndex,
                                      hoverIndex,
                                      type
                                    )
                                  }}
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
