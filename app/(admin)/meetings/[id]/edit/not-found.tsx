import Link from 'next/link';

export default function MeetingNotFound() {
  return (
    <div className="mx-auto max-w-lg rounded-xl border border-slate-200 bg-white p-8 text-center shadow-xs">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600 mb-4">
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h2 className="text-xl font-bold tracking-tight text-slate-900">
        Meeting not found
      </h2>
      <p className="mt-2 text-sm text-slate-600">
        A reunião sacramental solicitada não foi encontrada ou foi removida.
      </p>
      <div className="mt-6">
        <Link
          href="/meetings"
          className="inline-flex items-center justify-center rounded-lg bg-[#002b49] px-5 py-2 text-sm font-semibold text-white shadow-xs hover:bg-[#00609c]"
        >
          &larr; Voltar para Reuniões
        </Link>
      </div>
    </div>
  );
}
