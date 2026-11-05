import MeetingCard from '@/components/MeetingCard';
import { getMeetings } from '@/lib/meetings-db';

export default async function MeetingsPage() {
  const meetings = getMeetings();

  return (
    <div className="space-y-4">
      {meetings.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No meetings found.</p>
      ) : (
        meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))
      )}
    </div>
  );
}
