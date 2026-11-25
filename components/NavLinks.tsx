'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinksProps {
  user?: {
    name?: string | null;
    email?: string | null;
  } | null;
  signOutSlot?: React.ReactNode;
}

export default function NavLinks({ user, signOutSlot }: NavLinksProps) {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Início' },
    { href: '/meetings', label: 'Todas as Reuniões' },
    { href: '/meetings/current', label: 'Este Domingo' },
  ];

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

        {/* Display Login only if user is NOT logged in */}
        {!user ? (
          <li>
            <Link
              href="/login"
              className={`inline-flex items-center rounded-md px-3.5 py-1.5 text-sm font-semibold transition-all duration-150 ${
                pathname === '/login'
                  ? 'bg-[#002b49] text-white shadow-sm ring-1 ring-[#002b49]'
                  : 'text-[#00609c] hover:bg-sky-50'
              }`}
            >
              Login
            </Link>
          </li>
        ) : (
          <li className="flex items-center gap-2 pl-1">
            <span className="text-xs font-medium text-slate-500 hidden md:inline">
              Olá, <strong className="text-slate-800">{user.name || 'Líder'}</strong>
            </span>
            {signOutSlot}
          </li>
        )}
      </ul>
    </nav>
  );
}
