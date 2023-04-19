/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

import { BsDatabase } from 'react-icons/bs'
import { useState } from 'react'
import { toast } from 'react-toastify'

function PageButton({ load }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const pages = getPagesFromLocalStorage()

  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  function handlePageClick(pageId) {
    const page = getPageFromLocalStorage(pageId)
    if (page) {
      closeModal()
      load(page.data)
      toast('Page has been loaded.')
    } else {
      toast(`Page with ID "${pageId}" not found in local storage.`)
    }
  }

  function getPageFromLocalStorage(pageId) {
    if (typeof localStorage !== 'undefined') {
      const key = `marketlify~${pageId}`
      const data = localStorage.getItem(key)
      if (data !== null) {
        return { id: pageId, data: JSON.parse(data) }
      }
    }
    return null
  }

  function getPagesFromLocalStorage() {
    const pages = []
    if (typeof localStorage !== 'undefined') {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key.startsWith('marketlify~')) {
          pages.push({
            id: key.substring(11),
            data: JSON.parse(localStorage.getItem(key)),
          })
        }
      }
    }
    return pages
  }

  return (
    <>
      <button
        onClick={openModal}
        className="flex items-center toolbar-button"
        data-tooltip-id="tooltip"
        data-tooltip-content="My Pages"
      >
        <BsDatabase />
      </button>
      {isModalOpen && (
        <div className="page-modal-overlay">
          <div className="page-modal">
            <h2 className="page-modal-title">Select a page to load:</h2>
            <ul className="page-list">
              {pages.map(page => (
                <li key={page.id}>
                  <button onClick={() => handlePageClick(page.id)}>{page.id.split('~')[0]}</button>
                </li>
              ))}
            </ul>
            <button onClick={closeModal} className="page-modal-close-button">
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default PageButton
