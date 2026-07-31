import type { SacramentMeeting } from "../lib/types";
import Link from "next/link";
import { deleteMeeting } from "../lib/actions";

export default function MeetingCard({ meeting }: {meeting: SacramentMeeting}) {
    return (
        <div className="mb-6 border mx-auto p-10 w-full max-w-md">
        <Link href={`/meetings/${meeting.id}`} className="block">
        <h2>Sacrament Meeting Card</h2>
        <p>{meeting.date}</p>
        <p>{meeting.meetingType}</p>
        <div>{meeting.speakers.map((s, i) => (
                <p key={i}>{s.name} - {s.topic}</p>
            ))}
        </div>
        </Link>

        <div className="mt-4 flex items-center justify-center gap-3">
            <Link
                href={`/meetings/${meeting.id}/edit`}
                className="rounded-md border border-foreground/20 px-3 py-1.5 text-sm transition hover:bg-foreground/5"
            >
                Edit
            </Link>

            <form action={deleteMeeting.bind(null, meeting.id)}>
                <button
                    type="submit"
                    className="rounded-md border border-red-500/40 px-3 py-1.5 text-sm text-red-500 transition hover:bg-red-500/10"
                >
                    Delete
                </button>
            </form>
        </div>
        </div>
    );
}