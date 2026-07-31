import { getMeetingById } from "@/app/lib/meetings-db";
import { updateMeeting } from "@/app/lib/actions";
import MeetingForm from "@/app/components/MeetingForm";
import { notFound } from "next/navigation";

export default async function EditMeetingPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const meeting = await getMeetingById(Number(id));
    if (!meeting) notFound();

    return (
        <MeetingForm
            action={updateMeeting.bind(null, meeting.id)}
            meeting={meeting}
        />
    );
}