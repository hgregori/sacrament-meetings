'use client';

import { Suspense, useSyncExternalStore } from 'react';
import Link from 'next/link';
import NavLinks from './NavLinks';

function subscribe() {
  return () => {};
}

function getFormattedDateSnapshot() {
  return new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function getServerDateSnapshot() {
  return '';
}

export default function Header() {
  const currentDate = useSyncExternalStore(
    subscribe,
    getFormattedDateSnapshot,
    getServerDateSnapshot
  );

  return (
    <header className="border-b border-slate-200 bg-white shadow-xs">
      <div className="border-t-4 border-[#002b49]"></div>
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#002b49] text-white shadow-xs">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <div>
            <Link href="/" className="group">
              <h1 className="text-xl font-bold tracking-tight text-[#002b49] transition-colors group-hover:text-[#00609c]">
                Ala Centro
              </h1>
            </Link>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Estaca Curitiba {currentDate ? `• ${currentDate}` : ''}
            </p>
          </div>
        </div>
        <Suspense fallback={<div className="h-9 w-48" />}>
          <NavLinks />
        </Suspense>
      </div>
    </header>
  );
}
