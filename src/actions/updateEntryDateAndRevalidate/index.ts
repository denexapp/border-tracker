"use server";

import { validateSession } from "@/auth";
import { propertyNameDate } from "@/consts";
import simpleDateFromDateString from "@/models/simpleDate/simpleDateFromDateString";
import simpleDateToDateString from "@/models/simpleDate/simpleDateToDateString";
import notion from "@/notion/client";
import encodeUrlParams from "@/utils/encodeUrlParams";
import { revalidatePath } from "next/cache";
import { formDataFieldName } from "./consts";

// todo: properly validate paramaters
const updateEntryDateAndRevalidate = async (id: string, formData: FormData) => {
  validateSession();

  const dateFormDataEntry = formData.get(formDataFieldName);

  if (dateFormDataEntry === null) {
    throw new Error("Incorrect format");
  }

  const dateStringUnparsed = dateFormDataEntry.toString();
  const dateSimple = simpleDateFromDateString(dateStringUnparsed);
  const dateString = simpleDateToDateString(dateSimple);

  await notion.pages.update({
    page_id: id,
    properties: {
      [propertyNameDate]: {
        type: "date",
        date: {
          start: dateString,
        },
      },
    },
  });

  revalidatePath(encodeUrlParams`/entries/${id}`);
};

export default updateEntryDateAndRevalidate;
