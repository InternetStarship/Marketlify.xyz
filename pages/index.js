/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

import Canvas from "../components/Canvas";
import Toolbar from "../components/Toolbar";
import Sidebar from "../components/Sidebar";

export default function Builder() {
  return (
    <main className="w-full h-screen overflow-hidden bg-slate-300">
      <Toolbar />
      <div className="flex flex-row">
        <Sidebar />
        <div className="w-full">
          <Canvas />
        </div>
      </div>
    </main>
  );
}
