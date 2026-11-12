'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface PaginationProps {
  totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <nav
      className="flex items-center justify-between border-t border-slate-200 px-4 py-4 sm:px-0"
      aria-label="Paginação das reuniões"
    >
      <div className="-mt-px flex w-0 flex-1">
        {isFirstPage ? (
          <span
            aria-disabled="true"
            className="inline-flex cursor-not-allowed items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-slate-300"
          >
            &larr; Anterior
          </span>
        ) : (
          <Link
            href={createPageURL(currentPage - 1)}
            className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-slate-600 transition-colors hover:border-[#00609c] hover:text-[#002b49]"
          >
            &larr; Anterior
          </Link>
        )}
      </div>

      <div className="hidden md:-mt-px md:flex">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
          const isCurrent = page === currentPage;
          return (
            <Link
              key={page}
              href={createPageURL(page)}
              aria-current={isCurrent ? 'page' : undefined}
              className={`inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium transition-colors ${
                isCurrent
                  ? 'border-[#002b49] font-bold text-[#002b49]'
                  : 'border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-800'
              }`}
            >
              {page}
            </Link>
          );
        })}
      </div>

      <div className="-mt-px flex w-0 flex-1 justify-end">
        {isLastPage ? (
          <span
            aria-disabled="true"
            className="inline-flex cursor-not-allowed items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-slate-300"
          >
            Próximo &rarr;
          </span>
        ) : (
          <Link
            href={createPageURL(currentPage + 1)}
            className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-slate-600 transition-colors hover:border-[#00609c] hover:text-[#002b49]"
          >
            Próximo &rarr;
          </Link>
        )}
      </div>
    </nav>
  );
}

