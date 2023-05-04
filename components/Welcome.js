import Popup from '@/components/Popup'

export default function Welcome({ newFunnel, browseFunnels, welcomePopup }) {
  return (
    <Popup title="Welcome to Marketlify 🎉" close={false} open={welcomePopup}>
      <p className="text-lg">
        Discover the magic of Marketlify, your go-to free funnel builder! Craft stunning pages in a breeze and
        seamlessly export to ClickFunnels 2.0 or host on your own terms.
      </p>

      <div className="bg-slate-50 border border-slate-200 p-6 rounded shadow-sm my-3">
        <h3 className="text-xl font-bold">✨ Start Fresh</h3>
        <p>Unleash your creativity and build a high-converting funnel from scratch in just minutes.</p>
        <button
          onClick={() => {
            newFunnel()
          }}
          className="page-modal-close-button mt-2"
        >
          🚀 Create New Funnel
        </button>
      </div>

      <div className="bg-slate-50 border border-slate-200 p-6 rounded shadow-sm">
        <h3 className="text-xl font-bold">🔍 Find Your Funnel</h3>
        <p>Easily access and continue working on your saved funnels, right from your web browser.</p>
        <button
          onClick={() => {
            browseFunnels()
          }}
          className="page-modal-close-button mt-2"
        >
          📚 Browse My Funnels
        </button>
      </div>
    </Popup>
  )
}
