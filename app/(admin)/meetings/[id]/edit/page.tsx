import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import MeetingForm from '@/components/MeetingForm';
import { getMeetingById } from '@/lib/meetings-db';

async function EditMeetingContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericId = Number(id);

  if (isNaN(numericId)) {
    notFound();
  }

  const meeting = await getMeetingById(numericId);

  if (!meeting) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#002b49]">
          Editar Reunião Sacramental #{meeting.id}
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Atualize os dados e a programação para {meeting.date}.
        </p>
      </div>

      <MeetingForm meeting={meeting} />
    </div>
  );
}

export default function EditMeetingPage(
  props: PageProps<'/meetings/[id]'>,
) {
  return (
    <Suspense fallback={<div className="h-64 w-full animate-pulse rounded-xl bg-slate-100" />}>
      <EditMeetingContent params={props.params} />
    </Suspense>
  );
}
