import Link from 'next/link';

export default function NotFound() {
    return (
        <main className="p-10">
            <h2 className="text-xl font-semibold">Meeting not found</h2>
            <p className="mt-2 text-foreground/70">
                We couldn&apos;t find a meeting with that ID.
            </p>
            <Link
                href="/meetings"
                className="mt-6 inline-block text-sm text-foreground/60 hover:text-foreground"
            >
                Back to meetings
            </Link>
        </main>
    );
}