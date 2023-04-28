import Popup from '@/components/Popup'

export default function Welcome({ newFunnel, browseFunnels, welcomePopup }) {
  return (
    <Popup title="Welcome" close={false} open={welcomePopup}>
      <p className="text-lg">
        Welcome to Marketlify the free funnel builder. You can build your pages for free and export to
        ClickFunnels 2.0 or download and host yourself.
      </p>

      <div className="bg-slate-50 border border-slate-200 p-6 rounded shadow-sm my-3">
        <h3 className="text-xl font-bold">Build New Funnel</h3>
        <p>You can start from scratch and start building a high converting funnel in minutes.</p>
        <button
          onClick={() => {
            newFunnel()
          }}
          className="page-modal-close-button mt-2"
        >
          Create New Funnel
        </button>
      </div>

      <div className="bg-slate-50 border border-slate-200 p-6 rounded shadow-sm">
        <h3 className="text-xl font-bold">Load Funnel</h3>
        <p>You load any funnel that you have been working that is saved to your web browser.</p>
        <button
          onClick={() => {
            browseFunnels()
          }}
          className="page-modal-close-button mt-2"
        >
          Browse My Funnels
        </button>
      </div>
    </Popup>
  )
}
