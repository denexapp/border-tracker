import notion from "@/shared/notion/api/client";
import { Entry, entryFieldExtractors } from "../model/entry/entry";

export const getEntry = async (id: string): Promise<Entry> => {
  const page = await notion.pages.retrieve({
    page_id: id,
  });

  if (!("properties" in page)) {
    throw new Error("Incorrect format");
  }

  const [direction, date, region, additionalStatuses] = await Promise.all([
    entryFieldExtractors.direction(page),
    entryFieldExtractors.date(page),
    entryFieldExtractors.region(page),
    entryFieldExtractors.additionalStatuses(page),
  ]);

  return {
    direction,
    date,
    region,
    additionalStatuses,
  };
};
