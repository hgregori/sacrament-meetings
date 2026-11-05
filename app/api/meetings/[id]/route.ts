import { getMeetingById } from '@/lib/meetings-db';
import { NextRequest } from 'next/server';

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<'/api/meetings/[id]'>,
) {
  const { id } = await ctx.params;

  const numericId = Number(id);

  if (isNaN(numericId)) {
    return Response.json({ error: 'Invalid meeting ID' }, { status: 400 });
  }

  const meeting = getMeetingById(numericId);

  if (!meeting) {
    return Response.json({ error: 'Meeting not found' }, { status: 404 });
  }

  return Response.json(meeting);
}

