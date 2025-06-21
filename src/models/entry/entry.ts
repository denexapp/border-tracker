import { EntryFieldExtractor } from "./entryFieldExtractor";
import { date } from "./extractors/date";
import { region } from "./extractors/region";
import { direction } from "./extractors/direction";

export const entryFieldKeys = ["direction", "date", "region"] as const;
export type EntryKey = (typeof entryFieldKeys)[number];

export const entryFieldExtractors = {
  direction,
  date,
  region,
} as const satisfies Record<EntryKey, EntryFieldExtractor<unknown>>;

export type Entry = { [key in EntryKey]: ReturnType<(typeof entryFieldExtractors)[key]> };
