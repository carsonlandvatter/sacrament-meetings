import type { SacramentMeeting } from "@/app/lib/types";
import MeetingDetail from "../../components/MeetingDetail";
import { notFound } from "next/navigation";
import { headers } from "next/headers";

export default async function MeetingDetailPage({
    params,
}: {
    params: Promise<{id: string }>;
}) {
    const { id } =await params;
    const host = (await headers()).get("host")!;
    const base = `${host.includes("localhost") ? "http" : "https"}://${host}`;

    const res = await fetch (`${base}/api/meetings/${id}`)

    if (!res.ok) {
        notFound();
    }

    const meeting: SacramentMeeting = await res.json();

    return <MeetingDetail meeting={meeting} />
}