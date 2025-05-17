import { EntryFieldExtractor } from "./entryFieldExtractor";
import { date } from "./extractors/date";
import { type } from "./extractors/type";

export const entryFieldKeys = ["type", "date"] as const;
export type EntryKey = (typeof entryFieldKeys)[number];

export const entryFieldExtractors = {
  type,
  date,
} as const satisfies Record<EntryKey, EntryFieldExtractor<unknown>>;

export type Entry = { [key in EntryKey]: ReturnType<(typeof entryFieldExtractors)[key]> };
