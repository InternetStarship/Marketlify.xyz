export default function Empty({ message, className }) {
  return (
    <div>
      <div
        className={`border border-slate-200 text-sm p-2.5 shadow-sm bg-slate-50 hover:bg-slate-100 text-center uppercase font-medium ${className}`}
      >
        {message}
      </div>
    </div>
  )
}
