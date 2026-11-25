import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export default NextAuth(authConfig).auth;

export const config = {
  // Run middleware on all routes except static files, Next.js internals, and api
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
