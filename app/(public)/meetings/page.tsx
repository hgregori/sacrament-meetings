import { Suspense } from 'react';
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
      {/* Search Bar with Suspense because it uses useSearchParams */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Suspense fallback={<div className="h-10 w-full max-w-md animate-pulse rounded-lg bg-slate-200" />}>
          <MeetingSearch />
        </Suspense>
        <span className="text-xs font-medium text-slate-500">
          {totalCount} {totalCount === 1 ? 'reunião encontrada' : 'reuniões encontradas'}
        </span>
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

