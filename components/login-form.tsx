'use client';

import { useActionState } from 'react';
import { authenticate } from '@/lib/actions';

export function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form action={formAction} className="mt-6 space-y-5" noValidate>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-slate-800"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="exemplo@igreja.com"
          required
          className="mt-1 block w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-xs focus:border-[#00609c] focus:outline-none focus:ring-2 focus:ring-[#00609c]/20"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-semibold text-slate-800"
        >
          Senha
        </label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="••••••"
          minLength={6}
          required
          className="mt-1 block w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-xs focus:border-[#00609c] focus:outline-none focus:ring-2 focus:ring-[#00609c]/20"
        />
      </div>

      {errorMessage && (
        <div
          role="alert"
          aria-live="polite"
          className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700"
        >
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-[#002b49] py-2.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#00609c] focus:outline-none focus:ring-2 focus:ring-[#00609c] focus:ring-offset-2 disabled:opacity-50"
      >
        {isPending ? 'Entrando...' : 'Entrar'}
      </button>

      <div className="rounded-lg bg-sky-50/70 p-3 text-xs text-slate-600 border border-sky-100">
        <p className="font-semibold text-[#002b49]">Credenciais de Teste:</p>
        <p>Email: <code className="font-mono text-[#00609c]">bispo@igreja.com</code></p>
        <p>Senha: <code className="font-mono text-[#00609c]">123456</code></p>
      </div>
    </form>
  );
}
