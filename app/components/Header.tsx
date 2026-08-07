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
      <div className="flex justify-center pb-6">
        {session ? (
          <form action={logOut}>
            <button
              type="submit"
              className="rounded-md border border-foreground/25 px-4 py-2 text-sm font-medium transition hover:bg-foreground/5"
            >
              Sign out
            </button>
          </form>
        ) : (
          <Link
            href="/login"
            className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background shadow-sm transition hover:opacity-85"
          >
            Sign in
          </Link>
        )}
      </div>
    </header>
  );
}