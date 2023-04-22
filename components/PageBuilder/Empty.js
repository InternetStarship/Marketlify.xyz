/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

export default function Empty({ message, className, onMouseOver }) {
  return (
    <div>
      <div
        className={`border p-6 rounded shadow-sm bg-slate-200 text-center uppercase font-medium`}
        // onMouseOver={onMouseOver}
      >
        {message}
      </div>
    </div>
  )
}
