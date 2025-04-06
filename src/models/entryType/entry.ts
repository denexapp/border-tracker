import { EntryFieldExtractor } from './entryFieldExtractor';
import { type } from './extractors/type';

export const entryFieldKeys = ["type"] as const;
export type EntryKey = (typeof entryFieldKeys)[number];

export const entryFieldExtractors = {
  type,
} as const satisfies Record<EntryKey, EntryFieldExtractor<unknown>>;

export type Entry = { [key in EntryKey]: ReturnType<(typeof entryFieldExtractors)[key]> };