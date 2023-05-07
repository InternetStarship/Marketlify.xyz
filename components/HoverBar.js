import { useState, useEffect } from 'react'
import { FaArrowUp, FaArrowDown, FaCopy, FaTrash } from 'react-icons/fa'
import { duplicate } from '@/utils/duplicate'
import { remove } from '@/utils/remove'
import { move } from '@/utils/move'
import AddDropdown from './AddDropdown'

export default function HoverBar({ state, position, page, updatePage }) {
  const [updatedPosition, setUpdatedPosition] = useState(position)
  const [existingIds] = useState(new Set())
  const [popup, setPopup] = useState(false)

  useEffect(() => {
    state.page.data.get().styles.sections?.forEach(section => {
      existingIds.add(section.id)
      section.rows.forEach(row => {
        existingIds.add(row.id)
        row.columns.forEach(column => {
          existingIds.add(column.id)
          column.elements.forEach(element => {
            existingIds.add(element.id)
          })
        })
      })
    })
  }, [])

  useEffect(() => {
    setUpdatedPosition(position)
    setPopup(false)
  }, [position])

  return (
    <>
      {state.active.current.get() === '' && (
        <div className={'hoverTheme-' + state.active.hoverType.get()}>
          <main
            id="hoverBar"
            className="border-2 fixed"
            style={{
              width: updatedPosition.width,
              height: updatedPosition.height,
              top: updatedPosition.top,
              left: updatedPosition.left,
              zIndex: 999999,
            }}
          >
            <div id="hoverBarTop" className="hoverSmallHidden">
              <div className="flex items-center hoverBarLeft rounded-br">
                <button
                  onClick={() => {
                    move(
                      page => {
                        updatePage(page)
                        state.active.hovering.set(false)
                      },
                      -1,
                      page,
                      state.active.selectedId.get()
                    )
                  }}
                  className="p-2 text-white"
                >
                  <FaArrowUp />
                </button>
                <button
                  onClick={() => {
                    move(
                      page => {
                        updatePage(page)
                        state.active.hovering.set(false)
                      },
                      1,
                      page,
                      state.active.selectedId.get()
                    )
                  }}
                  className="p-2 text-white"
                >
                  <FaArrowDown />
                </button>

                {state.active.hoverType.get() !== 'element' && (
                  <div className="py-0 px-2.5 text-sm font-bold uppercase text-white">
                    {state.active.hoverType.get()}
                  </div>
                )}
              </div>

              <div className="flex hoverBarRight rounded-bl space-x-1">
                <button
                  onClick={() => {
                    duplicate(
                      page => {
                        updatePage(page)
                        state.active.hovering.set(false)
                      },
                      page,
                      state.active.selectedId.get(),
                      existingIds
                    )
                  }}
                  className="p-2 text-white"
                >
                  <FaCopy />
                </button>
                <button
                  onClick={() => {
                    remove(
                      page => {
                        updatePage(page)
                        state.active.hovering.set(false)
                      },
                      page,
                      state.active.selectedId.get()
                    )
                  }}
                  className="p-2 text-white"
                >
                  <FaTrash />
                </button>
              </div>
            </div>

            <AddDropdown state={state} popup={popup} setPopup={setPopup} existingIds={existingIds} />
          </main>
        </div>
      )}
    </>
  )
}
