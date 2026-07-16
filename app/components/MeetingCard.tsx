import type { SacramentMeeting } from "../lib/types";
import Link from "next/link";

export default function MeetingCard({ meeting }: {meeting: SacramentMeeting}) {
    return (
        <Link href={`/meetings/${meeting.id}`} className="mb-6 border w-100 mx-auto p-10">
        <h2>Sacrament Meeting Card</h2>
        <p>{meeting.date}</p>
        <p>{meeting.meetingType}</p>
        <p>{meeting.openingPrayer}</p>
        </Link>
    );
}