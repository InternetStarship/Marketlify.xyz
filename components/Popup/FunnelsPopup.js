import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { FaRegTrashAlt } from 'react-icons/fa'
import { AiOutlineCopy } from 'react-icons/ai'
import { getFunnels } from '@/utils/funnel/getFunnels'
import { removeFunnel } from '@/utils/funnel/removeFunnel'
import { cloneFunnel } from '@/utils/funnel/cloneFunnel'
import { loadFunnel } from '@/utils/funnel/loadFunnel'

function FunnelsButton({ state }) {
  const [funnels, setFunnels] = useState([])

  useEffect(() => {
    setFunnels(getFunnels())
  }, [])

  const close = () => {
    state.popup.open.set(false)
    state.popup.type.set('')
  }

  const search = event => {
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
  }

  const duplicate = e => {
    e.stopPropagation()
    cloneFunnel(funnel.id)
    setFunnels(getFunnels())
    toast('Page has been duplicated.')
  }

  const remove = (e, funnelID) => {
    e.stopPropagation()
    const confirm = window.confirm('Are you sure you want to delete this project and all of its pages?')
    if (confirm) {
      removeFunnel(funnelID)
      setFunnels(getFunnels())
      toast('Page has been deleted.')
    }
  }

  return (
    <>
      {state.popup.open.get() && state.popup.type.get() === 'funnels' && (
        <div className="page-modal-overlay">
          <div className="page-modal">
            <div className="flex items-center justify-between w-full border-b border-slate-200 pb-6 mb-4">
              <h2 className="page-modal-title">Projects</h2>
              <div>
                <button onClick={close} className="page-modal-close-button">
                  Close
                </button>
              </div>
            </div>

            {funnels.length > 0 && (
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full p-2 active:outline-none border rounded shadow-xs mb-2"
                defaultValue={''}
                onChange={search}
              />
            )}

            <div className="page-list">
              {funnels.length === 0 && (
                <div className="px-12 py-3">
                  <h3 className="mb-6 text-xl font-bold">Oops! No projects here...yet! 🤔</h3>
                  <p className="mb-6 text-lg">
                    This is where all your crafted web pages will reside, ready for easy access - even when
                    you're offline.
                  </p>
                  <p className="mb-6 text-lg">
                    To begin your page-making adventure, dive into our user-friendly page builder and hit
                    'save' to store your masterpiece safely in your local browser.
                  </p>
                </div>
              )}

              {funnels.map(funnel => (
                <div key={funnel.id} className="funnel" data-name={funnel.name}>
                  <div className="page-item" onClick={() => loadFunnel(state, funnel, funnel.pages[0])}>
                    <div>
                      <h3 className="font-medium">{funnel.name}</h3>
                      <h4 className="text-xs opacity-50">{funnel.pages.length} pages</h4>
                    </div>
                    <div className="space-x-2 pt-2">
                      <button
                        onClick={duplicate}
                        className="page-item-button"
                        data-tooltip-id="tooltip"
                        data-tooltip-content="Duplicate Funnel"
                      >
                        <AiOutlineCopy />
                      </button>
                      <button
                        onClick={e => {
                          remove(e, funnel.id)
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
