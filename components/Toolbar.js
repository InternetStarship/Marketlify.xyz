/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

export default function Toolbar() {
  function exportHTML() {
    console.log("...");
  }

  function toggleSettings() {
    console.log("...");
  }

  function toggleMobile() {
    console.log("...");
  }

  function toggleLayers() {
    console.log("...");
  }

  return (
    <main className="w-full bg-slate-100 border-b border-slate-300 shadow-xl p-2 flex justify-between items-center">
      <div className="font-bold text-2xl">PageBuilder</div>
      <div className="flex space-x-2">
        <button
          onClick={() => {
            toggleMobile();
          }}
          className="bg-slate-300 hover:bg-slate-400 text-slate-800 font-bold py-2 px-4 rounded-md"
        >
          Mobile
        </button>
        <button
          onClick={() => {
            toggleLayers();
          }}
          className="bg-slate-300 hover:bg-slate-400 text-slate-800 font-bold py-2 px-4 rounded-md"
        >
          Layers
        </button>
        <button
          onClick={() => {
            toggleSettings();
          }}
          className="bg-slate-300 hover:bg-slate-400 text-slate-800 font-bold py-2 px-4 rounded-md"
        >
          Settings
        </button>
        <button
          onClick={() => {
            exportHTML();
          }}
          className="bg-slate-300 hover:bg-slate-400 text-slate-800 font-bold py-2 px-4 rounded-md"
        >
          Export
        </button>
      </div>
    </main>
  );
}
