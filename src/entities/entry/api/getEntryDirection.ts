import retrievePage from "@/shared/notion/api/retrievePage";
import { Direction } from "../model/direction/direction";
import { fillableEntryFieldExtractors } from "../model/entry/entry";

export const getEntryDirection = async (id: string): Promise<Direction | null> => {
  const page = await retrievePage(id);
  const directionField = await fillableEntryFieldExtractors.direction(page);
  const direction = directionField.value;

  return direction;
};
