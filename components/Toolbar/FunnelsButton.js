/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

import { IoFunnel } from 'react-icons/io5'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { FaRegTrashAlt } from 'react-icons/fa'
import { AiOutlineCopy } from 'react-icons/ai'
import generateUUID from '@/utils/generateUUID'
import _ from 'lodash'

function FunnelsButton({ load, modalOpen = false, updateFunnel, updateUndoHistory }) {
  const [isModalOpen, setIsModalOpen] = useState(modalOpen)
  const [funnels, setFunnels] = useState([])

  useEffect(() => {
    setFunnels(getFunnels())
  }, [])

  useEffect(() => {
    setIsModalOpen(modalOpen)
  }, [modalOpen])

  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  function loadFunnel(funnel, id) {
    const page = getPage(id)
    if (page) {
      closeModal()
      updateFunnel(funnel)
      load(page)
      updateUndoHistory([_.cloneDeep(page)])
      toast('Funnel has been loaded.')
    } else {
      toast(`Error: Funnel with ID "${id}" not found.`)
    }
  }

  function getPage(id) {
    if (typeof localStorage !== 'undefined') {
      const key = `marketlify_v3_page_${id}`
      const data = localStorage.getItem(key)
      if (data !== null) {
        return JSON.parse(data)
      }
    }
    return null
  }

  function getFunnels() {
    const funnels = []
    if (typeof localStorage !== 'undefined') {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        const data = JSON.parse(localStorage.getItem(key))
        if (key.startsWith('marketlify_v3_funnel_')) {
          funnels.push(data)
        }
      }
    }

    return funnels
  }

  function removeFunnel(id) {
    if (typeof localStorage !== 'undefined') {
      const funnelKey = `marketlify_v3_funnel_${id}`
      const funnelDataString = localStorage.getItem(funnelKey)
      const funnelData = JSON.parse(funnelDataString)

      if (funnelData && Array.isArray(funnelData.pages)) {
        funnelData.pages.forEach(pageId => {
          const pageKey = `marketlify_v3_page_${pageId}`
          localStorage.removeItem(pageKey)
        })
      }

      localStorage.removeItem(funnelKey)
    }
    return null
  }

  function cloneFunnel(id) {
    if (typeof localStorage !== 'undefined') {
      const originalFunnelKey = `marketlify_v3_funnel_${id}`
      const originalFunnelDataString = localStorage.getItem(originalFunnelKey)
      const originalFunnelData = JSON.parse(originalFunnelDataString)

      if (originalFunnelData) {
        const duplicatedFunnelId = generateUUID()
        const duplicatedFunnelKey = `marketlify_v3_funnel_${duplicatedFunnelId}`
        const duplicatedFunnelData = JSON.parse(JSON.stringify(originalFunnelData))

        duplicatedFunnelData.id = duplicatedFunnelId

        duplicatedFunnelData.pages = []

        if (Array.isArray(originalFunnelData.pages)) {
          originalFunnelData.pages.forEach(pageId => {
            const originalPageKey = `marketlify_v3_page_${pageId}`
            const originalPageDataString = localStorage.getItem(originalPageKey)
            const originalPageData = JSON.parse(originalPageDataString)

            if (originalPageData) {
              const duplicatedPageId = generateUUID()
              const duplicatedPageKey = `marketlify_v3_page_${duplicatedPageId}`
              const duplicatedPageData = JSON.parse(JSON.stringify(originalPageData))

              duplicatedPageData.id = duplicatedPageId
              localStorage.setItem(duplicatedPageKey, JSON.stringify(duplicatedPageData))
              duplicatedFunnelData.pages.push(duplicatedPageId)
            }
          })
        }

        localStorage.setItem(duplicatedFunnelKey, JSON.stringify(duplicatedFunnelData))

        return duplicatedFunnelId
      }
    }
    return null
  }

  return (
    <>
      <button
        onClick={openModal}
        className="flex items-center toolbar-button"
        data-tooltip-id="tooltip"
        data-tooltip-content="Saved Funnels"
      >
        <IoFunnel />
        <span className="hidden xl:inline-block">Funnels</span>
      </button>
      {isModalOpen && (
        <div className="page-modal-overlay">
          <div className="page-modal">
            <div className="flex items-center justify-between w-full border-b border-slate-200 pb-6 mb-4">
              <h2 className="page-modal-title">Funnels</h2>
              <div>
                <button onClick={closeModal} className="page-modal-close-button">
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
                  <h3 className="mb-6 text-lg">
                    It looks like you haven't created any funnels yet. This is where all of your saved funnels
                    will be stored for easy access, even when you're offline.
                  </h3>
                  <h3 className="mb-6 text-lg">
                    To get started, simply create a new funnel using our intuitive page builder, and save your
                    changes to your local browser for safekeeping.
                  </h3>
                  <h3 className="text-lg">
                    Your funnels & pages are always private and accessible only to you.
                  </h3>
                </div>
              )}

              {funnels.map(funnel => (
                <div key={funnel.id} className="funnel" data-name={funnel.name}>
                  <div className="page-item" onClick={() => loadFunnel(funnel, funnel.pages[0])}>
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
