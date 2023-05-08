import { useState, useEffect } from 'react'
import Panel from '../Panel/Panel'
import Settings from '../Page/Settings'
import Layers from '../Layer/Layers'
import CustomCode from '../Editor/CustomCode'
import SidebarExpandButton from './SidebarExpandButton'
import FunnelView from '../Funnel/FunnelView'

function getActiveComponent(state) {
  switch (state.active.current.get()) {
    case 'editing':
      return <Panel state={state} />
    case 'settings':
      return <Settings state={state} />
    case 'custom-code':
      return <CustomCode state={state} />
    case 'layers':
      return <Layers state={state} />
    default:
      return state.funnel.get() && <FunnelView state={state} />
  }
}

export default function Sidebar({ state }) {
  const mainClassName = !state.sidebar.expanded.get() ? 'closed' : ''
  const [ActiveComponent, setActiveComponent] = useState(() => getActiveComponent(state))

  useEffect(() => {
    setActiveComponent(getActiveComponent(state))
  }, [state.active.current])

  return (
    <main id="sidebar" className={mainClassName}>
      {ActiveComponent}
      <SidebarExpandButton state={state} />
    </main>
  )
}
