import { propertyNameType, propertyValueIdTypeArrival, propertyValueIdTypeDeparture } from "@/consts";
import { EntryFieldExtractor } from '../entryFieldExtractor';

export type EntryType = "arrival" | "departure";

export const type: EntryFieldExtractor<EntryType> = (page) => {
  const entryTypeProperty = page.properties[propertyNameType];

  if (entryTypeProperty === undefined) {
    throw new Error("Incorrect format");
  }

  if (entryTypeProperty.type !== "select") {
    throw new Error("Incorrect format");
  }

  if (entryTypeProperty.select === null) {
    return null;
  } else if (entryTypeProperty.select.id === propertyValueIdTypeArrival) {
    return "arrival";
  } else if (entryTypeProperty.select.id === propertyValueIdTypeDeparture) {
    return "departure";
  } else {
    throw new Error("Incorrect format");
  }
};
