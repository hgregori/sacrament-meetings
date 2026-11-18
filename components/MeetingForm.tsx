'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { createMeeting, updateMeeting, type State } from '@/lib/actions';
import type { SacramentMeeting } from '@/lib/types';

interface MeetingFormProps {
  meeting?: SacramentMeeting;
}

export default function MeetingForm({ meeting }: MeetingFormProps) {
  const isEditing = Boolean(meeting);

  const actionWithId = isEditing && meeting ? updateMeeting.bind(null, meeting.id) : createMeeting;
  const initialState: State = { message: null, errors: {} };
  const [state, formAction, isPending] = useActionState(actionWithId, initialState);

  const speaker1 = meeting?.speakers?.[0];
  const speaker2 = meeting?.speakers?.[1];

  return (
    <form action={formAction} className="space-y-8" noValidate>
      {state.message && (
        <div
          role="alert"
          aria-live="polite"
          className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800"
        >
          {state.message}
        </div>
      )}

      {/* Basic Meeting Details */}
      <fieldset className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
        <legend className="px-2 text-base font-bold text-[#002b49]">
          Informações Básicas da Reunião
        </legend>

        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Date */}
          <div>
            <label htmlFor="date" className="block text-sm font-semibold text-slate-800">
              Data da Reunião *
            </label>
            <input
              type="date"
              id="date"
              name="date"
              defaultValue={meeting?.date ?? ''}
              aria-describedby="date-error"
              className="mt-1 block w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-xs focus:border-[#00609c] focus:outline-none focus:ring-2 focus:ring-[#00609c]/20"
              required
            />
            <div id="date-error" aria-live="polite" className="mt-1 min-h-[1.25rem] text-xs text-red-600">
              {state.errors?.date?.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          </div>

          {/* Meeting Type */}
          <div>
            <label htmlFor="meetingType" className="block text-sm font-semibold text-slate-800">
              Tipo de Reunião *
            </label>
            <select
              id="meetingType"
              name="meetingType"
              defaultValue={meeting?.meetingType ?? 'regular'}
              aria-describedby="meetingType-error"
              className="mt-1 block w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-xs focus:border-[#00609c] focus:outline-none focus:ring-2 focus:ring-[#00609c]/20"
              required
            >
              <option value="regular">Reunião Regular</option>
              <option value="testimony">Jejum e Testemunhos</option>
              <option value="stake">Conferência de Estaca</option>
              <option value="general">Conferência Geral</option>
              <option value="special">Reunião Especial</option>
            </select>
            <div id="meetingType-error" aria-live="polite" className="mt-1 min-h-[1.25rem] text-xs text-red-600">
              {state.errors?.meetingType?.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          </div>

          {/* Presiding */}
          <div>
            <label htmlFor="presiding" className="block text-sm font-semibold text-slate-800">
              Presidindo *
            </label>
            <input
              type="text"
              id="presiding"
              name="presiding"
              placeholder="Ex: Bispo Tony"
              defaultValue={meeting?.presiding ?? ''}
              aria-describedby="presiding-error"
              className="mt-1 block w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-xs focus:border-[#00609c] focus:outline-none focus:ring-2 focus:ring-[#00609c]/20"
              required
            />
            <div id="presiding-error" aria-live="polite" className="mt-1 min-h-[1.25rem] text-xs text-red-600">
              {state.errors?.presiding?.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          </div>

          {/* Conducting */}
          <div>
            <label htmlFor="conducting" className="block text-sm font-semibold text-slate-800">
              Dirigindo *
            </label>
            <input
              type="text"
              id="conducting"
              name="conducting"
              placeholder="Ex: Irmão Galvão"
              defaultValue={meeting?.conducting ?? ''}
              aria-describedby="conducting-error"
              className="mt-1 block w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-xs focus:border-[#00609c] focus:outline-none focus:ring-2 focus:ring-[#00609c]/20"
              required
            />
            <div id="conducting-error" aria-live="polite" className="mt-1 min-h-[1.25rem] text-xs text-red-600">
              {state.errors?.conducting?.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          </div>
        </div>
      </fieldset>

      {/* Opening & Prayers */}
      <fieldset className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
        <legend className="px-2 text-base font-bold text-[#002b49]">
          Abertura e Sacramento
        </legend>

        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Opening Hymn Number */}
          <div>
            <label htmlFor="openingHymnNumber" className="block text-sm font-semibold text-slate-800">
              Nº do Hino de Abertura *
            </label>
            <input
              type="number"
              id="openingHymnNumber"
              name="openingHymnNumber"
              min="1"
              defaultValue={meeting?.openingHymn?.number ?? ''}
              aria-describedby="openingHymnNumber-error"
              className="mt-1 block w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-xs focus:border-[#00609c] focus:outline-none focus:ring-2 focus:ring-[#00609c]/20"
              required
            />
            <div id="openingHymnNumber-error" aria-live="polite" className="mt-1 min-h-[1.25rem] text-xs text-red-600">
              {state.errors?.openingHymnNumber?.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          </div>

          {/* Opening Hymn Title */}
          <div>
            <label htmlFor="openingHymnTitle" className="block text-sm font-semibold text-slate-800">
              Título do Hino de Abertura *
            </label>
            <input
              type="text"
              id="openingHymnTitle"
              name="openingHymnTitle"
              placeholder="Ex: No Monte a Bandeira"
              defaultValue={meeting?.openingHymn?.title ?? ''}
              aria-describedby="openingHymnTitle-error"
              className="mt-1 block w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-xs focus:border-[#00609c] focus:outline-none focus:ring-2 focus:ring-[#00609c]/20"
              required
            />
            <div id="openingHymnTitle-error" aria-live="polite" className="mt-1 min-h-[1.25rem] text-xs text-red-600">
              {state.errors?.openingHymnTitle?.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          </div>

          {/* Opening Prayer */}
          <div className="sm:col-span-2">
            <label htmlFor="openingPrayer" className="block text-sm font-semibold text-slate-800">
              Primeira Oração *
            </label>
            <input
              type="text"
              id="openingPrayer"
              name="openingPrayer"
              placeholder="Ex: Irmã Luciana Galvão"
              defaultValue={meeting?.openingPrayer ?? ''}
              aria-describedby="openingPrayer-error"
              className="mt-1 block w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-xs focus:border-[#00609c] focus:outline-none focus:ring-2 focus:ring-[#00609c]/20"
              required
            />
            <div id="openingPrayer-error" aria-live="polite" className="mt-1 min-h-[1.25rem] text-xs text-red-600">
              {state.errors?.openingPrayer?.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          </div>

          {/* Sacrament Hymn Number */}
          <div>
            <label htmlFor="sacramentHymnNumber" className="block text-sm font-semibold text-slate-800">
              Nº do Hino Sacramental *
            </label>
            <input
              type="number"
              id="sacramentHymnNumber"
              name="sacramentHymnNumber"
              min="1"
              defaultValue={meeting?.sacramentHymn?.number ?? ''}
              aria-describedby="sacramentHymnNumber-error"
              className="mt-1 block w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-xs focus:border-[#00609c] focus:outline-none focus:ring-2 focus:ring-[#00609c]/20"
              required
            />
            <div id="sacramentHymnNumber-error" aria-live="polite" className="mt-1 min-h-[1.25rem] text-xs text-red-600">
              {state.errors?.sacramentHymnNumber?.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          </div>

          {/* Sacrament Hymn Title */}
          <div>
            <label htmlFor="sacramentHymnTitle" className="block text-sm font-semibold text-slate-800">
              Título do Hino Sacramental *
            </label>
            <input
              type="text"
              id="sacramentHymnTitle"
              name="sacramentHymnTitle"
              placeholder="Ex: Na Corte Celestial"
              defaultValue={meeting?.sacramentHymn?.title ?? ''}
              aria-describedby="sacramentHymnTitle-error"
              className="mt-1 block w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-xs focus:border-[#00609c] focus:outline-none focus:ring-2 focus:ring-[#00609c]/20"
              required
            />
            <div id="sacramentHymnTitle-error" aria-live="polite" className="mt-1 min-h-[1.25rem] text-xs text-red-600">
              {state.errors?.sacramentHymnTitle?.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          </div>
        </div>
      </fieldset>

      {/* Speakers */}
      <fieldset className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
        <legend className="px-2 text-base font-bold text-[#002b49]">
          Oradores e Mensagens
        </legend>

        <div className="mt-4 space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="speaker1Name" className="block text-sm font-semibold text-slate-800">
                1º Orador(a)
              </label>
              <input
                type="text"
                id="speaker1Name"
                name="speaker1Name"
                placeholder="Ex: Irmão Gabriel"
                defaultValue={speaker1?.name ?? ''}
                className="mt-1 block w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-xs focus:border-[#00609c] focus:outline-none focus:ring-2 focus:ring-[#00609c]/20"
              />
            </div>
            <div>
              <label htmlFor="speaker1Topic" className="block text-sm font-semibold text-slate-800">
                Tema do 1º Discurso
              </label>
              <input
                type="text"
                id="speaker1Topic"
                name="speaker1Topic"
                placeholder="Ex: Fé em Jesus Cristo"
                defaultValue={speaker1?.topic ?? ''}
                className="mt-1 block w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-xs focus:border-[#00609c] focus:outline-none focus:ring-2 focus:ring-[#00609c]/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="speaker2Name" className="block text-sm font-semibold text-slate-800">
                2º Orador(a)
              </label>
              <input
                type="text"
                id="speaker2Name"
                name="speaker2Name"
                placeholder="Ex: Irmão Marcos"
                defaultValue={speaker2?.name ?? ''}
                className="mt-1 block w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-xs focus:border-[#00609c] focus:outline-none focus:ring-2 focus:ring-[#00609c]/20"
              />
            </div>
            <div>
              <label htmlFor="speaker2Topic" className="block text-sm font-semibold text-slate-800">
                Tema do 2º Discurso
              </label>
              <input
                type="text"
                id="speaker2Topic"
                name="speaker2Topic"
                placeholder="Ex: O Poder da Oração"
                defaultValue={speaker2?.topic ?? ''}
                className="mt-1 block w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-xs focus:border-[#00609c] focus:outline-none focus:ring-2 focus:ring-[#00609c]/20"
              />
            </div>
          </div>
        </div>
      </fieldset>

      {/* Closing */}
      <fieldset className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
        <legend className="px-2 text-base font-bold text-[#002b49]">
          Encerramento
        </legend>

        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Closing Hymn Number */}
          <div>
            <label htmlFor="closingHymnNumber" className="block text-sm font-semibold text-slate-800">
              Nº do Hino de Encerramento *
            </label>
            <input
              type="number"
              id="closingHymnNumber"
              name="closingHymnNumber"
              min="1"
              defaultValue={meeting?.closingHymn?.number ?? ''}
              aria-describedby="closingHymnNumber-error"
              className="mt-1 block w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-xs focus:border-[#00609c] focus:outline-none focus:ring-2 focus:ring-[#00609c]/20"
              required
            />
            <div id="closingHymnNumber-error" aria-live="polite" className="mt-1 min-h-[1.25rem] text-xs text-red-600">
              {state.errors?.closingHymnNumber?.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          </div>

          {/* Closing Hymn Title */}
          <div>
            <label htmlFor="closingHymnTitle" className="block text-sm font-semibold text-slate-800">
              Título do Hino de Encerramento *
            </label>
            <input
              type="text"
              id="closingHymnTitle"
              name="closingHymnTitle"
              placeholder="Ex: Chamados a Servir"
              defaultValue={meeting?.closingHymn?.title ?? ''}
              aria-describedby="closingHymnTitle-error"
              className="mt-1 block w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-xs focus:border-[#00609c] focus:outline-none focus:ring-2 focus:ring-[#00609c]/20"
              required
            />
            <div id="closingHymnTitle-error" aria-live="polite" className="mt-1 min-h-[1.25rem] text-xs text-red-600">
              {state.errors?.closingHymnTitle?.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          </div>

          {/* Closing Prayer */}
          <div className="sm:col-span-2">
            <label htmlFor="closingPrayer" className="block text-sm font-semibold text-slate-800">
              Última Oração *
            </label>
            <input
              type="text"
              id="closingPrayer"
              name="closingPrayer"
              placeholder="Ex: Irmão Levi"
              defaultValue={meeting?.closingPrayer ?? ''}
              aria-describedby="closingPrayer-error"
              className="mt-1 block w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-xs focus:border-[#00609c] focus:outline-none focus:ring-2 focus:ring-[#00609c]/20"
              required
            />
            <div id="closingPrayer-error" aria-live="polite" className="mt-1 min-h-[1.25rem] text-xs text-red-600">
              {state.errors?.closingPrayer?.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          </div>
        </div>
      </fieldset>

      {/* Announcements & Ward Business */}
      <fieldset className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
        <legend className="px-2 text-base font-bold text-[#002b49]">
          Anúncios e Assuntos
        </legend>

        <div className="mt-4 space-y-6">
          <div>
            <label htmlFor="announcements" className="block text-sm font-semibold text-slate-800">
              Anúncios da Ala (um por linha)
            </label>
            <textarea
              id="announcements"
              name="announcements"
              rows={3}
              placeholder="Caravana ao Templo&#10;Mutirão de limpeza no sábado"
              defaultValue={meeting?.announcements?.join('\n') ?? ''}
              className="mt-1 block w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-xs focus:border-[#00609c] focus:outline-none focus:ring-2 focus:ring-[#00609c]/20"
            />
          </div>

          <div>
            <label htmlFor="wardBusiness" className="block text-sm font-semibold text-slate-800">
              Assuntos da Ala (um por linha)
            </label>
            <textarea
              id="wardBusiness"
              name="wardBusiness"
              rows={2}
              placeholder="Apresentação de novos chamados&#10;Boas-vindas aos visitantes"
              defaultValue={meeting?.wardBusiness?.map((b) => b.description).join('\n') ?? ''}
              className="mt-1 block w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-xs focus:border-[#00609c] focus:outline-none focus:ring-2 focus:ring-[#00609c]/20"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="stakeBusiness"
              name="stakeBusiness"
              defaultChecked={meeting?.stakeBusiness ?? false}
              className="h-4 w-4 rounded border-slate-300 text-[#002b49] focus:ring-[#00609c]"
            />
            <label htmlFor="stakeBusiness" className="text-sm font-medium text-slate-700">
              Houve assuntos da estaca tratados nesta reunião
            </label>
          </div>
        </div>
      </fieldset>

      {/* Buttons */}
      <div className="flex items-center justify-end gap-4 border-t border-slate-200 pt-6">
        <Link
          href="/meetings"
          className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-xs hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300"
        >
          Cancelar
        </Link>
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center rounded-lg bg-[#002b49] px-6 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#00609c] focus:outline-none focus:ring-2 focus:ring-[#00609c] focus:ring-offset-2 disabled:opacity-50"
        >
          {isPending ? 'Salvando...' : isEditing ? 'Atualizar Reunião' : 'Criar Reunião'}
        </button>
      </div>
    </form>
  );
}
