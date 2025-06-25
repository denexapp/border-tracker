import notion from "@/shared/notion/api/client";
import { Direction } from "../model/direction/direction";
import { entryFieldExtractors } from "../model/entry/entry";

export const getEntryDirection = async (id: string): Promise<Direction | null> => {
  const page = await notion.pages.retrieve({
    page_id: id,
  });

  if (!("properties" in page)) {
    throw new Error("Incorrect format");
  }

  const directionField = await entryFieldExtractors.direction(page);
  const direction = directionField.value;

  return direction;
};
