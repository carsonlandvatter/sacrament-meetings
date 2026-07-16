import Link from "next/link";

export default function MeetingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section>
            {children}
        </section>
    );
}