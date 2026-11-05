'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Início' },
  { href: '/meetings', label: 'Todas as Reuniões' },
  { href: '/meetings/current', label: 'Este Domingo' },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Navegação principal">
      <ul className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        {links.map((link) => {
          const isActive =
            link.href === '/'
              ? pathname === '/'
              : pathname.startsWith(link.href);

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`inline-flex items-center rounded-md px-3.5 py-1.5 text-sm font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-[#002b49] text-white shadow-sm ring-1 ring-[#002b49]'
                    : 'text-slate-700 hover:bg-sky-50 hover:text-[#00609c]'
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
