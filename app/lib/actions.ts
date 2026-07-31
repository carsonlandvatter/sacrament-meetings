'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
    addMeeting,
    updateMeeting as updateMeetingInDb,
    deleteMeeting as deleteMeetingInDb,
    type MeetingInput,
} from './meetings-db';
import { parse } from 'path';

const HymnSchema = z.object({
    number: z.coerce.number().int().positive('Hymn number must be positive'),
    title: z.string().min(1, 'Hymn title is required'),
});

const SpeakerSchema = z.object({
    name: z.string().min(1),
    topic: z.string(),
    type: z.enum(['speaker', 'musical-number']),
});

const MeetingFormSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD'),
  meetingType: z.enum(['testimony', 'regular', 'stake', 'general']),
  presiding: z.string().min(1, 'Presiding is required'),
  conducting: z.string().min(1, 'Conducting is required'),
  announcements: z.array(z.string()),
  openingHymn: HymnSchema,
  openingPrayer: z.string().min(1, 'Opening prayer is required'),
  wardBusiness: z.array(z.object({ description: z.string().min(1) })),
  stakeBusiness: z.boolean(),
  sacramentHymn: HymnSchema,
  speakers: z.array(SpeakerSchema),
  closingHymn: HymnSchema,
  closingPrayer: z.string().min(1, 'Closing prayer is required'),
});

export type State = {
    errors?: z.inferFlattenedErrors<typeof MeetingFormSchema>['fieldErrors'];
    message?: string | null;
}

function toLines(value: FormDataEntryValue | null): string[] {
    return String(value ?? '')
        .split('/n')
        .map((line) => line.trim())
        .filter(Boolean);
}

function parseMeetingForm(formData: FormData) {
    const names = formData.getAll('speakerName').map(String);
    const topics = formData.getAll('speakerTopic').map(String);
    const types = formData.getAll('speakerType').map(String);

    const raw = {
    date: formData.get('date'),
    meetingType: formData.get('meetingType'),
    presiding: formData.get('presiding'),
    conducting: formData.get('conducting'),
    announcements: toLines(formData.get('announcements')),
    openingHymn: {
      number: formData.get('openingHymnNumber'),
      title: formData.get('openingHymnTitle'),
    },
    openingPrayer: formData.get('openingPrayer'),
    wardBusiness: toLines(formData.get('wardBusiness')).map((description) => ({
      description,
    })),
    stakeBusiness: formData.get('stakeBusiness') === 'on',
    sacramentHymn: {
      number: formData.get('sacramentHymnNumber'),
      title: formData.get('sacramentHymnTitle'),
    },
    speakers: names
      .map((name, i) => ({
        name,
        topic: topics[i] ?? '',
        type: types[i] ?? 'speaker',
      }))
      .filter((speaker) => speaker.name.trim() !== ''),
    closingHymn: {
      number: formData.get('closingHymnNumber'),
      title: formData.get('closingHymnTitle'),
    },
    closingPrayer: formData.get('closingPrayer'),
  };

  return MeetingFormSchema.safeParse(raw);
};

export async function createMeeting(
    prevState: State,
    formData: FormData
): Promise<State> {
    const parsed = parseMeetingForm(formData);
    if (!parsed.success) {
        return {
            errors: z.flattenError(parsed.error).fieldErrors,
            message: 'Missing or invalid fields. Could not create meeting.',
        };
    }

    try {
        await addMeeting(parsed.data satisfies MeetingInput);
    } catch (error) {
        console.error('createMeeting failed:', error);
        throw new Error('Could not create the meeting. Please try again.');
    }

    revalidatePath('/meetings');
    redirect('/meetings');
}

export async function updateMeeting(
    id: number,
    prevState: State,
    formData: FormData
): Promise<State> {
    const parsed = parseMeetingForm(formData);
    if (!parsed.success) {
        return {
            errors: z.flattenError(parsed.error).fieldErrors,
            message: 'Missing or invalid fields. Could not update meeting.',
        };
    }

    let updated;
    try {
        updated = await updateMeetingInDb(id, parsed.data satisfies MeetingInput);
    } catch (error) {
        console.error(`updateMeeting(${id}) failed:`, error);
        throw new Error('Could not update the meeting. Please try again.');
    }

    if (!updated) throw new Error(`No meeting with id ${id}`);

    revalidatePath('/meetings');
    revalidatePath(`/meetings/${id}`);
    redirect('/meetings');
}

export async function deleteMeeting(id: number) {
    try {
        await deleteMeetingInDb(id);
    } catch (error) {
        console.error(`deleteMeeting(${id}) failed:`, error);
        throw new Error('Could not delete the meeting. Please try again');
    }
    revalidatePath('/meetings');
}