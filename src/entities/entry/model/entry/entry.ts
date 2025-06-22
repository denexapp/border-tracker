import { EntryFieldExtractor } from "../../lib/entryFieldExtractor";
import { date } from "../../lib/extractors/date";
import { region } from "../../lib/extractors/region";
import { direction } from "../../lib/extractors/direction";

export const entryFieldKeys = ["direction", "date", "region"] as const;
export type EntryKey = (typeof entryFieldKeys)[number];

export const entryFieldExtractors = {
  direction,
  date,
  region,
} as const satisfies Record<EntryKey, EntryFieldExtractor<unknown>>;

export type Entry = { [key in EntryKey]: ReturnType<(typeof entryFieldExtractors)[key]> };
