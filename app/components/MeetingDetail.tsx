import type { SacramentMeeting } from "../lib/types";

export default function MeetingDetail({meeting}: {meeting: SacramentMeeting}){
      return (
        <section className="p-10 border w-100 mx-auto">
            <h2>Date: {meeting.date}</h2>
            <p>Meeting Type: {meeting.meetingType}</p>
            <p>Presiding: {meeting.presiding}</p>
            <p>Conduction: {meeting.conducting}</p>
            <div>Announcements: <ul>{meeting.announcements?.map((a, i) => <li key={i}>{a}</li>)}</ul></div>
            <p>Opening Hymn: {meeting.openingHymn.number} - {meeting.openingHymn.title}</p>
            <p>Opening Prayer: {meeting.openingPrayer}</p>
            <div>Ward Business: {meeting.wardBusiness.map((item, i) => (
                <p key={i}>{item.description}</p>
            ))}</div>
            <p>Stake Business: {meeting.stakeBusiness ? "Yes" : "No"}</p>
            <p>Sacrament Hymn: {meeting.sacramentHymn.number} - {meeting.sacramentHymn.title}</p>
            <div>Speakers: {meeting.speakers.map((s, i) => (
                <p key={i}>{s.name} - {s.topic}</p>
            ))}</div>
            <p>Closing Hymn: {meeting.closingHymn.number} - {meeting.closingHymn.title}</p>
            <p>Closing Prayer: {meeting.closingPrayer}</p>
        </section>
      )
}