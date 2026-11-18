import { Suspense } from 'react';
import Link from 'next/link';
import MeetingCard from '@/components/MeetingCard';
import MeetingSearch from '@/components/MeetingSearch';
import Pagination from '@/components/Pagination';
import { getMeetings } from '@/lib/meetings-db';

export default async function MeetingsPage(
  props: PageProps<'/meetings'>,
) {
  const searchParams = await props.searchParams;
  const query = typeof searchParams.query === 'string' ? searchParams.query : '';
  const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page, 10) : 1;

  const pageSize = 5;
  const { meetings, totalCount } = await getMeetings({
    query,
    page: isNaN(page) ? 1 : page,
    pageSize,
  });

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="space-y-6">
      {/* Search Bar + Create New Meeting button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Suspense fallback={<div className="h-10 w-full max-w-md animate-pulse rounded-lg bg-slate-200" />}>
          <MeetingSearch />
        </Suspense>
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-slate-500">
            {totalCount} {totalCount === 1 ? 'reunião encontrada' : 'reuniões encontradas'}
          </span>
          <Link
            href="/meetings/new"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#002b49] px-4 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-[#00609c]"
          >
            <span>+</span> Nova Reunião
          </Link>
        </div>
      </div>

      {/* Meetings List */}
      <div className="space-y-4">
        {meetings.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center">
            <p className="text-base font-semibold text-slate-700">
              Nenhuma reunião encontrada
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Tente alterar os termos da busca para encontrar outros registros.
            </p>
          </div>
        ) : (
          meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))
        )}
      </div>

      {/* Pagination with Suspense */}
      <Suspense fallback={<div className="h-10 w-full animate-pulse bg-slate-100 rounded" />}>
        <Pagination totalPages={totalPages} />
      </Suspense>
    </div>
  );
}
