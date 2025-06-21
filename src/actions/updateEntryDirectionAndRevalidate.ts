"use server";

import { validateSession } from "@/auth";
import { propertyNameDirection, propertyValueIdDirectionArrival, propertyValueIdDirectionDeparture } from "@/consts";
import { Direction } from "@/models/direction/direction";
import notion from "@/notion/client";
import encodeUrlParams from "@/utils/encodeUrlParams";
import { revalidatePath } from "next/cache";

// todo: properly validate paramaters
const updateEntryDirectionAndRevalidate = async (id: string, direction: Direction) => {
  validateSession();

  let selectId: string;

  if (direction === "arrival") {
    selectId = propertyValueIdDirectionArrival;
  } else if (direction === "departure") {
    selectId = propertyValueIdDirectionDeparture;
  } else {
    throw new Error("Incorrect format");
  }

  await notion.pages.update({
    page_id: id,
    properties: {
      [propertyNameDirection]: {
        type: "select",
        select: {
          id: selectId,
        },
      },
    },
  });

  revalidatePath(encodeUrlParams`/entries/${id}`);
};

export default updateEntryDirectionAndRevalidate;
