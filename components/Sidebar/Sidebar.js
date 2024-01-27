import { useState, useEffect } from 'react'
import Panel from '../Panel/Panel'
import Settings from '../Page/Settings'
import Layers from '../Layer/Layers'
import CustomCode from '../Editor/CustomCode'
import SidebarExpandButton from './SidebarExpandButton'
import ProjectView from '../Project/ProjectView'

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
      return <ProjectView state={state} />
  }
}

export default function Sidebar({ state }) {
  const mainClassName = !state.sidebar.expanded.get() ? 'closed' : ''
  const [ActiveComponent, setActiveComponent] = useState(() => getActiveComponent(state))

  useEffect(() => {
    console.log('active current state has changed:', state.active.current.get())
    setActiveComponent(getActiveComponent(state))
  }, [state.active.current])

  // useEffect(() => {
  //   console.log('thhe state', state)
  // }, [state])

  return (
    <main id="sidebar" className={mainClassName}>
      {ActiveComponent}
      <SidebarExpandButton state={state} />
    </main>
  )
}
