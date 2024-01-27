import Popup from '@/components/Popup/Popup'

export default function WelcomePopup({ state }) {
  return (
    state.popup.type.get() === 'welcome' && (
      <Popup title="Welcome to Marketlify 🎉" close={false} open={true}>
        <p className="text-lg">Discover the magic of Marketlify, your go-to free multi-page builder!</p>

        <div className="bg-slate-50 border border-slate-200 p-6 rounded shadow-sm my-3">
          <h3 className="text-xl font-bold">✨ Start Fresh</h3>
          <p>Unleash your creativity and build a high-converting pages from scratch in just minutes.</p>
          <button
            onClick={() => {
              state.popup.open.set(true)
              state.popup.type.set('new-project')
            }}
            className="page-modal-close-button mt-2"
          >
            🚀 Create New
          </button>
        </div>

        <div className="bg-slate-50 border border-slate-200 p-6 rounded shadow-sm">
          <h3 className="text-xl font-bold">🔍 Find Your Project</h3>
          <p>Easily access and continue working on your saved projects, right from your web browser.</p>
          <button
            onClick={() => {
              state.popup.open.set(true)
              state.popup.type.set('projects')
            }}
            className="page-modal-close-button mt-2"
          >
            📚 Browse
          </button>
        </div>
      </Popup>
    )
  )
}
