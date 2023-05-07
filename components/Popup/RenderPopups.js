import WelcomePopup from '@/components/Popup/WelcomePopup'
import ExportPopup from '@/components/Popup/ExportPopup'
import NewFunnelPopup from '@/components/Popup/NewFunnelPopup'
import FunnelsPopup from '@/components/Popup/FunnelsPopup'

export function RenderPopups({ state }) {
  return (
    <>
      <WelcomePopup state={state} />
      <NewFunnelPopup state={state} />
      <FunnelsPopup state={state} />
      <ExportPopup state={state} />
    </>
  )
}
