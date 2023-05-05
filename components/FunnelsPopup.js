import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { FaRegTrashAlt } from 'react-icons/fa'
import { AiOutlineCopy } from 'react-icons/ai'
import { cloneDeep } from 'lodash'
import { getFunnels } from '@/utils/getFunnels'
import { removeFunnel } from '@/utils/removeFunnel'
import { cloneFunnel } from '@/utils/cloneFunnel'
import { loadFunnel } from '@/utils/loadFunnel'

function FunnelsButton({ state }) {
  const [funnels, setFunnels] = useState([])

  useEffect(() => {
    setFunnels(getFunnels())
  }, [])

  return (
    <>
      {state.popup.open.get() && state.popup.type.get() === 'funnels' && (
        <div className="page-modal-overlay">
          <div className="page-modal">
            <div className="flex items-center justify-between w-full border-b border-slate-200 pb-6 mb-4">
              <h2 className="page-modal-title">Funnels</h2>
              <div>
                <button
                  onClick={() => {
                    state.popup.open.set(false)
                    state.popup.type.set('')
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
                  <h3 className="mb-6 text-xl font-bold">Oops! No funnels here...yet! 🤔</h3>
                  <p className="mb-6 text-lg">
                    This is where all your crafted funnels will reside, ready for easy access - even when
                    you're offline.
                  </p>
                  <p className="mb-6 text-lg">
                    To begin your funnel-making adventure, dive into our user-friendly page builder and hit
                    'save' to store your masterpiece safely in your local browser.
                  </p>
                </div>
              )}

              {funnels.map(funnel => (
                <div key={funnel.id} className="funnel" data-name={funnel.name}>
                  <div
                    className="page-item"
                    onClick={() =>
                      loadFunnel(
                        (funnel, page) => {
                          state.popup.open.set(false)
                          state.popup.type.set('')
                          state.funnel.set(funnel)
                          state.page.content.set(page)
                          state.page.name.set(page.name)
                          state.undo.history.set([cloneDeep(page)])
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
