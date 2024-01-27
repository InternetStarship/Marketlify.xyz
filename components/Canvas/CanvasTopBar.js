import { FaCog, FaTrashAlt } from 'react-icons/fa'
import { BiCodeAlt } from 'react-icons/bi'
import { BsLayoutTextWindowReverse } from 'react-icons/bs'
import { toast } from 'react-toastify'
import { cloneDeep } from 'lodash'

export default function CanvasTopBar({ state }) {
  return (
    <div className="top-bar">
      <div className="url-bar">
        <input
          type="text"
          value={state.page.name.get()}
          onChange={e => {
            state.page.name.set(e.target.value)

            // add debounce
            const page = JSON.stringify(cloneDeep(state.page.get()))
            localStorage.setItem(`marketlify_v4_page_${state.page.id.get()}`, page)

            state.active.current.set(state.page.id.get() + '-' + Date.now())
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
              const id = state.page.id.get()
              const key = `marketlify_v4_page_${id}`

              localStorage.removeItem(key)

              const projectKey = `marketlify_v4_project_${state.project.get().id}`
              const updatedPages = state.project.get().pages.filter(pageId => pageId !== id)
              state.project.pages.set(cloneDeep(updatedPages))

              localStorage.setItem(projectKey, JSON.stringify(state.project.get()))

              state.project.set(cloneDeep(state.project.get()))
              state.page.data.set(null)

              state.active.current.set('deleted-' + id)
            }
          }}
        >
          <FaTrashAlt />
        </button>
      </div>
    </div>
  )
}
