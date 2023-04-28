import { useState, useEffect } from 'react'
import { FaArrowUp, FaArrowDown, FaPlus, FaCopy, FaTrash } from 'react-icons/fa'
import { duplicate } from '@/utils/duplicate'
import { remove } from '@/utils/remove'
import { move } from '@/utils/move'
import AddDropdown from './AddDropdown'

export default function HoverBar({
  position,
  page,
  updatePage,
  selectedId,
  current,
  hoverType,
  updateHovering,
}) {
  const [updatedPosition, setUpdatedPosition] = useState(position)
  const [existingIds] = useState(new Set())
  const [popup, setPopup] = useState(false)

  useEffect(() => {
    page.data.styles.sections?.forEach(section => {
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
      {current === '' && (
        <div className={'hoverTheme-' + hoverType}>
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
                        updateHovering(false)
                      },
                      -1,
                      page,
                      selectedId
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
                        updateHovering(false)
                      },
                      1,
                      page,
                      selectedId
                    )
                  }}
                  className="p-2 text-white"
                >
                  <FaArrowDown />
                </button>

                {hoverType !== 'element' && (
                  <div className="py-0 px-2.5 text-sm font-bold uppercase text-white">{hoverType}</div>
                )}
              </div>

              <div className="flex hoverBarRight rounded-bl space-x-1">
                <button
                  onClick={() => {
                    duplicate(
                      page => {
                        updatePage(page)
                        updateHovering(false)
                      },
                      page,
                      selectedId,
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
                        updateHovering(false)
                      },
                      page,
                      selectedId
                    )
                  }}
                  className="p-2 text-white"
                >
                  <FaTrash />
                </button>
              </div>
            </div>

            <AddDropdown
              popup={popup}
              hoverType={hoverType}
              setPopup={setPopup}
              updatePage={updatePage}
              page={page}
              selectedId={selectedId}
              existingIds={existingIds}
              updateHovering={updateHovering}
              id="hoverBarBottom"
            >
              <FaPlus />
            </AddDropdown>
          </main>
        </div>
      )}
    </>
  )
}
