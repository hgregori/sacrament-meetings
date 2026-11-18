'use client';

import { deleteMeeting } from '@/lib/actions';
import { useTransition } from 'react';

interface DeleteMeetingButtonProps {
  id: number;
}

export default function DeleteMeetingButton({ id }: DeleteMeetingButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();
    if (confirm('Tem certeza que deseja excluir esta reunião?')) {
      startTransition(async () => {
        await deleteMeeting(id);
      });
    }
  };

  return (
    <form onSubmit={handleDelete} className="inline-block">
      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-400 disabled:opacity-50"
        aria-label={`Excluir reunião #${id}`}
      >
        <svg
          className="h-3.5 w-3.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
        {isPending ? 'Excluindo...' : 'Excluir'}
      </button>
    </form>
  );
}
