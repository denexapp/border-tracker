import {
  propertyNameDirection,
  propertyValueIdDirectionArrival,
  propertyValueIdDirectionDeparture,
} from "@/entities/entry/config/consts";
import { Direction } from "@/entities/entry/model/direction/direction";
import { EntryField, EntryFieldExtractor } from "../entryFieldExtractor";

export const direction: EntryFieldExtractor<Direction | null> = async (page) => {
  const entryTypeProperty = page.properties[propertyNameDirection];

  if (entryTypeProperty === undefined) {
    throw new Error("Incorrect format");
  }

  if (entryTypeProperty.type !== "select") {
    throw new Error("Incorrect format");
  }

  let value: Direction | null;

  if (entryTypeProperty.select === null) {
    value = null;
  } else if (entryTypeProperty.select.id === propertyValueIdDirectionArrival) {
    value = "arrival";
  } else if (entryTypeProperty.select.id === propertyValueIdDirectionDeparture) {
    value = "departure";
  } else {
    throw new Error("Incorrect format");
  }

  const filled = value !== null;

  const result: EntryField<Direction | null> = {
    filled,
    value,
  };

  return result;
};
