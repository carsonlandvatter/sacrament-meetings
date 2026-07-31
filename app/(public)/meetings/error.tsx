'use client';

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main className="p-10">
            <h2 className="text-xl font-semibold">Something went wrong</h2>
            <p className="mt-2 text-foreground/70">{error.message}</p>

            <div className="mt-6 flex items-center justify-center gap-3">
                <button
                    onClick={() => reset()}
                    className="rounded-md border border-foreground/20 px-3 py-1.5 text-sm hover:bg-foreground/5"
                >
                    Try Again
                </button>
                <Link href="/meetings" className="text-sm text-foreground/60 hover:text-foreground">
                    Back to meetings
                </Link>
            </div>
        </main>
    );
}