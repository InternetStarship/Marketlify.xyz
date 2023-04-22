/*
 *   Copyright (c) 2023 Wynter Jones
 *   All rights reserved.
 */

export default function Empty({ message, className }) {
  return (
    <div>
      <div
        className={`border border-slate-200 text-sm p-6 rounded shadow-sm bg-slate-50 hover:bg-slate-100 text-center uppercase font-medium ${className}`}
      >
        {message}
      </div>
    </div>
  )
}
