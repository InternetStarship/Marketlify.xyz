/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

import Canvas from '@/components/PageBuilder/Canvas'
import Toolbar from '@/components/Toolbar/Toolbar'
import Sidebar from '@/components/Sidebar/Sidebar'
import Head from '@/components/ui/Head'
import { useState, useEffect, useRef } from 'react'
import _ from 'lodash'
import { ToastContainer } from 'react-toastify'
import { Tooltip } from 'react-tooltip'
import Popup from '@/components/ui/Popup'
import getIndexesById from '@/utils/getIndexesById'
import { TbSection, TbColumns1 } from 'react-icons/tb'
import { AiOutlineInsertRowAbove } from 'react-icons/ai'
import { RxDot } from 'react-icons/rx'

export default function Builder() {
  const [funnel, setFunnel] = useState(null)
  const [page, setPage] = useState(null)
  const [pageName, setPageName] = useState('Untitled Page')

  const [modalOpenBrowse, setModalOpenBrowse] = useState(false)
  const [modalOpenNew, setModalOpenNew] = useState(false)
  const [welcomePopup, setWelcomePopup] = useState(true)

  const prevPageRef = useRef()
  const [undoHistory, setUndoHistory] = useState([])
  const [isUndoAction, setIsUndoAction] = useState(false)

  const [current, setCurrent] = useState('')
  const [selectedId, setSelectedId] = useState('')
  const [viewport, setViewport] = useState('desktop')
  const [updated, setUpdated] = useState(null)
  const [fullscreen, setFullscreen] = useState(false)

  useEffect(() => {
    prevPageRef.current = page
  }, [page])

  useEffect(() => {
    if (!isUndoAction && prevPageRef.current) {
      setUndoHistory(prevHistory => {
        const newHistory = [...prevHistory, prevPageRef.current]
        const startIndex = Math.max(newHistory.length - 4, 0)
        return _.cloneDeep(newHistory.slice(startIndex))
      })
    }
    setIsUndoAction(false)
  }, [page])

  function undo() {
    if (undoHistory.length > 0) {
      setIsUndoAction(true)
      setPage(undoHistory[undoHistory.length - 1])
      setUndoHistory(prevHistory => prevHistory.slice(0, -1))
      setUpdated(Date.now())
    }
  }

  function edit(element) {
    if (element) {
      setSelectedId(element.id)
      setCurrent('editing')
    } else {
      setSelectedId(null)
      setCurrent(null)
    }
  }

  function closeSidebar() {
    setCurrent('')
  }

  function updatePage(updated) {
    if (updated === null) {
      setPage(null)
    } else {
      setPage(updated)
      setPageName(updated.name)
      setUpdated(Date.now())
    }
  }

  function buildBreadcrumb() {
    if (selectedId && page.data) {
      const currentElement = getIndexesById(selectedId, page.data.styles.sections)
      return Object.entries(currentElement)
        .filter(([key, value]) => value !== -1)
        .map(([key, value]) => (
          <span
            className="cursor-pointer flex text-xs uppercase font-medium items-center hover:text-blue-700 hover:underline"
            data-type={key.replace('Index', '')}
            data-index={value}
            onClick={() => {
              const type = key.replace('Index', '')
              switch (type) {
                case 'section':
                  edit(page.data.styles.sections[value])
                  break
                case 'row':
                  edit(page.data.styles.sections[currentElement.sectionIndex].rows[currentElement.rowIndex])
                  break
                case 'column':
                  edit(
                    page.data.styles.sections[currentElement.sectionIndex].rows[currentElement.rowIndex]
                      .columns[currentElement.columnIndex]
                  )
                  break
                case 'element':
                  edit(
                    page.data.styles.sections[currentElement.sectionIndex].rows[currentElement.rowIndex]
                      .columns[currentElement.columnIndex].elements[currentElement.elementIndex]
                  )
                  break
              }
            }}
          >
            {key === 'sectionIndex' && <TbSection className="mr-1" />}
            {key === 'rowIndex' && <AiOutlineInsertRowAbove className="mr-1" />}
            {key === 'columnIndex' && <TbColumns1 className="mr-1" />}
            {key === 'elementIndex' && <RxDot className="mr-1" />}
            {key.replace('Index', '')}
          </span>
        ))
    } else {
      return []
    }
  }

  return (
    <main className="w-full h-screen overflow-hidden mainBG">
      <Head />

      <Toolbar
        funnel={funnel}
        page={page}
        viewport={viewport}
        updateViewport={value => {
          setViewport(value)
        }}
        load={updatePage}
        updateFunnel={setFunnel}
        updateFullscreen={() => {
          setFullscreen(true)
        }}
        updateCurrent={value => {
          setCurrent(value)
        }}
        name={pageName}
        modalOpen={modalOpenBrowse}
        modalOpenNew={modalOpenNew}
        undo={undo}
        undoHistory={undoHistory}
        updateUndoHistory={setUndoHistory}
      />
      <div className="flex flex-row">
        <Sidebar
          current={current}
          selectedId={selectedId}
          funnel={funnel}
          page={page}
          close={closeSidebar}
          updatePage={updatePage}
          updateCurrent={value => {
            setCurrent(value)
          }}
          updateFunnel={setFunnel}
          updateUndoHistory={setUndoHistory}
        />
        <div className="w-full">
          {!funnel && (
            <>
              <div className="text-center text-slate-500 font-medium text-xs p-12">
                <h3 className="text-xl mb-1">
                  <strong>No funnel loaded.</strong>
                </h3>{' '}
                Please create a funnel or load a funnel from local storage.
              </div>
              <Popup title="Welcome" close={false} open={welcomePopup}>
                <p className="text-lg">
                  Welcome to Marketlify the free funnel builder. You can build your pages for free and export
                  to ClickFunnels 2.0 or download and host yourself.
                </p>

                <div className="bg-slate-50 border border-slate-200 p-6 rounded shadow-sm my-3">
                  <h3 className="text-xl font-bold">Build New Funnel</h3>
                  <p>You can start from scratch and start building a high converting funnel in minutes.</p>
                  <button
                    onClick={() => {
                      setModalOpenNew(true)
                      setWelcomePopup(false)
                    }}
                    className="page-modal-close-button mt-2"
                  >
                    Create New Funnel
                  </button>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-6 rounded shadow-sm">
                  <h3 className="text-xl font-bold">Load Funnel</h3>
                  <p>You load any funnel that you have been working that is saved to your web browser.</p>
                  <button
                    onClick={() => {
                      setModalOpenBrowse(true)
                      setWelcomePopup(false)
                    }}
                    className="page-modal-close-button mt-2"
                  >
                    Browse My Funnels
                  </button>
                </div>
              </Popup>
            </>
          )}
          {funnel && !page && (
            <>
              <div className="text-center text-slate-500 font-medium text-xs p-12">
                <h3 className="text-xl mb-1">
                  <strong>No page loaded.</strong>
                </h3>{' '}
                Please create a page or load a page from local storage.
              </div>
            </>
          )}
          {funnel && page && (
            <Canvas
              funnel={funnel}
              page={page}
              edit={edit}
              current={current}
              viewport={viewport}
              updated={updated}
              updatePage={updatePage}
              selectedId={selectedId}
              updateSelectedId={id => {
                setSelectedId(id)
              }}
              fullscreen={fullscreen}
              updateFullscreen={() => {
                setFullscreen(false)
              }}
              name={pageName}
              updateName={name => {
                setPageName(name)
              }}
              updateCurrent={value => {
                setCurrent(value)
              }}
              updateFunnel={setFunnel}
            />
          )}
        </div>
      </div>

      {current && selectedId && (
        <div
          className="fixed bottom-0 left-0 flex space-x-4 bg-white rounded-tr-md py-3 px-4"
          style={{ left: 340, zIndex: 999999 }}
        >
          {buildBreadcrumb()}
        </div>
      )}

      <ToastContainer
        position="bottom-center"
        autoClose={300}
        hideProgressBar={true}
        newestOnTop={true}
        theme="dark"
        limit={4}
      />

      <Tooltip id="tooltip" />
    </main>
  )
}
