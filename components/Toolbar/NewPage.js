/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

import { AiOutlinePlusCircle } from 'react-icons/ai'
import { useState } from 'react'
import { toast } from 'react-toastify'

function NewPageButton({ load }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [name, setName] = useState('')

  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  function createFromBlank() {
    load({
      seo: {
        title: name,
        description: '',
        url: '',
        image: '',
        favicon: '',
      },
      code: {
        head: '',
        footer: '',
      },
      styles: {
        body: {
          backgroundColor: '#ffffff',
        },
        sections: [],
      },
      content: [],
    })
    toast('New page created.')
    closeModal()
  }

  return (
    <>
      <button
        onClick={openModal}
        className="flex items-center toolbar-button"
        data-tooltip-id="tooltip"
        data-tooltip-content="My Pages"
      >
        <AiOutlinePlusCircle />
        <span className="hidden xl:inline-block">New Page</span>
      </button>
      {isModalOpen && (
        <div className="page-modal-overlay">
          <div className="page-modal">
            <div className="flex items-center justify-between w-full border-b border-slate-200 pb-6 mb-6">
              <h2 className="page-modal-title">New Page</h2>
              <div>
                <button onClick={closeModal} className="page-modal-close-button">
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

              <button className="toolbar-button" onClick={createFromBlank}>
                Create Page
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default NewPageButton
