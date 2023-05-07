import { hookstate, useHookstate } from '@hookstate/core'
import { ToastContainer } from 'react-toastify'
import { Tooltip } from 'react-tooltip'
import Head from '@/components/Header/Head'
import Toolbar from '@/components/Toolbar/Toolbar'
import Sidebar from '@/components/Sidebar/Sidebar'
import Breadcrumb from '@/components/Page/Breadcrumb'
import { RenderCanvas } from '@/components/Canvas/RenderCanvas'
import { RenderPopups } from '@/components/Popup/RenderPopups'
import { useUndo } from '@/utils/undo/useUndo'
import state from '@/utils/state'

const globalState = hookstate(state)

export default function Builder() {
  const state = useHookstate(globalState)
  useUndo(state)

  return (
    <main className="page-builder-by-wynter-jones">
      <Head />
      <Toolbar state={state} />

      <div id="marketlify">
        <Sidebar state={state} />
        <RenderCanvas state={state} />
      </div>

      <Breadcrumb state={state} />
      <RenderPopups state={state} />
      <Tooltip id="tooltip" />
      <ToastContainer
        position="bottom-center"
        autoClose={200}
        hideProgressBar={true}
        newestOnTop={true}
        theme="dark"
        limit={4}
      />
    </main>
  )
}
