import Link from 'next/link';
import type { SacramentMeeting } from '@/lib/types';

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  const dateObj = new Date(meeting.date + 'T00:00:00');
  
  const formattedDay = dateObj.toLocaleDateString('pt-BR', { day: '2-digit' });
  const formattedMonth = dateObj.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '').toUpperCase();
  const formattedWeekday = dateObj.toLocaleDateString('pt-BR', { weekday: 'long' });
  const formattedYear = dateObj.getFullYear();

  const typeConfig: Record<string, { label: string; badgeClass: string }> = {
    regular: {
      label: 'Reunião Sacramental',
      badgeClass: 'bg-slate-100 text-slate-800 border-slate-200',
    },
    testimony: {
      label: 'Jejum e Testemunhos',
      badgeClass: 'bg-amber-50 text-amber-900 border-amber-200',
    },
    stake: {
      label: 'Conferência de Estaca',
      badgeClass: 'bg-sky-50 text-[#00609c] border-sky-200',
    },
    general: {
      label: 'Conferência Geral',
      badgeClass: 'bg-indigo-50 text-indigo-900 border-indigo-200',
    },
  };

  const currentType = typeConfig[meeting.meetingType] || {
    label: meeting.meetingType,
    badgeClass: 'bg-slate-100 text-slate-800 border-slate-200',
  };

  const speakersList = meeting.speakers
    .filter((s) => s.type === 'speaker')
    .map((s) => s.name);

  const musicalNumbers = meeting.speakers
    .filter((s) => s.type === 'musical-number')
    .map((s) => s.name);

  return (
    <Link
      href={`/meetings/${meeting.id}`}
      className="group relative flex flex-col sm:flex-row overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-md"
    >
      {/* Date badge on left */}
      <div className="flex sm:w-32 flex-row sm:flex-col items-center justify-between sm:justify-center border-b sm:border-b-0 sm:border-r border-slate-100 bg-slate-50/70 p-4 text-center">
        <div>
          <span className="block text-2xl font-black tracking-tight text-[#002b49]">
            {formattedDay}
          </span>
          <span className="block text-xs font-bold uppercase tracking-wider text-[#00609c]">
            {formattedMonth} {formattedYear}
          </span>
        </div>
        <span className="text-xs font-medium capitalize text-slate-500 sm:mt-1">
          {formattedWeekday}
        </span>
      </div>

      {/* Main card content */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${currentType.badgeClass}`}
            >
              {currentType.label}
            </span>
            <span className="text-xs font-semibold text-slate-400 group-hover:text-[#00609c] transition-colors">
              Ata #{meeting.id} &rarr;
            </span>
          </div>

          <h3 className="mt-2 text-base font-bold text-slate-900 group-hover:text-[#00609c] transition-colors">
            Presidida por {meeting.presiding}
          </h3>

          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
            <div>
              <span className="font-semibold text-slate-800">Direção:</span>{' '}
              {meeting.conducting}
            </div>
            <div>
              <span className="font-semibold text-slate-800">Hino Sacramental:</span>{' '}
              #{meeting.sacramentHymn.number} - {meeting.sacramentHymn.title}
            </div>
          </div>

          {speakersList.length > 0 && (
            <div className="mt-2 text-xs text-slate-600 line-clamp-1">
              <span className="font-semibold text-slate-800">Oradores:</span>{' '}
              {speakersList.join(', ')}
            </div>
          )}

          {musicalNumbers.length > 0 && (
            <div className="mt-1 text-xs text-purple-700">
              <span className="font-semibold">Música especial:</span>{' '}
              {musicalNumbers.join(', ')}
            </div>
          )}
        </div>

        {/* Bottom subtle accent bar */}
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
          <span>Hinos: #{meeting.openingHymn.number}, #{meeting.sacramentHymn.number}, #{meeting.closingHymn.number}</span>
          <span className="font-medium text-[#00609c] group-hover:underline">Ver agenda completa</span>
        </div>
      </div>
    </Link>
  );
}
