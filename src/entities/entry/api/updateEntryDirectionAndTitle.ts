import { propertyNameDirection } from "@/entities/entry/config/consts";
import notion from "@/shared/notion/api/client";
import { Direction } from "../model/direction/direction";
import directionToPropertyValueId from "../model/direction/directionToPropertyValueId";

const updateEntryDirectionAndTitle = async (id: string, direction: Direction, title: string) => {
  await notion.pages.update({
    page_id: id,
    properties: {
      title: {
        title: [
          {
            text: {
              content: title,
            },
          },
        ],
      },
      [propertyNameDirection]: {
        type: "select",
        select: {
          id: directionToPropertyValueId(direction),
        },
      },
    },
  });
};

export default updateEntryDirectionAndTitle;
