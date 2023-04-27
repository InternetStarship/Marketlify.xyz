import { useState, useEffect } from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { toast } from 'react-toastify'
import { createFromBlank } from '@/utils/createFromBlank'

function NewFunnelButton({ load, modalOpenNew = false, updateFunnel }) {
  const [isModalOpen, setIsModalOpen] = useState(modalOpenNew)
  const [name, setName] = useState('')
  const [numberOfPages, setNumberOfPages] = useState(1)

  useEffect(() => {
    setIsModalOpen(modalOpenNew)
  }, [modalOpenNew])

  return (
    <>
      <button
        onClick={() => {
          setIsModalOpen(true)
        }}
        className="flex items-center toolbar-button"
        data-tooltip-id="tooltip"
        data-tooltip-content="Create New Funnel"
      >
        <AiOutlinePlusCircle />
        <span className="hidden xl:inline-block">New Funnel</span>
      </button>
      {isModalOpen && (
        <div className="page-modal-overlay">
          <div className="page-modal">
            <div className="flex items-center justify-between w-full border-b border-slate-200 pb-6 mb-6">
              <h2 className="page-modal-title">New Funnel</h2>
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
            <div className="page-modal-content">
              <div className="mb-2">
                <label>Name</label>
                <input
                  type="text"
                  className="sidebar-input block w-full"
                  value={name}
                  onChange={e => {
                    setName(e.target.value)
                  }}
                />
              </div>

              <div className="mb-2">
                <label>Number of Pages</label>
                <input
                  type="text"
                  className="sidebar-input block w-full"
                  value={numberOfPages}
                  onChange={e => {
                    setNumberOfPages(e.target.value)
                  }}
                />
              </div>

              <button
                className="page-modal-close-button"
                onClick={() => {
                  createFromBlank(
                    (firstPage, funnelData) => {
                      updateFunnel(funnelData)
                      load(firstPage)
                      toast('New funnel created.')
                      setIsModalOpen(false)
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

export default NewFunnelButton
