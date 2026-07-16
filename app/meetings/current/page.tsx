export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { getMeetings } from "../../lib/meetings-db";

export default function CurrentMeeting() {
    const today = new Date();
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - today.getDay()); 

    const iso = `${sunday.getFullYear()}-${String(sunday.getMonth() + 1).padStart(2, "0")}-${String(sunday.getDate()).padStart(2, "0")}`;

    const meetings = getMeetings();

    const exact = meetings.find((m) => m.date === iso);

    const mostRecent = meetings
        .filter((m) => m.date <= iso)
        .sort((a, b) => b.date.localeCompare(a.date))[0];

    const meeting = exact ?? mostRecent;

    if (meeting) {
        redirect(`/meetings/${meeting.id}`);
    } 
    redirect("/meetings");   
}