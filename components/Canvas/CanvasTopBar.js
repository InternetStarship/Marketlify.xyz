import { FaCog, FaTrashAlt } from 'react-icons/fa'
import { BiCodeAlt } from 'react-icons/bi'
import { BsLayoutTextWindowReverse } from 'react-icons/bs'

export default function CanvasTopBar({ state }) {
  return (
    <div className="top-bar">
      <div className="url-bar">
        <input
          type="text"
          value={state.page.name.get()}
          onChange={e => {
            state.page.name.set(e.target.value)
          }}
          className="w-full"
        />
      </div>
      <div className="flex space-x-3">
        <button
          data-tooltip-id="tooltip"
          data-tooltip-content="Page Structure"
          onClick={() => {
            state.active.current.set('layers')
            state.active.selectedId.set(null)
          }}
        >
          <BsLayoutTextWindowReverse />
        </button>
        <button
          data-tooltip-id="tooltip"
          data-tooltip-content="Page Settings"
          onClick={() => {
            state.active.current.set('settings')
            state.active.selectedId.set(null)
          }}
        >
          <FaCog />
        </button>
        <button
          data-tooltip-id="tooltip"
          data-tooltip-content="Custom Code"
          onClick={() => {
            state.active.current.set('custom-code')
            state.active.selectedId.set(null)
          }}
        >
          <BiCodeAlt />
        </button>
        <button
          data-tooltip-id="tooltip"
          data-tooltip-content="Delete Page"
          onClick={() => {
            const confirm = window.confirm('Are you sure you want to delete this page?')
            if (confirm) {
              const id = state.page.data.get().id
              const key = `marketlify_v3_page_${id}`

              localStorage.removeItem(key)

              const funnelKey = `marketlify_v3_funnel_${state.funnel.get().id}`
              const updatedPages = state.funnel.get().pages.filter(pageId => pageId !== id)
              state.funnel.get().pages = updatedPages

              localStorage.setItem(funnelKey, JSON.stringify(state.funnel.get()))

              state.funnel.set(cloneDeep(state.funnel.get()))
              state.page.data.set(null)
            }
          }}
        >
          <FaTrashAlt />
        </button>
      </div>
    </div>
  )
}
