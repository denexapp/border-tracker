import { EntryFieldExtractor } from "./entryFieldExtractor";
import { date } from "./extractors/date";
import { region } from "./extractors/region";
import { type } from "./extractors/type";

export const entryFieldKeys = ["type", "date", "region"] as const;
export type EntryKey = (typeof entryFieldKeys)[number];

export const entryFieldExtractors = {
  type,
  date,
  region,
} as const satisfies Record<EntryKey, EntryFieldExtractor<unknown>>;

export type Entry = { [key in EntryKey]: ReturnType<(typeof entryFieldExtractors)[key]> };
