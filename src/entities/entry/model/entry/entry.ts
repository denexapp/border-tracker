import { EntryFieldExtractor } from "../../lib/entryFieldExtractor";
import { additionalStatuses } from "../../lib/extractors/additionalStatuses";
import { date } from "../../lib/extractors/date";
import { direction } from "../../lib/extractors/direction";
import { number } from "../../lib/extractors/number";
import { region } from "../../lib/extractors/region";
import { way } from "../../lib/extractors/way";

export const fillableEntryFieldKeys = ["number", "direction", "way", "date", "region", "additionalStatuses"] as const;
export type FillableEntryFieldKey = (typeof fillableEntryFieldKeys)[number];

export const fillableEntryFieldExtractors = {
  number,
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
