import Link from 'next/link';

export default function NewMeetingPage() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-xs">
      <h2 className="text-2xl font-bold tracking-tight text-[#002b49]">
        Create Meeting — Coming in Week 04
      </h2>
      <p className="mt-2 text-sm text-slate-600">
        O formulário de criação de reuniões sacramentais com validação e salvamento no banco de dados será implementado na Semana 04.
      </p>
      <div className="mt-6">
        <Link
          href="/meetings"
          className="inline-flex items-center text-sm font-semibold text-[#00609c] hover:underline"
        >
          &larr; Voltar para reuniões
        </Link>
      </div>
    </div>
  );
}

