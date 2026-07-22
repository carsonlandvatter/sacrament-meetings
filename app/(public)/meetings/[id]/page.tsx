import { getMeetingById } from "@/app/lib/meetings-db";
import MeetingDetail from "@/app/components/MeetingDetail";
import { notFound } from "next/navigation";

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