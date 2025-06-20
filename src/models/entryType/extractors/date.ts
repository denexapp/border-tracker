import { propertyNameDate } from "@/consts";
import { SimpleDate } from "@/models/simpleDate/simpleDate";
import { EntryFieldExtractor } from "../entryFieldExtractor";

export type EntryDate = SimpleDate;

export const date: EntryFieldExtractor<EntryDate> = (page) => {
  const entryTypeProperty = page.properties[propertyNameDate];

  if (entryTypeProperty === undefined) {
    throw new Error("Incorrect format");
  }

  if (entryTypeProperty.type !== "date") {
    throw new Error("Incorrect format");
  }

  if (entryTypeProperty.date === null) {
    return null;
  } 

  const dateParts = entryTypeProperty.date.start.split("-");

  if (dateParts.length !== 3) {
    throw new Error("Incorrect format");
  }

  const [year, month, day] = dateParts.map((value) => Number.parseInt(value, 10));

  return {
    year,
    month,
    day,
  };
};
