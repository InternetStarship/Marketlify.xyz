import { SlSizeFullscreen } from 'react-icons/sl'
import { AiOutlineMobile } from 'react-icons/ai'
import { BiDesktop } from 'react-icons/bi'
import { FaDownload, FaTabletAlt, FaUndo } from 'react-icons/fa'
import { updateRowLayout } from '@/utils/updateRowLayout'
import SaveButton from './SaveButton'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { IoFunnel } from 'react-icons/io5'

export default function Toolbar({ state }) {
  return (
    <main className="w-full bg-white border-b border-slate-300 shadow-sm p-2 flex justify-between items-center">
      <div className="flex space-x-2">
        <button
          onClick={() => {
            state.popup.open.set(true)
            state.popup.type.set('funnels')
          }}
          className="flex items-center toolbar-button"
          data-tooltip-id="tooltip"
          data-tooltip-content="Saved Funnels"
        >
          <IoFunnel />
          <span className="hidden xl:inline-block">Funnels</span>
        </button>

        <button
          onClick={() => {
            state.popup.open.set(true)
            state.popup.type.set('new-funnel')
          }}
          className="flex items-center toolbar-button"
          data-tooltip-id="tooltip"
          data-tooltip-content="Create New Funnel"
        >
          <AiOutlinePlusCircle />
          <span className="hidden xl:inline-block">New Funnel</span>
        </button>
      </div>

      {state.page.data.get() && (
        <>
          <div className="items-center space-x-2 hidden md:flex">
            <button
              onClick={() => {
                state.active.viewport.set('desktop')
                updateRowLayout()
              }}
              className={'toolbar-button' + (state.active.viewport.get() === 'desktop' ? ' active' : '')}
              data-tooltip-id="tooltip"
              data-tooltip-content="Desktop"
            >
              <BiDesktop />
            </button>
            <button
              onClick={() => {
                state.active.viewport.set('tablet')
                updateRowLayout()
              }}
              className={'toolbar-button' + (state.active.viewport.get() === 'tablet' ? ' active' : '')}
              data-tooltip-id="tooltip"
              data-tooltip-content="Tablet"
            >
              <FaTabletAlt />
            </button>
            <button
              onClick={() => {
                state.active.viewport.set('mobile')
                updateRowLayout()
              }}
              className={'toolbar-button' + (state.active.viewport.get() === 'mobile' ? ' active' : '')}
              data-tooltip-id="tooltip"
              data-tooltip-content="Mobile"
            >
              <AiOutlineMobile />
            </button>
            <button
              onClick={() => {
                state.active.fullscreen.set(true)
              }}
              className="toolbar-button"
              data-tooltip-id="tooltip"
              data-tooltip-content="Fullscreen"
            >
              <SlSizeFullscreen />
            </button>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => {
                if (state.undo.history.get().length > 0) {
                  state.undo.isAction.set(true)
                  state.page.data.set(undoHistory[undoHistory.length - 1])
                  state.undo.history.set(prevHistory => prevHistory.slice(0, -1))
                }
              }}
              className="flex items-center toolbar-button"
              data-tooltip-id="tooltip"
              data-tooltip-content="Undo Last Change"
            >
              <FaUndo />
            </button>

            <SaveButton state={state} />

            <button
              onClick={() => {
                state.popup.open.set(true)
                state.popup.type.set('export')
              }}
              className="flex items-center toolbar-button"
              data-tooltip-id="tooltip"
              data-tooltip-content="Publish Your Site"
            >
              <FaDownload />
              <span className="hidden xl:inline-block">Export</span>
            </button>
          </div>
        </>
      )}
    </main>
  )
}
