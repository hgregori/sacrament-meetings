'use client';

import { useSyncExternalStore } from 'react';

function subscribe() {
  return () => {};
}

function getYearSnapshot() {
  return new Date().getFullYear();
}

function getServerYearSnapshot() {
  return 2026;
}

export default function Footer() {
  const year = useSyncExternalStore(
    subscribe,
    getYearSnapshot,
    getServerYearSnapshot
  );

  return (
    <footer className="mt-auto border-t border-slate-200 bg-white py-8 text-center text-sm text-slate-500">
      <div className="mx-auto max-w-5xl px-4 space-y-2">
        <p className="font-medium text-slate-700">
          A Igreja de Jesus Cristo dos Santos dos Últimos Dias
        </p>
        <p className="text-xs text-slate-400">
          &copy; {year} Planejador de Reuniões Sacramentais • Ala Centro
        </p>
      </div>
    </footer>
  );
}
