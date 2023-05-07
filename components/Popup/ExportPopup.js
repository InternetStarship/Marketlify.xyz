import { exportFunnel } from '@/utils/funnel/exportFunnel'
import Popup from '@/components/Popup/Popup'

export default function ExportPopup({ state }) {
  return (
    state.popup.open.get() &&
    state.popup.type.get() === 'export' && (
      <Popup
        title="Export Funnel"
        open={true}
        closeOverride={() => {
          state.popup.open.set(false)
          state.popup.type.set('')
        }}
      >
        <div className="p-6 rounded">
          <h3 className="text-xl font-bold">Raw HTML Files</h3>
          <p className="py-2 text-slate-500">
            Host the code your self and connect the pages together like it was 2014. Not for the faint of
            heart. You will need to know how to use FTP and have a web hosts, adding domain, etc. This is for
            the advanced users.
          </p>
          <div className="flex space-x-2">
            <button
              onClick={() => {
                exportFunnel(state.funnel.get())
              }}
              className="page-modal-close-button mt-2"
            >
              Download (.zip)
            </button>
            <button className="toolbar-button mt-2">Export to ClickFunnels 2.0 (coming soon)</button>
          </div>
        </div>
      </Popup>
    )
  )
}
