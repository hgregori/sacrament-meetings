import Link from 'next/link';
import { LoginForm } from '@/components/login-form';

export default function LoginPage() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center py-12 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xs">
        <div className="text-center">
          <span className="inline-block rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#00609c]">
            Acesso Restrito
          </span>
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-[#002b49]">
            Entrar no Sistema
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Acesso reservado para liderança da ala
          </p>
        </div>

        <LoginForm />

        <div className="mt-6 border-t border-slate-100 pt-4 text-center">
          <Link
            href="/"
            className="text-xs font-semibold text-slate-500 hover:text-[#00609c]"
          >
            &larr; Voltar para a página inicial
          </Link>
        </div>
      </div>
    </main>
  );
}
