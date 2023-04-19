/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

import { BsDatabase } from 'react-icons/bs'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { FaTrashAlt, FaCopy } from 'react-icons/fa'
import moment from 'moment'

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
      const key = `marketlify_v1_${pageId}`
      const data = localStorage.getItem(key)
      if (data !== null) {
        return { id: pageId, name: data.name, size: data.size, date: data.date, data: JSON.parse(data.data) }
      }
    }
    return null
  }

  function getPagesFromLocalStorage() {
    const pages = []
    if (typeof localStorage !== 'undefined') {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        const data = JSON.parse(localStorage.getItem(key))
        if (key.startsWith('marketlify_v1_')) {
          pages.push({
            id: key.substring(11),
            name: data.name,
            size: data.size,
            date: data.date,
            data: data.data,
          })
        }
      }
    }
    return pages
  }

  function removePage(pageId) {
    if (typeof localStorage !== 'undefined') {
      const key = `marketlify_v1_${pageId}`
      localStorage.removeItem(key)
    }
    return null
  }

  function duplicatePage(pageId) {
    if (typeof localStorage !== 'undefined') {
      const key = `marketlify_v1_${pageId}-duplicated`
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
            <div className="flex items-center justify-between w-full border-b border-slate-200 pb-6 mb-6">
              <h2 className="page-modal-title">Pages Library</h2>
              <div>
                <button onClick={closeModal} className="page-modal-close-button">
                  Close
                </button>
              </div>
            </div>
            <ul className="page-list">
              {pages.length === 0 && (
                <div className="px-12 py-3">
                  <h3 className="mb-6 text-lg">
                    It looks like you haven't created any pages yet. Your Pages Library is where all of your
                    saved pages will be stored for easy access, even when you're offline.
                  </h3>
                  <h3 className="mb-6 text-lg">
                    To get started, simply create a new page using our intuitive page builder, and save your
                    changes to your local browser for safekeeping.
                  </h3>
                  <h3 className="text-lg">Your pages are always private and accessible only to you.</h3>
                </div>
              )}
              {pages.map(page => (
                <li key={page.id}>
                  <div className="page-item" onClick={() => handlePageClick(page.id)}>
                    <div>
                      <h3>{page.name}</h3>
                      <h4 className="text-xs text-slate-400">
                        Created {moment(page.date).fromNow()} - Size: {page.size}
                      </h4>
                    </div>
                    <div className="space-x-2">
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
