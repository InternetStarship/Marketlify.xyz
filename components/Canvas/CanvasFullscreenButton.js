export default function CanvasFullscreenButton({ state }) {
  if (state.active.fullscreen.get()) {
    return (
      <div
        id="fullscreenClose"
        onClick={() => {
          state.active.fullscreen.set(false)
        }}
      >
        Close Fullscreen
      </div>
    )
  }
}
