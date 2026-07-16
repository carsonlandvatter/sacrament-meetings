import { getMeetings } from "../lib/meetings-db";
import MeetingCard from "../components/MeetingCard";

export default function MeetingHome() {
    const meetings = getMeetings();

    return (
        <div>
            <h1 className="mb-6">All Meetings</h1>
            <div className="flex flex-col">
                {meetings.map((meeting) => (
                <MeetingCard key={meeting.id} meeting={meeting}/>
                ))}
            </div>
        </div>
    )
}