import { useState, useEffect, useRef } from 'react'
import { cloneDeep } from 'lodash'
import { ToastContainer } from 'react-toastify'
import { Tooltip } from 'react-tooltip'
import Head from '@/components/Head'
import Canvas from '@/components/Canvas'
import Toolbar from '@/components/Toolbar'
import Sidebar from '@/components/Sidebar'
import Breadcrumb from '@/components/Breadcrumb'
import NoPage from '@/components/NoPage'
import NoFunnel from '@/components/NoFunnel'
import Welcome from '@/components/Welcome'

export default function Builder() {
  const prevPageRef = useRef()
  const [funnel, setFunnel] = useState(null)
  const [page, setPage] = useState(null)
  const [pageName, setPageName] = useState('Untitled Page')
  const [modalOpenBrowse, setModalOpenBrowse] = useState(false)
  const [modalOpenNew, setModalOpenNew] = useState(false)
  const [welcomePopup, setWelcomePopup] = useState(true)
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
        return cloneDeep(newHistory.slice(startIndex))
      })
    }
    setIsUndoAction(false)
  }, [page])

  const updatePage = updated => {
    if (updated === null) {
      setPage(null)
    } else {
      setPage(updated)
      setPageName(updated.name)
      setUpdated(Date.now())
    }
  }

  const undo = () => {
    if (undoHistory.length > 0) {
      setIsUndoAction(true)
      setPage(undoHistory[undoHistory.length - 1])
      setUndoHistory(prevHistory => prevHistory.slice(0, -1))
      setUpdated(Date.now())
    }
  }

  const edit = element => {
    if (element) {
      setSelectedId(element.id)
      setCurrent('editing')
    } else {
      setSelectedId(null)
      setCurrent(null)
    }
  }

  return (
    <main className="page-builder-by-wynter-jones">
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
          close={() => {
            setCurrent('')
          }}
          updatePage={updatePage}
          updateCurrent={value => {
            setCurrent(value)
          }}
          updateFunnel={setFunnel}
          updateUndoHistory={setUndoHistory}
        />

        <div className="w-full">
          {!funnel && (
            <Welcome
              newFunnel={() => {
                setModalOpenNew(true)
                setWelcomePopup(false)
              }}
              browseFunnels={() => {
                setModalOpenBrowse(true)
                setWelcomePopup(false)
              }}
              welcomePopup={welcomePopup}
            />
          )}

          {!funnel && !page && <NoFunnel />}
          {funnel && !page && <NoPage />}

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

      {current && selectedId && <Breadcrumb page={page} selectedId={selectedId} edit={edit} />}

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
