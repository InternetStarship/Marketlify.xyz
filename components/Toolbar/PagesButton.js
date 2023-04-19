/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

import { BsDatabase } from 'react-icons/bs'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { FaTrashAlt, FaCopy } from 'react-icons/fa'

function PageButton({ load }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [pages, setPages] = useState(getPagesFromLocalStorage())

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

  function removePage(pageId) {
    if (typeof localStorage !== 'undefined') {
      const key = `marketlify~${pageId}`
      localStorage.removeItem(key)
    }
    return null
  }

  function duplicatePage(pageId) {
    if (typeof localStorage !== 'undefined') {
      const key = `marketlify~${pageId}-duplicated`
      const data = getPageFromLocalStorage(pageId)
      localStorage.setItem(key, JSON.stringify(data.data))
    }
    return null
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
            <div className="flex items-center justify-between w-full">
              <h2 className="page-modal-title">My Pages</h2>
              <div>
                <button onClick={closeModal} className="page-modal-close-button">
                  Close
                </button>
              </div>
            </div>
            <ul className="page-list">
              {pages.map(page => (
                <li key={page.id}>
                  <div className="page-item" onClick={() => handlePageClick(page.id)}>
                    <div>
                      <h3>{page.id.split('~')[0]}</h3>
                      <h4 className="text-xs text-slate-400">Created on June 17th, 2817 - Size: 3.2mb</h4>
                    </div>
                    <div>
                      <button
                        onClick={e => {
                          e.stopPropagation()
                          duplicatePage(page.id)
                          setPages(getPagesFromLocalStorage())
                          toast('Page has been duplicated.')
                        }}
                        className="page-item-button"
                      >
                        <FaCopy />
                      </button>
                      <button
                        onClick={e => {
                          e.stopPropagation()
                          removePage(page.id)
                          setPages(getPagesFromLocalStorage())
                          toast('Page has been deleted.')
                        }}
                        className="page-item-button"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}

export default PageButton
