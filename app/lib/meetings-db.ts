import type { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: '2026-05-03',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    openingHymn: { number: 2, title: 'The Spirit of God' },
    openingPrayer: 'Sister Williams',
    wardBusiness: [{ description: 'Sustaining of new Primary president' }],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: "In Remembrance of Thy Suffering" },
    speakers: [
      { name: 'Sister Brown', topic: 'Faith in Jesus Christ', type: 'speaker' },
      { name: 'Youth Choir', topic: '', type: 'musical-number' }
    ],
    closingHymn: { number: 31, title: 'O God, Our Help in Ages Past' },
    closingPrayer: 'Brother Davis',
    announcements: ['Ward temple night: May 10']
  },
  {
    id: 2,
    date: '2026-05-10',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Miller',
    openingHymn: { number: 19, title: 'We Thank Thee, O God, for a Prophet' },
    openingPrayer: 'Brother Anderson',
    wardBusiness: [{ description: 'Release of Sunday School teacher' }],
    stakeBusiness: false,
    sacramentHymn: { number: 193, title: 'I Stand All Amazed' },
    speakers: [
      { name: 'Brother Taylor', topic: 'The Atonement of Jesus Christ', type: 'speaker' },
      { name: 'Sister Nelson', topic: 'Repentance', type: 'speaker' },
      { name: 'Brother Clark', topic: 'Enduring to the End', type: 'speaker' }
    ],
    closingHymn: { number: 152, title: 'God Be with You Till We Meet Again' },
    closingPrayer: 'Sister Roberts',
    announcements: ['Relief Society service project: May 15']
  },
  {
    id: 3,
    date: '2026-06-07',
    meetingType: 'testimony',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    openingHymn: { number: 26, title: 'Joseph Smith\'s First Prayer' },
    openingPrayer: 'Brother Thompson',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 181, title: 'Jesus of Nazareth, Savior and King' },
    speakers: [],
    closingHymn: { number: 141, title: "Jesus, the Very Thought of Thee" },
    closingPrayer: 'Sister Hall',
    announcements: ['Fast offerings collected today']
  },
  {
    id: 4,
    date: '2026-06-14',
    meetingType: 'stake',
    presiding: 'President Wright',
    conducting: 'President Wright',
    openingHymn: { number: 30, title: 'Come, Come, Ye Saints' },
    openingPrayer: 'Sister Adams',
    wardBusiness: [{ description: 'Sustaining of new stake high councilor' }],
    stakeBusiness: true,
    sacramentHymn: { number: 174, title: 'While of These Emblems We Partake' },
    speakers: [
      { name: 'President Wright', topic: 'Building Zion', type: 'speaker' },
      { name: 'Ward Choir', topic: '', type: 'musical-number' },
      { name: 'Sister Cook', topic: 'Missionary Work', type: 'speaker' }
    ],
    closingHymn: { number: 62, title: 'All Creatures of Our God and King' },
    closingPrayer: 'Brother Morgan',
    announcements: ['Stake conference: June 21']
  },
  {
    id: 5,
    date: '2026-07-05',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    openingHymn: { number: 339, title: 'My Country, \'Tis of Thee' },
    openingPrayer: 'Brother Bennett',
    wardBusiness: [{ description: 'Sustaining of new Elders Quorum counselor' }],
    stakeBusiness: false,
    sacramentHymn: { number: 170, title: 'God, Our Father, Hear Us Pray' },
    speakers: [
      { name: 'Sister Parker', topic: 'Gratitude', type: 'speaker' },
      { name: 'Brother Evans', topic: 'Service', type: 'speaker' }
    ],
    closingHymn: { number: 89, title: 'The Lord Is My Light' },
    closingPrayer: 'Sister Turner',
    announcements: ['Ward temple night: July 12', 'Youth activity: July 9']
  },
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) return meetings.filter(m => m.date === date);
  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find(m => m.id === id) ?? null;
}