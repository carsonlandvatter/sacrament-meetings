import { auth } from '@/auth';
import { logOut } from '../lib/auth-actions';  
import Link from 'next/link';
import Nav from './NavLinks';

export default async function Header() {
    const session = await auth();

    const today = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
    <header>
      <Nav />
      <h1 className="m-6">Seaside Ward - {today}</h1>
      <div className="pb-4 text-sm">
        {session ? (
          <form action={logOut}>
            <button type="submit" className="underline">Sign out</button>
          </form>
        ) : (
          <Link href="/login" className="underline">Sign in</Link>
        )}
      </div>
    </header>
  );
}