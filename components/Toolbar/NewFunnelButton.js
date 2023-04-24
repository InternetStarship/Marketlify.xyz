/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

import { AiOutlinePlusCircle } from 'react-icons/ai'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import moment from 'moment'
import generateUUID from '@/utils/generateUUID'

function NewFunnelButton({ load, modalOpenNew = false, updateFunnel }) {
  const [isModalOpen, setIsModalOpen] = useState(modalOpenNew)
  const [name, setName] = useState('')
  const [numberOfPages, setNumberOfPages] = useState(1)

  useEffect(() => {
    setIsModalOpen(modalOpenNew)
  }, [modalOpenNew])

  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  function createFromBlank() {
    const funnelId = generateUUID()
    const numberOfPagesInt = parseInt(numberOfPages)

    const funnelKey = `marketlify_v3_funnel_${funnelId}`

    const funnelData = {
      id: funnelId,
      name: name,
      size: 0,
      pages: [],
      created_at: moment().format('MMMM Do YYYY, h:mm:ss a'),
    }

    for (let i = 0; i < numberOfPagesInt; i++) {
      const pageId = generateUUID()
      const pageKey = `marketlify_v3_page_${pageId}`
      const pageName = `Page ${i + 1}`
      funnelData.pages.push(pageId)

      const pageData = {
        id: pageId,
        name: pageName,
        size: 0,
        created_at: moment().format('MMMM Do YYYY, h:mm:ss a'),
        data: {
          seo: {
            title: pageName,
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
        },
      }

      localStorage.setItem(pageKey, JSON.stringify(pageData))
    }

    localStorage.setItem(funnelKey, JSON.stringify(funnelData))

    const firstPage = JSON.parse(localStorage.getItem(`marketlify_v3_page_${funnelData.pages[0]}`))

    updateFunnel(funnelData)
    load(firstPage.data)
    toast('New funnel created.')
    closeModal()
  }

  return (
    <>
      <button
        onClick={openModal}
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

              <button className="page-modal-close-button" onClick={createFromBlank}>
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
