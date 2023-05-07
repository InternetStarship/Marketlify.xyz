import { hookstate, useHookstate } from '@hookstate/core'
import { ToastContainer } from 'react-toastify'
import { Tooltip } from 'react-tooltip'
import Head from '@/components/Header/Head'
import Canvas from '@/components/Canvas/Canvas'
import Toolbar from '@/components/Toolbar/Toolbar'
import Sidebar from '@/components/Sidebar/Sidebar'
import Breadcrumb from '@/components/Page/Breadcrumb'
import NoPage from '@/components/Page/NoPage'
import NoFunnel from '@/components/Funnel/NoFunnel'
import WelcomePopup from '@/components/Popup/WelcomePopup'
import ExportPopup from '@/components/Popup/ExportPopup'
import NewFunnelPopup from '@/components/Popup/NewFunnelPopup'
import FunnelsPopup from '@/components/Popup/FunnelsPopup'
import state from '@/utils/state'
import { useUndo } from '@/utils/undo/useUndo'

const globalState = hookstate(state)

export default function Builder() {
  const state = useHookstate(globalState)

  useUndo(state)

  return (
    <main className="page-builder-by-wynter-jones">
      <Head />

      <Toolbar state={state} />
      <Breadcrumb state={state} />

      <WelcomePopup state={state} />
      <ExportPopup state={state} />
      <NewFunnelPopup state={state} />
      <FunnelsPopup state={state} />

      <div id="marketlify">
        <Sidebar state={state} />

        {!state.funnel.pages.get() && <NoFunnel state={state} />}
        {state.funnel.pages.get() && !state.page.data.get()?.seo && <NoPage state={state} />}
        {state.funnel.pages.get() && state.page.data.get()?.seo && <Canvas state={state} />}
      </div>

      <ToastContainer
        position="bottom-center"
        autoClose={200}
        hideProgressBar={true}
        newestOnTop={true}
        theme="dark"
        limit={4}
      />

      <Tooltip id="tooltip" />
    </main>
  )
}
