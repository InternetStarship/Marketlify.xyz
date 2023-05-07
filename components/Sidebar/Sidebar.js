import { useMemo } from 'react'
import Panel from '../Panel/Panel'
import Settings from '../Page/Settings'
import Layers from '../Layer/Layers'
import CustomCode from '../Editor/CustomCode'
import SidebarExpandButton from './SidebarExpandButton'
import FunnelView from '../Funnel/FunnelView'

function useActiveComponent(current, state) {
  return useMemo(() => {
    switch (current) {
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
  }, [current, state])
}

export default function Sidebar({ state }) {
  const { expanded, current } = state.sidebar
  const mainClassName = !expanded.get() ? 'closed' : ''

  const ActiveComponent = useActiveComponent(current, state)

  return (
    <main id="sidebar" className={mainClassName}>
      {ActiveComponent}
      <SidebarExpandButton state={state} />
    </main>
  )
}
