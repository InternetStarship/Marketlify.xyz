import { FaSave } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { prettySize } from '@/utils/prettySize'
import { checkLocalStorageSize } from '@/utils/checkLocalStorageSize'

function SaveButton({ page, name }) {
  function save() {
    page.size = prettySize(JSON.stringify(page))
    page.name = name
    const dataSize = new Blob([page], { type: 'application/json' }).size

    if (checkLocalStorageSize(dataSize)) {
      localStorage.setItem(`marketlify_v3_page_${page.id}`, JSON.stringify(page))
      toast('Page has been saved.')
      return true
    } else {
      toast('Your page is too large to save to your browser. Please try again with a smaller page.')
      return null
    }
  }

  return (
    <button
      onClick={save}
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
