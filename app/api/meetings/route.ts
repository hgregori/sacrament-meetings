import { getMeetings } from '@/lib/meetings-db';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get('date');
  const query = request.nextUrl.searchParams.get('query');
  const pageParam = request.nextUrl.searchParams.get('page');
  const page = pageParam ? parseInt(pageParam, 10) : 1;

  const result = await getMeetings({
    date,
    query,
    page: isNaN(page) ? 1 : page,
  });

  // When querying by exact date, or when returning general meetings list
  if (date) {
    return Response.json(result.meetings);
  }

  return Response.json(result);
}
