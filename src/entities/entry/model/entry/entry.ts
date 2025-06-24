import { EntryFieldExtractor } from "../../lib/entryFieldExtractor";
import { date } from "../../lib/extractors/date";
import { region } from "../../lib/extractors/region";
import { direction } from "../../lib/extractors/direction";
import { additionalStatuses } from "../../lib/extractors/additionalStatuses";

export const entryFieldKeys = ["direction", "date", "region", "additionalStatuses"] as const;
export type EntryKey = (typeof entryFieldKeys)[number];

export const entryFieldExtractors = {
  direction,
  date,
  region,
  additionalStatuses,
} as const satisfies Record<EntryKey, EntryFieldExtractor<unknown, unknown>>;

export type Entry = { [key in EntryKey]: Awaited<ReturnType<(typeof entryFieldExtractors)[key]>> };
