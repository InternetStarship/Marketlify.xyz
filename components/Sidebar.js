/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

import Panel from "../components/Panel";
import Settings from "../components/Settings";
import { useState, useEffect } from "react";

export default function Sidebar({ current, page, close, selectedId }) {
  const [selected, setSelected] = useState(current);

  useEffect(() => {
    setSelected(current);
  }, [current]);

  return (
    <main id="sidebar">
      {selected === "editing" && (
        <Panel page={page} close={close} selectedId={selectedId} />
      )}
      {selected === "settings" && <Settings />}
      {selected === "" && (
        <div className="text-sm text-center text-slate-600">
          Select an element to edit or edit the page settings or whatever a page
          builder does.
        </div>
      )}
    </main>
  );
}
