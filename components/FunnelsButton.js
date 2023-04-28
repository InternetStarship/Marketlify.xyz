import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { FaRegTrashAlt } from 'react-icons/fa'
import { AiOutlineCopy } from 'react-icons/ai'
import { IoFunnel } from 'react-icons/io5'
import { cloneDeep } from 'lodash'
import { getFunnels } from '@/utils/getFunnels'
import { removeFunnel } from '@/utils/removeFunnel'
import { cloneFunnel } from '@/utils/cloneFunnel'
import { loadFunnel } from '@/utils/loadFunnel'

function FunnelsButton({ load, modalOpen = false, updateFunnel, updateUndoHistory }) {
  const [isModalOpen, setIsModalOpen] = useState(modalOpen)
  const [funnels, setFunnels] = useState([])

  useEffect(() => {
    setFunnels(getFunnels())
  }, [])

  useEffect(() => {
    setIsModalOpen(modalOpen)
  }, [modalOpen])

  return (
    <>
      <button
        onClick={() => {
          setIsModalOpen(true)
        }}
        className="flex items-center toolbar-button"
        data-tooltip-id="tooltip"
        data-tooltip-content="Saved Funnels"
      >
        <IoFunnel />
        <span className="hidden xl:inline-block">Funnels</span>
      </button>
      {isModalOpen && (
        <div className="page-modal-overlay">
          <div className="page-modal">
            <div className="flex items-center justify-between w-full border-b border-slate-200 pb-6 mb-4">
              <h2 className="page-modal-title">Funnels</h2>
              <div>
                <button
                  onClick={() => {
                    setIsModalOpen(false)
                  }}
                  className="page-modal-close-button"
                >
                  Close
                </button>
              </div>
            </div>
            {funnels.length > 0 && (
              <>
                <div>
                  <input
                    type="text"
                    placeholder="Search funnels..."
                    className="w-full p-2 active:outline-none border rounded shadow-xs mb-2"
                    defaultValue={''}
                    onChange={event => {
                      const value = event.target.value
                      if (value) {
                        document.querySelectorAll('.funnel').forEach(funnel => {
                          const name = funnel.getAttribute('data-name')
                          if (!name.includes(value)) {
                            funnel.classList.add('hidden')
                          }
                        })
                      } else {
                        document.querySelectorAll('.funnel').forEach(funnel => {
                          funnel.classList.remove('hidden')
                        })
                      }
                    }}
                  />
                </div>
              </>
            )}
            <div className="page-list">
              {funnels.length === 0 && (
                <div className="px-12 py-3">
                  <h3 className="mb-6 text-lg">
                    It looks like you haven't created any funnels yet. This is where all of your saved funnels
                    will be stored for easy access, even when you're offline.
                  </h3>
                  <h3 className="mb-6 text-lg">
                    To get started, simply create a new funnel using our intuitive page builder, and save your
                    changes to your local browser for safekeeping.
                  </h3>
                  <h3 className="text-lg">
                    Your funnels & pages are always private and accessible only to you.
                  </h3>
                </div>
              )}

              {funnels.map(funnel => (
                <div key={funnel.id} className="funnel" data-name={funnel.name}>
                  <div
                    className="page-item"
                    onClick={() =>
                      loadFunnel(
                        (funnel, page) => {
                          setIsModalOpen(false)
                          updateFunnel(funnel)
                          load(page)
                          updateUndoHistory([cloneDeep(page)])
                        },
                        funnel,
                        funnel.pages[0]
                      )
                    }
                  >
                    <div>
                      <h3 className="font-medium">{funnel.name}</h3>
                      <h4 className="text-xs opacity-50">{funnel.pages.length} pages</h4>
                    </div>
                    <div className="space-x-2 pt-2">
                      <button
                        onClick={e => {
                          e.stopPropagation()
                          cloneFunnel(funnel.id)
                          setFunnels(getFunnels())
                          toast('Page has been duplicated.')
                        }}
                        className="page-item-button"
                        data-tooltip-id="tooltip"
                        data-tooltip-content="Duplicate Funnel"
                      >
                        <AiOutlineCopy />
                      </button>
                      <button
                        onClick={e => {
                          e.stopPropagation()
                          const confirm = window.confirm(
                            'Are you sure you want to delete this funnel and all of its pages?'
                          )
                          if (confirm) {
                            removeFunnel(funnel.id)
                            setFunnels(getFunnels())
                            toast('Page has been deleted.')
                          }
                        }}
                        className="page-item-button"
                        data-tooltip-id="tooltip"
                        data-tooltip-content="Delete Funnel"
                      >
                        <FaRegTrashAlt />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default FunnelsButton
