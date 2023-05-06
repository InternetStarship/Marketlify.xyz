import { useState } from 'react'
import { toast } from 'react-toastify'
import { createFromBlank } from '@/utils/createFromBlank'

function NewFunnelPopup({ state }) {
  const [name, setName] = useState('')
  const [numberOfPages, setNumberOfPages] = useState(1)

  return (
    <>
      {state.popup.open.get() && state.popup.type.get() === 'new-funnel' && (
        <div className="page-modal-overlay">
          <div className="page-modal">
            <div className="flex items-center justify-between w-full border-b border-slate-200 pb-6 mb-6">
              <h2 className="page-modal-title">New Funnel</h2>
              <div>
                <button
                  onClick={() => {
                    state.popup.open.set(false)
                  }}
                  className="page-modal-close-button"
                >
                  Close
                </button>
              </div>
            </div>
            <div className="page-modal-content">
              <div className="flex mb-4 space-x-4">
                <div className="w-3/4">
                  <label>Name</label>
                  <input
                    type="text"
                    className="sidebar-input-full block w-full"
                    value={name}
                    onChange={e => {
                      setName(e.target.value)
                    }}
                  />
                </div>

                <div className="w-1/4">
                  <label>Number of Pages</label>
                  <input
                    type="text"
                    className="sidebar-input-full block w-full"
                    value={numberOfPages}
                    onChange={e => {
                      setNumberOfPages(e.target.value)
                    }}
                  />
                </div>
              </div>

              <button
                className="page-modal-close-button"
                onClick={() => {
                  createFromBlank(
                    (firstPage, funnelData) => {
                      state.funnel.set(funnelData)
                      state.page.data.set(firstPage.data)
                      state.page.id.set(firstPage.id)
                      state.page.size.set(firstPage.size)
                      state.page.created_at.set(firstPage.created_at)
                      toast('New funnel created.')
                      state.popup.open.set(false)
                    },
                    name,
                    numberOfPages
                  )
                }}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default NewFunnelPopup
