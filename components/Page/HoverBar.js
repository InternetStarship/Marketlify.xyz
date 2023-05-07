import { useState, useEffect } from 'react'
import { FaArrowUp, FaArrowDown, FaCopy, FaTrash } from 'react-icons/fa'
import { duplicate } from '@/utils/editor/duplicate'
import { remove } from '@/utils/editor/remove'
import { move } from '@/utils/editor/move'
import AddDropdown from '../Dropdown/AddDropdown'
import { cloneDeep } from 'lodash'

export default function HoverBar({ state }) {
  const [popup, setPopup] = useState(false)

  useEffect(() => {
    const existingIds = new Set()
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
    state.active.existingIds.set(cloneDeep(existingIds))
  }, [])

  return (
    <>
      {state.active.current.get() === '' && (
        <div className={'hoverTheme-' + state.active.hoverType.get()}>
          <main
            id="hoverBar"
            className="border-2 fixed"
            style={{
              width: state.active.position.get().width,
              height: state.active.position.get().height,
              top: state.active.position.get().top,
              left: state.active.position.get().left,
              zIndex: 999999,
            }}
          >
            <div id="hoverBarTop" className="hoverSmallHidden">
              <div className="flex items-center hoverBarLeft rounded-br">
                <button
                  onClick={() => {
                    move(state, 'up')
                  }}
                  className="p-2 text-white"
                >
                  <FaArrowUp />
                </button>
                <button
                  onClick={() => {
                    move(state, 'down')
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
                    duplicate(state)
                  }}
                  className="p-2 text-white"
                >
                  <FaCopy />
                </button>
                <button
                  onClick={() => {
                    remove(state)
                  }}
                  className="p-2 text-white"
                >
                  <FaTrash />
                </button>
              </div>
            </div>

            <AddDropdown state={state} popup={popup} setPopup={setPopup} />
          </main>
        </div>
      )}
    </>
  )
}
