export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { getMeetings } from "@/app/lib/meetings-db";

export default async function CurrentMeeting() {
    const today = new Date();
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - today.getDay()); 

    const iso = `${sunday.getFullYear()}-${String(sunday.getMonth() + 1).padStart(2, "0")}-${String(sunday.getDate()).padStart(2, "0")}`;

    const meetings = await getMeetings();

    const exact = meetings.find((m) => m.date === iso);

    const meeting = exact;

    if (meeting) {
        redirect(`/meetings/${meeting.id}`);
    } 
    redirect("/meetings");   
}