'use client';

import { cloneElement, isValidElement, useActionState } from 'react';
import type { State } from '@/app/lib/actions';
import type { Hymn, SacramentMeeting } from '@/app/lib/types';

const initialState: State = { message: null, errors: {}};

const labelClass = 'text-sm font-medium text-foreground/70';

const controlClass =
  'w-full rounded-md border border-foreground/20 bg-transparent px-3 py-2 text-sm ' +
  'outline-none transition placeholder:text-foreground/40 ' +
  'focus:border-foreground/50 focus:ring-2 focus:ring-foreground/15';

const sectionClass =
  'space-y-4 rounded-lg border border-foreground/15 px-5 pt-3 pb-5';

const legendClass =
  'px-2 text-xs font-semibold uppercase tracking-wider text-foreground/50';

function Field({
  label,
  htmlFor,
  hint,
  errors,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  errors?: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className={labelClass}>
        {label}
        {hint && <span className="ml-1 font-normal text-foreground/40">{hint}</span>}
      </label>
      {isValidElement<{ 'aria-describedby'?: string }>(children)
        ? cloneElement(children, { 'aria-describedby': `${htmlFor}-error` })
        : children}
      <div id={`${htmlFor}-error`} aria-live="polite" aria-atomic="true">
        {errors?.map((error) => (
          <p key={error} className="text-sm text-red-500">{error}</p>
        ))}
      </div>
    </div>
  );
}

function HymnFields({
  prefix,
  legend,
  hymn,
  errors,
}: {
  prefix: string;
  legend: string;
  hymn?: Hymn;
  errors?: string[];
}) {
  return (
    <fieldset className={sectionClass}>
      <legend className={legendClass}>{legend}</legend>

      <div className="grid grid-cols-[6rem_1fr] gap-3">
        <Field label="Number" htmlFor={`${prefix}Number`} errors={errors}>
          <input
            id={`${prefix}Number`}
            name={`${prefix}Number`}
            type="number"
            min="1"
            defaultValue={hymn?.number}
            required
            className={controlClass}
          />
        </Field>

        <Field label="Title" htmlFor={`${prefix}Title`} errors={errors}>
          <input
            id={`${prefix}Title`}
            name={`${prefix}Title`}
            defaultValue={hymn?.title}
            required
            className={controlClass}
          />
        </Field>
      </div>
    </fieldset>
  );
}

export default function MeetingForm({
  action,
  meeting,
}: {
  action: (prevState: State, formData: FormData) => Promise<State>;
  meeting?: SacramentMeeting;
}) {
    const [state, formAction, isPending] = useActionState(action, initialState);
    
  return (
    <form
      action={formAction}
      className="mx-auto w-full max-w-2xl space-y-6 px-6 pb-12 text-left"
    >
      <fieldset className={sectionClass}>
        <legend className={legendClass}>Meeting details</legend>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Date" htmlFor="date" errors={state.errors?.date}>
            <input
              id="date"
              name="date"
              type="date"
              defaultValue={meeting?.date}
              required
              className={controlClass}
            />
          </Field>

          <Field label="Meeting type" htmlFor="meetingType" errors={state.errors?.meetingType}>
            <select
              id="meetingType"
              name="meetingType"
              defaultValue={meeting?.meetingType ?? 'regular'}
              className={controlClass}
            >
              <option value="regular">Regular</option>
              <option value="testimony">Testimony</option>
              <option value="stake">Stake</option>
              <option value="general">General</option>
            </select>
          </Field>

          <Field label="Presiding" htmlFor="presiding" errors={state.errors?.presiding}>
            <input
              id="presiding"
              name="presiding"
              defaultValue={meeting?.presiding}
              required
              className={controlClass}
            />
          </Field>

          <Field label="Conducting" htmlFor="conducting" errors={state.errors?.conducting}>
            <input
              id="conducting"
              name="conducting"
              defaultValue={meeting?.conducting}
              required
              className={controlClass}
            />
          </Field>
        </div>
      </fieldset>

      <fieldset className={sectionClass}>
        <legend className={legendClass}>Announcements &amp; business</legend>

        <Field label="Announcements" htmlFor="announcements" hint="one per line" errors={state.errors?.announcements}>
          <textarea
            id="announcements"
            name="announcements"
            rows={3}
            defaultValue={meeting?.announcements?.join('\n')}
            className={controlClass}
          />
        </Field>

        <Field label="Ward business" htmlFor="wardBusiness" hint="one per line" errors={state.errors?.wardBusiness}>
          <textarea
            id="wardBusiness"
            name="wardBusiness"
            rows={3}
            defaultValue={meeting?.wardBusiness
              .map((item) => item.description)
              .join('\n')}
            className={controlClass}
          />
        </Field>

        <div className="flex items-center gap-2">
          <input
            id="stakeBusiness"
            name="stakeBusiness"
            type="checkbox"
            defaultChecked={meeting?.stakeBusiness}
            className="size-4 accent-foreground"
          />
          <label htmlFor="stakeBusiness" className={labelClass}>
            Stake business
          </label>
        </div>
      </fieldset>

      <HymnFields
        prefix="openingHymn"
        legend="Opening hymn"
        hymn={meeting?.openingHymn}
        errors={state.errors?.openingHymn}
      />

      <HymnFields
        prefix="sacramentHymn"
        legend="Sacrament hymn"
        hymn={meeting?.sacramentHymn}
        errors={state.errors?.sacramentHymn}
      />

      <HymnFields
        prefix="closingHymn"
        legend="Closing hymn"
        hymn={meeting?.closingHymn}
        errors={state.errors?.closingHymn}
      />

      <fieldset className={sectionClass}>
        <legend className={legendClass}>Prayers</legend>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Opening prayer" htmlFor="openingPrayer" errors={state.errors?.openingPrayer}>
            <input
              id="openingPrayer"
              name="openingPrayer"
              defaultValue={meeting?.openingPrayer}
              required
              className={controlClass}
            />
          </Field>

          <Field label="Closing prayer" htmlFor="closingPrayer" errors={state.errors?.closingPrayer}>
            <input
              id="closingPrayer"
              name="closingPrayer"
              defaultValue={meeting?.closingPrayer}
              required
              className={controlClass}
            />
          </Field>
        </div>
      </fieldset>

      <fieldset className={sectionClass}>
        <legend className={legendClass}>Speakers</legend>

        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="grid gap-3 border-t border-foreground/10 pt-4 first:border-0 first:pt-0 sm:grid-cols-[1fr_1fr_10rem]"
          >
            <Field label="Name" htmlFor={`speakerName${i}`} errors={state.errors?.speakers}>
              <input
                id={`speakerName${i}`}
                name="speakerName"
                defaultValue={meeting?.speakers[i]?.name ?? ''}
                className={controlClass}
              />
            </Field>

            <Field label="Topic" htmlFor={`speakerTopic${i}`}>
              <input
                id={`speakerTopic${i}`}
                name="speakerTopic"
                defaultValue={meeting?.speakers[i]?.topic ?? ''}
                className={controlClass}
              />
            </Field>

            <Field label="Type" htmlFor={`speakerType${i}`}>
              <select
                id={`speakerType${i}`}
                name="speakerType"
                defaultValue={meeting?.speakers[i]?.type ?? 'speaker'}
                className={controlClass}
              >
                <option value="speaker">Speaker</option>
                <option value="musical-number">Musical number</option>
              </select>
            </Field>
          </div>
        ))}
      </fieldset>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-md bg-foreground px-4 py-2.5 text-sm font-medium text-background transition hover:opacity-85 disabled:opacity-50"
      >
        {isPending ? 'Saving…' : 'Save meeting'}
      </button>
    </form>
  );
}
