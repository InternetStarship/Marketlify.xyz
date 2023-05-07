import { FaSave } from 'react-icons/fa'
import { save } from '@/utils/editor/save'

function SaveButton({ state }) {
  return (
    <button
      onClick={() => {
        save(state.page.data.get(), state.page.name.get())
      }}
      className="flex items-center toolbar-button-primary"
      data-tooltip-id="tooltip"
      data-tooltip-content="Save to local storage"
    >
      <FaSave />
      <span className="hidden xl:inline-block">Save</span>
    </button>
  )
}

export default SaveButton
