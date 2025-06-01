import { GetPageResponse } from "@notionhq/client/build/src/api-endpoints";
import { Entry, entryFieldExtractors } from "./entry";

export const getEntry = async (page: GetPageResponse): Promise<Entry> => {
  if (!("properties" in page)) {
    throw new Error("Incorrect format");
  }

  return {
    type: entryFieldExtractors.type(page),
    date: entryFieldExtractors.date(page),
    region: await entryFieldExtractors.region(page),
  };
};
