export default function Loading() {
  return (
    <div className="space-y-4">
      <div className="h-10 w-full max-w-md animate-pulse rounded-lg bg-slate-200" />
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex animate-pulse flex-col sm:flex-row overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-xs"
        >
          <div className="h-16 w-24 rounded bg-slate-200 sm:mr-4" />
          <div className="flex-1 space-y-2.5 mt-3 sm:mt-0">
            <div className="h-5 w-48 rounded bg-slate-200" />
            <div className="h-4 w-32 rounded bg-slate-200" />
            <div className="h-4 w-64 rounded bg-slate-200" />
          </div>
        </div>
      ))}
    </div>
  );
}

