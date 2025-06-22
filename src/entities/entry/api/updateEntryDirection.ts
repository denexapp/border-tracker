import { propertyNameDirection } from "@/entities/entry/config/consts";
import { Direction } from "@/entities/entry/model/direction/direction";
import directionToPropertyValueId from "@/entities/entry/model/direction/directionToPropertyValueId";
import notion from "@/shared/notion/api/client";

export const updateEntryDirection = async (id: string, direction: Direction) => {
  await notion.pages.update({
    page_id: id,
    properties: {
      [propertyNameDirection]: {
        type: "select",
        select: {
          id: directionToPropertyValueId(direction),
        },
      },
    },
  });
};

export default updateEntryDirection;
