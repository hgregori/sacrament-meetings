import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      {/* Decorative badge */}
      <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#00609c] ring-1 ring-sky-200">
        Ala Centro • Estaca Curitiba
      </span>

      <div className="mt-6 max-w-2xl space-y-4">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#002b49]">
          Planejador de Reuniões Sacramentais
        </h1>
        <p className="text-base sm:text-lg leading-relaxed text-slate-600">
          Acesse a programação completa das reuniões sacramentais, hinos, oradores e anúncios semanais da nossa ala.
        </p>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <Link
          href="/meetings/current"
          className="inline-flex items-center justify-center rounded-lg bg-[#002b49] px-6 py-3 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#00609c] focus:outline-none focus:ring-2 focus:ring-[#00609c] focus:ring-offset-2"
        >
          Reunião Deste Domingo &rarr;
        </Link>
        <Link
          href="/meetings"
          className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-xs transition-colors hover:bg-slate-50 hover:text-[#002b49]"
        >
          Ver Todas as Reuniões
        </Link>
      </div>

      {/* Feature highlights */}
      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3 max-w-4xl text-left">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="h-8 w-8 rounded-lg bg-sky-50 flex items-center justify-center text-[#00609c] font-bold text-sm mb-3">
            🎵
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Hinos Selecionados</h3>
          <p className="mt-1 text-xs text-slate-500">
            Acompanhe números e títulos dos hinos de abertura, sacramento e encerramento.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="h-8 w-8 rounded-lg bg-sky-50 flex items-center justify-center text-[#00609c] font-bold text-sm mb-3">
            📖
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Discursos e Temas</h3>
          <p className="mt-1 text-xs text-slate-500">
            Saiba quem serão os discursantes e tópicos inspiradores do evangelho para o domingo.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="h-8 w-8 rounded-lg bg-sky-50 flex items-center justify-center text-[#00609c] font-bold text-sm mb-3">
            🖨️
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Pronto para Impressão</h3>
          <p className="mt-1 text-xs text-slate-500">
            Exibição limpa em folha A4 com um simples clique para distribuição aos membros.
          </p>
        </div>
      </div>
    </div>
  );
}
