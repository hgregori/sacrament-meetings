'use client';

import type { SacramentMeeting } from '@/lib/types';

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  const dateObj = new Date(meeting.date + 'T00:00:00');
  const formattedDate = dateObj.toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const typeConfig: Record<string, { label: string; badge: string }> = {
    regular: {
      label: 'Reunião Sacramental',
      badge: 'bg-slate-100 text-slate-800 border-slate-200',
    },
    testimony: {
      label: 'Reunião de Jejum e Testemunhos',
      badge: 'bg-amber-50 text-amber-900 border-amber-200',
    },
    stake: {
      label: 'Conferência de Estaca',
      badge: 'bg-sky-50 text-[#00609c] border-sky-200',
    },
    general: {
      label: 'Conferência Geral',
      badge: 'bg-indigo-50 text-indigo-900 border-indigo-200',
    },
  };

  const currentType = typeConfig[meeting.meetingType] || {
    label: meeting.meetingType,
    badge: 'bg-slate-100 text-slate-800 border-slate-200',
  };

  return (
    <article className="mx-auto max-w-3xl print:max-w-none">
      {/* Program Header styled like official bulletin */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm print:border-none print:shadow-none">
        <div className="bg-[#002b49] px-6 py-6 text-white text-center sm:px-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-sky-200">
            A Igreja de Jesus Cristo dos Santos dos Últimos Dias
          </p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight">
            Programa da Reunião Sacramental
          </h2>
          <p className="mt-1 text-sm text-slate-200 capitalize">
            {formattedDate} • Ala Centro
          </p>
          <div className="mt-3">
            <span
              className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold ${currentType.badge}`}
            >
              {currentType.label}
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-10 space-y-8">
          {/* Presiding & Conducting Banner */}
          <div className="grid grid-cols-1 gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4 sm:grid-cols-2">
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                Presidindo
              </span>
              <p className="text-base font-semibold text-slate-900">
                {meeting.presiding}
              </p>
            </div>
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                Dirigindo
              </span>
              <p className="text-base font-semibold text-slate-900">
                {meeting.conducting}
              </p>
            </div>
          </div>

          {/* Announcements */}
          {meeting.announcements && meeting.announcements.length > 0 && (
            <section aria-label="Anúncios">
              <h3 className="flex items-center gap-2 border-b border-slate-200 pb-2 text-sm font-bold uppercase tracking-wider text-[#002b49]">
                <span className="h-2 w-2 rounded-full bg-[#00609c]" />
                Anúncios da Ala
              </h3>
              <ul className="mt-3 list-inside list-disc space-y-1.5 text-sm text-slate-700">
                {meeting.announcements.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Opening */}
          <section aria-label="Abertura">
            <h3 className="flex items-center gap-2 border-b border-slate-200 pb-2 text-sm font-bold uppercase tracking-wider text-[#002b49]">
              <span className="h-2 w-2 rounded-full bg-[#00609c]" />
              Abertura
            </h3>
            <div className="mt-3 space-y-3 text-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-dotted border-slate-200 pb-2">
                <span className="font-semibold text-slate-800">Hino de Abertura</span>
                <span className="text-slate-600">
                  Nº {meeting.openingHymn.number} — <span className="italic">{meeting.openingHymn.title}</span>
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-1">
                <span className="font-semibold text-slate-800">Primeira Oração</span>
                <span className="text-slate-600">{meeting.openingPrayer}</span>
              </div>
            </div>
          </section>

          {/* Ward & Stake Business */}
          {meeting.wardBusiness.length > 0 && (
            <section aria-label="Assuntos da Ala">
              <h3 className="flex items-center gap-2 border-b border-slate-200 pb-2 text-sm font-bold uppercase tracking-wider text-[#002b49]">
                <span className="h-2 w-2 rounded-full bg-[#00609c]" />
                Assuntos da Ala
              </h3>
              <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-slate-700">
                {meeting.wardBusiness.map((item, i) => (
                  <li key={i}>{item.description}</li>
                ))}
              </ul>
              {meeting.stakeBusiness && (
                <p className="mt-2 text-xs font-semibold text-[#00609c]">
                  * Assuntos da estaca também foram tratados.
                </p>
              )}
            </section>
          )}

          {/* Sacrament */}
          <section aria-label="Sacramento">
            <h3 className="flex items-center gap-2 border-b border-slate-200 pb-2 text-sm font-bold uppercase tracking-wider text-[#002b49]">
              <span className="h-2 w-2 rounded-full bg-[#00609c]" />
              Sacramento
            </h3>
            <div className="mt-3 rounded-lg border border-sky-100 bg-sky-50/50 p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm">
                <span className="font-bold text-[#002b49]">Hino Sacramental</span>
                <span className="text-slate-700">
                  Nº {meeting.sacramentHymn.number} — <span className="italic font-medium">{meeting.sacramentHymn.title}</span>
                </span>
              </div>
              <p className="mt-2 text-xs italic text-slate-500">
                Bênção e distribuição do Sacramento pelo Sacerdócio Aarônico.
              </p>
            </div>
          </section>

          {/* Program / Speakers */}
          <section aria-label="Discursos e Mensagens">
            <h3 className="flex items-center gap-2 border-b border-slate-200 pb-2 text-sm font-bold uppercase tracking-wider text-[#002b49]">
              <span className="h-2 w-2 rounded-full bg-[#00609c]" />
              Programa
            </h3>
            <div className="mt-3 space-y-3">
              {meeting.speakers.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-lg border border-slate-100 bg-slate-50/70 p-3.5 transition-colors"
                >
                  <div>
                    <span
                      className={`inline-block rounded px-2 py-0.5 text-xs font-bold uppercase tracking-wider ${
                        item.type === 'musical-number'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {item.type === 'musical-number' ? 'Número Musical' : 'Discursante'}
                    </span>
                    <p className="mt-1 font-semibold text-slate-900">
                      {item.name}
                    </p>
                  </div>
                  {item.topic && (
                    <div className="mt-2 sm:mt-0 text-sm sm:text-right">
                      <span className="text-xs text-slate-400 block sm:inline">Tema: </span>
                      <span className="italic text-slate-700 font-medium">{item.topic}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Closing */}
          <section aria-label="Encerramento">
            <h3 className="flex items-center gap-2 border-b border-slate-200 pb-2 text-sm font-bold uppercase tracking-wider text-[#002b49]">
              <span className="h-2 w-2 rounded-full bg-[#00609c]" />
              Encerramento
            </h3>
            <div className="mt-3 space-y-3 text-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-dotted border-slate-200 pb-2">
                <span className="font-semibold text-slate-800">Hino de Encerramento</span>
                <span className="text-slate-600">
                  Nº {meeting.closingHymn.number} — <span className="italic">{meeting.closingHymn.title}</span>
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-1">
                <span className="font-semibold text-slate-800">Última Oração</span>
                <span className="text-slate-600">{meeting.closingPrayer}</span>
              </div>
            </div>
          </section>
        </div>

        {/* Action bar */}
        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-6 py-4 print:hidden">
          <p className="text-xs text-slate-500">
            Formato pronto para impressão ou leitura em dispositivos móveis.
          </p>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-lg bg-[#002b49] px-4 py-2 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#00609c] focus:outline-none focus:ring-2 focus:ring-[#00609c] focus:ring-offset-2"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
            Imprimir Ata
          </button>
        </div>
      </div>
    </article>
  );
}
