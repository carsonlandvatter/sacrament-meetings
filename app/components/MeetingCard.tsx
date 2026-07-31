import type { SacramentMeeting } from "../lib/types";
import Link from "next/link";

export default function MeetingCard({ meeting }: {meeting: SacramentMeeting}) {
    return (
        <Link href={`/meetings/${meeting.id}`} className="block mb-6 border mx-auto p-10 w-full max-w-md">
        <h2>Sacrament Meeting Card</h2>
        <p>{meeting.date}</p>
        <p>{meeting.meetingType}</p>
        <div>{meeting.speakers.map((s, i) => (
                <p key={i}>{s.name} - {s.topic}</p>
            ))}
        </div>
        </Link>
    );
}