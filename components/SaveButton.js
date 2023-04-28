import { FaSave } from 'react-icons/fa'
import { save } from '@/utils/save'

function SaveButton({ page, name }) {
  return (
    <button
      onClick={() => {
        save(page, name)
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
