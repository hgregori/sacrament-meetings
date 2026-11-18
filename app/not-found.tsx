import Link from 'next/link';

export default function GlobalNotFound() {
  return (
    <div className="mx-auto my-12 max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xs">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-700 mb-4">
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

      <span className="text-xs font-bold uppercase tracking-wider text-[#00609c]">
        Erro 404
      </span>
      <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#002b49]">
        Página Não Encontrada
      </h2>
      <p className="mt-2 text-sm text-slate-600">
        O link que você seguiu pode estar quebrado ou a página pode ter sido removida.
      </p>

      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          href="/meetings"
          className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg bg-[#002b49] px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#00609c]"
        >
          Ver Reuniões
        </Link>
        <Link
          href="/"
          className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-xs hover:bg-slate-50"
        >
          Ir para o Início
        </Link>
      </div>
    </div>
  );
}
