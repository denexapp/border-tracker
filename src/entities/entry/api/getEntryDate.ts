import { SimpleDate } from "@/shared/model/simpleDate/simpleDate";
import notion from "@/shared/notion/api/client";
import { entryFieldExtractors } from "../model/entry/entry";

export const getEntryDate = async (id: string): Promise<SimpleDate | null> => {
  const page = await notion.pages.retrieve({
    page_id: id,
  });

  if (!("properties" in page)) {
    throw new Error("Incorrect format");
  }

  const dateField = await entryFieldExtractors.date(page);
  const date = dateField.value;

  return date;
};
