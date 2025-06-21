import { propertyNameDirection as propertyNameDirection, propertyValueIdDirectionArrival, propertyValueIdDirectionDeparture } from "@/consts";
import { EntryFieldExtractor } from '../entryFieldExtractor';
import { Direction } from '@/models/direction/direction';

export const direction: EntryFieldExtractor<Direction> = (page) => {
  const entryTypeProperty = page.properties[propertyNameDirection];

  if (entryTypeProperty === undefined) {
    throw new Error("Incorrect format");
  }

  if (entryTypeProperty.type !== "select") {
    throw new Error("Incorrect format");
  }

  if (entryTypeProperty.select === null) {
    return null;
  } else if (entryTypeProperty.select.id === propertyValueIdDirectionArrival) {
    return "arrival";
  } else if (entryTypeProperty.select.id === propertyValueIdDirectionDeparture) {
    return "departure";
  } else {
    throw new Error("Incorrect format");
  }
};
