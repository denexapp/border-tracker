import retrievePageWithProperties from "@/shared/notion/api/retrievePageWithProperties";
import { Direction } from "../model/direction/direction";
import { fillableEntryFieldExtractors } from "../model/entry/entry";

export const getEntryDirection = async (id: string): Promise<Direction | null> => {
  const page = await retrievePageWithProperties(id);
  const directionField = await fillableEntryFieldExtractors.direction(page);
  const direction = directionField.value;

  return direction;
};
