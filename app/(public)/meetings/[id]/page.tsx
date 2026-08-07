import { getMeetingById } from "@/app/lib/meetings-db";
import MeetingDetail from "@/app/components/MeetingDetail";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export default async function MeetingDetailPage({ 
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const meeting = await getMeetingById(Number(id));
    if (!meeting) notFound();
    return <MeetingDetail meeting={meeting} />
}

export async function generateMetadata ({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;
    const meeting = await getMeetingById(Number(id));
    if (!meeting) return { title: 'Meeting Not Found' };

    return {
        title: `Sacrament Meeting - ${meeting.date}`,
        description: `Agenda for the ${meeting.meetingType} sacrament meeting on ${meeting.date}. Presiding: ${meeting.presiding}.`
    };
}