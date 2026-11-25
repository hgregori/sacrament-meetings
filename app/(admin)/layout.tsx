import { Suspense } from 'react';
import { auth } from '@/auth';
import { SignOutButton } from '@/components/sign-out-button';

async function AdminHeader() {
  const session = await auth();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-lg bg-slate-100 p-4 border border-slate-200">
      <div className="flex items-center gap-2">
        <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
          Painel de Liderança (Área Autenticada)
        </span>
        {session?.user && (
          <span className="text-xs text-slate-500">
            • Conectado como: <strong className="text-slate-800">{session.user.name || session.user.email}</strong>
          </span>
        )}
      </div>
      <SignOutButton />
    </div>
  );
}

export default function AdminLayout({
  children,
}: LayoutProps<'/'>) {
  return (
    <div className="space-y-6">
      <Suspense fallback={<div className="h-16 w-full animate-pulse rounded-lg bg-slate-100" />}>
        <AdminHeader />
      </Suspense>
      {children}
    </div>
  );
}
