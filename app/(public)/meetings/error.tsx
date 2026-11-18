'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function MeetingsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Meetings route error:', error);
  }, [error]);

  return (
    <div className="mx-auto max-w-lg rounded-xl border border-red-200 bg-white p-8 text-center shadow-xs">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 mb-4">
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
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h2 className="text-xl font-bold tracking-tight text-slate-900">
        Ocorreu um problema ao carregar as reuniões
      </h2>
      <p className="mt-2 text-sm text-slate-600">
        {error.message || 'Não foi possível carregar ou processar os dados da reunião.'}
      </p>
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg bg-[#002b49] px-5 py-2 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#00609c] focus:outline-none focus:ring-2 focus:ring-[#00609c]"
        >
          Try Again
        </button>
        <Link
          href="/meetings"
          className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 shadow-xs hover:bg-slate-50"
        >
          Voltar para Reuniões
        </Link>
      </div>
    </div>
  );
}
