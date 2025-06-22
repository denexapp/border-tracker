import notion from "@/shared/notion/api/client";
import { Entry, entryFieldExtractors } from "../model/entry/entry";

export const getEntry = async (id: string): Promise<Entry> => {
  const page = await notion.pages.retrieve({
    page_id: id,
  });

  if (!("properties" in page)) {
    throw new Error("Incorrect format");
  }

  return {
    direction: entryFieldExtractors.direction(page),
    date: entryFieldExtractors.date(page),
    region: await entryFieldExtractors.region(page),
  };
};
