import { useState } from 'react'
import { createFromBlank } from '@/utils/project/createFromBlank'

function NewProjectPopup({ state }) {
  const [name, setName] = useState('')
  const [numberOfPages, setNumberOfPages] = useState(1)

  const close = () => {
    state.popup.open.set(false)
    state.popup.type.set('')
  }

  return (
    <>
      {state.popup.open.get() && state.popup.type.get() === 'new-project' && (
        <div className="page-modal-overlay">
          <div className="page-modal">
            <div className="flex items-center justify-between w-full border-b border-slate-200 pb-6 mb-6">
              <h2 className="page-modal-title">New Project</h2>
              {state.project.id.get() && (
                <div>
                  <button onClick={close} className="page-modal-close-button">
                    Close
                  </button>
                </div>
              )}
              {!state.project.id.get() && (
                <div>
                  <button
                    onClick={() => {
                      state.popup.type.set('projects')
                    }}
                    className="page-modal-close-button"
                  >
                    Browse Projects
                  </button>
                </div>
              )}
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
                  createFromBlank(state, name, numberOfPages)
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

export default NewProjectPopup
