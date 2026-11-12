import { Suspense } from 'react';
import Link from 'next/link';

async function EditMeetingContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-xs">
      <h2 className="text-2xl font-bold tracking-tight text-[#002b49]">
        Edit Meeting #{id} — Coming in Week 04
      </h2>
      <p className="mt-2 text-sm text-slate-600">
        O formulário de edição de reuniões sacramentais será implementado na Semana 04.
      </p>
      <div className="mt-6">
        <Link
          href={`/meetings/${id}`}
          className="inline-flex items-center text-sm font-semibold text-[#00609c] hover:underline"
        >
          &larr; Voltar para ata da reunião
        </Link>
      </div>
    </div>
  );
}

export default function EditMeetingPage(
  props: PageProps<'/meetings/[id]'>,
) {
  return (
    <Suspense fallback={<div className="h-48 w-full animate-pulse rounded-xl bg-slate-100" />}>
      <EditMeetingContent params={props.params} />
    </Suspense>
  );
}
