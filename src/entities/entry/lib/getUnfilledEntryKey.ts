import { Entry, fillableEntryFieldKeys, FillableEntryFieldKey } from "../model/entry/entry";

export const getUnfilledEntryKey = (entry: Entry): FillableEntryFieldKey | null => {
  for (const key of fillableEntryFieldKeys) {
    if (entry.fillableFields[key].filled === false) {
      return key;
    }
  }
  return null;
};
