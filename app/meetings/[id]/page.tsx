import MeetingDetail from '@/components/MeetingDetail';
import { getMeetingById } from '@/lib/meetings-db';
import { notFound } from 'next/navigation';

export default async function MeetingDetailPage(
  props: PageProps<'/meetings/[id]'>,
) {
  const { id } = await props.params;
  const numericId = Number(id);

  if (isNaN(numericId)) {
    notFound();
  }

  const meeting = getMeetingById(numericId);

  if (!meeting) {
    notFound();
  }

  return <MeetingDetail meeting={meeting} />;
}
