import { hookstate, useHookstate } from '@hookstate/core'
import { ToastContainer } from 'react-toastify'
import { Tooltip } from 'react-tooltip'
import Head from '@/components/Head'
import Canvas from '@/components/Canvas'
import Toolbar from '@/components/Toolbar'
import Sidebar from '@/components/Sidebar'
import Breadcrumb from '@/components/Breadcrumb'
import NoPage from '@/components/NoPage'
import NoFunnel from '@/components/NoFunnel'
import WelcomePopup from '@/components/WelcomePopup'
import ExportPopup from '@/components/ExportPopup'
import NewFunnelPopup from '@/components/NewFunnelPopup'
import FunnelsPopup from '@/components/FunnelsPopup'
import stateBlueprint from '@/utils/stateBlueprint'
import { useUndo } from '@/utils/useUndo'

const blueprint = hookstate(stateBlueprint)

export default function Builder() {
  const state = useHookstate(blueprint)

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
        {state.funnel.pages.get() && !state.page.content.get()?.data && <NoPage state={state} />}
        {state.funnel.pages.get() && state.page.content.get()?.data && <Canvas state={state} />}
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
