import MeetingDetail from '@/components/MeetingDetail';
import { getMeetingById } from '@/lib/meetings-db';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';


export default async function MeetingDetailPage(
  props: PageProps<'/meetings/[id]'>,
) {
  const { id } = await props.params;
  const numericId = Number(id);

  if (isNaN(numericId)) {
    notFound();
  }

  const meeting = await getMeetingById(numericId);

  if (!meeting) {
    notFound();
  }

  return <MeetingDetail meeting={meeting} />;
}

export async function generateMetadata({ params }: PageProps<"/meetings/[id]">): Promise<Metadata> {
  const { id } = await params;
  const project = await getMeetingById(Number(id));

  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested portfolio project could not be found.',
    };
  }

  return {
    title: project.date,
    description: project.meetingType,
    openGraph: {
      title: project.date
    },
  };
} 