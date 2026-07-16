import type { SacramentMeeting } from "../lib/types";
import MeetingCard from "../components/MeetingCard";
import { headers } from "next/headers";

export default async function MeetingHome() {
    const host = (await headers()).get("host")!;
    const protocol = host.includes("localhost") ? "http" : "https";
    const base = `${protocol}://${host}`;
    const res = await fetch(`${base}/api/meetings`);
    const meetings: SacramentMeeting[] = await res.json();

    return (
        <div>
            <h2 className="mb-6">All Meetings</h2>
            <div className="flex flex-col">
                {meetings.map((meeting) => (
                    <MeetingCard key={meeting.id} meeting={meeting} />
                ))}
            </div>
        </div>
    )
}