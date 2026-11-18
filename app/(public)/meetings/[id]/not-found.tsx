import Link from 'next/link';

export default function MeetingNotFound() {
  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xs">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sky-50 text-[#00609c] mb-4">
        <svg
          className="h-7 w-7"
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

      <h2 className="text-2xl font-bold tracking-tight text-[#002b49]">
        Reunião Não Encontrada
      </h2>
      <p className="mt-2 text-sm text-slate-600">
        A ata ou reunião sacramental solicitada não existe ou foi removida do sistema.
      </p>

      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          href="/meetings"
          className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg bg-[#002b49] px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#00609c]"
        >
          &larr; Ver Todas as Reuniões
        </Link>
        <Link
          href="/"
          className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-xs hover:bg-slate-50"
        >
          Página Inicial
        </Link>
      </div>
    </div>
  );
}
