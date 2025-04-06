"use server";

import { validateSession } from "@/auth";
import { propertyNameType, propertyValueIdTypeArrival, propertyValueIdTypeDeparture } from "@/consts";
import { EntryType } from "@/models/entryType/extractors/type";
import notion from "@/notion";
import encodeUrlParams from "@/utils/encodeUrlParams";
import { revalidatePath } from "next/cache";

// todo: properly validate paramaters
const updateEntryTypeAndRevalidate = async (id: string, type: EntryType) => {
  validateSession();

  let selectId: string;

  if (type === "arrival") {
    selectId = propertyValueIdTypeArrival;
  } else if (type === "departure") {
    selectId = propertyValueIdTypeDeparture;
  } else {
    throw new Error("Incorrect format");
  }

  await notion.pages.update({
    page_id: id,
    properties: {
      [propertyNameType]: {
        type: "select",
        select: {
          id: selectId,
        },
      },
    },
  });

  revalidatePath(encodeUrlParams`/entries/${id}`);
};

export default updateEntryTypeAndRevalidate;
