'use client';

import { useActionState } from 'react';
import { authenticate } from '@/app/lib/auth-actions';

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <form action={formAction} className="mx-auto flex w-full max-w-sm flex-col gap-4 p-6 text-left">
      <input type="hidden" name="redirectTo" value="/meetings/new" />

      <label htmlFor="username" className="text-sm font-medium">Username</label>
      <input
        id="username"
        name="username"
        required
        aria-describedby="login-error"
        className="w-full rounded-md border border-foreground/20 bg-transparent px-3 py-2 text-sm"
      />

      <label htmlFor="password" className="text-sm font-medium">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        required
        aria-describedby="login-error"
        className="w-full rounded-md border border-foreground/20 bg-transparent px-3 py-2 text-sm"
      />

      <div id="login-error" aria-live="polite">
        {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background disabled:opacity-50"
      >
        {isPending ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  );
}
