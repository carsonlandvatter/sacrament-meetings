import { createMeeting } from "@/app/lib/actions";
import MeetingForm from "@/app/components/MeetingForm";

export default function NewMeetingPage() {
    return <MeetingForm action={createMeeting} />;
}
