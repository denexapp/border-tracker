import { Entry, entryFieldKeys, EntryKey } from "../model/entry/entry";

export const getUnfilledEntryKey = (entry: Entry): EntryKey | null => {
  for (const key of entryFieldKeys) {
    if (entry[key] === null) {
      return key;
    }
  }
  return null;
};
