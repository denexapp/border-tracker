import { EntryFieldExtractor } from "../../lib/entryFieldExtractor";
import { date } from "../../lib/extractors/date";
import { region } from "../../lib/extractors/region";
import { direction } from "../../lib/extractors/direction";
import { additionalStatuses } from "../../lib/extractors/additionalStatuses";
import { way } from "../../lib/extractors/way";

export const fillableEntryFieldKeys = ["direction", "way", "date", "region", "additionalStatuses"] as const;
export type FillableEntryFieldKey = (typeof fillableEntryFieldKeys)[number];

export const fillableEntryFieldExtractors = {
  direction,
  way,
  date,
  region,
  additionalStatuses,
} as const satisfies Record<string, EntryFieldExtractor<unknown, unknown>>;

export type FillableEntryFields = {
  [key in FillableEntryFieldKey]: Awaited<ReturnType<(typeof fillableEntryFieldExtractors)[key]>>;
};

export type Entry = { id: string; fillableFields: FillableEntryFields };
