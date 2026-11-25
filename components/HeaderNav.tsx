import { auth } from '@/auth';
import NavLinks from './NavLinks';
import { SignOutButton } from './sign-out-button';

export default async function HeaderNav() {
  const session = await auth();
  return (
    <NavLinks
      user={session?.user}
      signOutSlot={session?.user ? <SignOutButton /> : null}
    />
  );
}
