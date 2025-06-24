import { propertyNameDate } from "@/entities/entry/config/consts";
import { SimpleDate } from "@/shared/model/simpleDate/simpleDate";
import { EntryField, EntryFieldExtractor } from "../entryFieldExtractor";

export const date: EntryFieldExtractor<SimpleDate | null> = async (page) => {
  const entryTypeProperty = page.properties[propertyNameDate];

  if (entryTypeProperty === undefined) {
    throw new Error("Incorrect format");
  }

  if (entryTypeProperty.type !== "date") {
    throw new Error("Incorrect format");
  }

  let value: SimpleDate | null = null;
  let filled = false;

  if (entryTypeProperty.date !== null) {
    const dateParts = entryTypeProperty.date.start.split("-");

    if (dateParts.length !== 3) {
      throw new Error("Incorrect format");
    }

    const [year, month, day] = dateParts.map((value) => Number.parseInt(value, 10));

    value = {
      year,
      month,
      day,
    };

    filled = true;
  }

  const result: EntryField<SimpleDate | null> = {
    filled,
    value,
  };

  return result;
};
