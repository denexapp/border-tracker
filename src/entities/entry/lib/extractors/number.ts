import { propertyNameNumber } from "@/entities/entry/config/consts";
import { EntryField, EntryFieldExtractor } from "../entryFieldExtractor";

export const number: EntryFieldExtractor<number | null> = async (page) => {
  const entryTypeProperty = page.properties[propertyNameNumber];

  if (entryTypeProperty === undefined) {
    throw new Error("Incorrect format");
  }

  if (entryTypeProperty.type !== "number") {
    throw new Error("Incorrect format");
  }

  const value = entryTypeProperty.number;
  const filled = value !== null;

  const result: EntryField<number | null> = {
    filled,
    value,
  };

  return result;
};
